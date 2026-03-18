<?php

namespace App\Http\Controllers;

use App\Models\Adjudicacione;
use App\Models\Contrato;
use App\Models\Tipo;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContratoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contratos = Contrato::all()->load('usuario');
        return Inertia::render('Contratos/contratos',[
            'contratos' => $contratos,]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Contratos/create',['procedimientos' => Adjudicacione::all(),'tipos' => Tipo::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usuarioLogueado = Auth::user();

        // CORRECCIÓN: Usamos empleado_id, no Auth::id()
        $unidad_promotora = DB::table('per_distribucion')
            ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
            ->where('per_distribucion_empleado', $usuarioLogueado->empleado_id) // <--- Cambio clave
            ->where('per_distribucion_dpto_principal', true)
            ->value('departamentos.nombre');

        $validated = $request->validate([
            'n_expediente' => 'required|max:255',
            'descripcion' => 'required|max:255',
            'responsable' => 'required|max:255',
            'tipos_id' => 'required|exists:tipos,id',
            'importe_estimado' => 'required|numeric|min:0',
            'importe_final' => 'required|numeric|min:0',
            'tipo_procedimiento' => 'required|exists:adjudicaciones,id',
            'fecha_prevista' => 'required|date',
            'fecha_inicio' => 'nullable|date',
            'alerta_vencimiento' => 'nullable|date',
            'n_resolucion' => 'required',
            'duracion_estimada' => 'required',
        ]);

        Contrato::create(array_merge($validated, [
            'created_by' => Auth::id(),
            'estado_expediente' => 'Activo',
            // Si no encuentra depto, ponemos 'SIN DEP' para saber que falló
            'unidad_promotora' => $unidad_promotora ?? 'SIN DEP'
        ]));

        return redirect()->route('contratos')->with('message', 'Contrato creado con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contrato $contrato)
    {
        $contrato_user = $contrato->load(['usuario', 'tipo', 'tipo_procedimiento']);;
        if (!$contrato_user) {
            return redirect()->route('contratos')->with('error', 'Contrato no encontrado');
        }
        return Inertia::render('Contratos/show',['contrato' => $contrato_user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contrato $contrato)
    {
        return Inertia::render('Contratos/edit',
        [
            'contrato'=>$contrato,
            'tipos' => Tipo::all(),
            'procedimientos' => Adjudicacione::all()
        ]);


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contrato $contrato)
    {
        $validated = $request->validate([
            'descripcion' => 'required|max:255',
            'responsable' => 'required|max:255',
            'importe_final' => 'required|numeric|min:0',
            'tipo_procedimiento' => 'required|max:255',
            'fecha_inicio' => 'nullable|date',
            'duracion_estimada' => 'required',
        ]);

        $contrato->update($validated);
        return redirect()->route('contratos');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contrato $contrato)
    {
        $contrato->estado_expediente = 'Desactivado';
        $contrato->save();
        $contrato->delete();
        return redirect()->route('contratos');
    }

    public function verDesactivados(){
        $contratos_desactivados = Contrato::onlyTrashed()->with('usuario')->get();
        return Inertia::render('Contratos/desactivados',['desactivados' => $contratos_desactivados]);
    }

    public function recuperarDesactivados($contrato_id){
        $contrato_recuperar = Contrato::onlyTrashed()->findOrFail($contrato_id);
        $contrato_recuperar->estado_expediente = 'Activo';
        $contrato_recuperar->save();
        $contrato_recuperar->restore();
        return redirect()->route('contratos')->with('success','El contrato se ha recuperado con éxito');
    }

    public function verMovimiento(Request $request, $id)
{
    // 1. Buscamos el contrato con sus movimientos filtrados
    $contrato = Contrato::with(['movimientos' => function($query) use ($request) {
        if ($request->actuacion) {
            $query->where('actuacion', $request->actuacion);
        }
        if ($request->fecha_desde) {
            $query->whereDate('fecha_movimiento', '>=', $request->fecha_desde);
        }
        if ($request->fecha_hasta) {
            $query->whereDate('fecha_movimiento', '<=', $request->fecha_hasta);
        }
        $query->orderBy('fecha_movimiento', 'desc');
    }, 'movimientos.usuario'])->findOrFail($id);

    // 2. Retornamos a la vista
    return Inertia::render('Contratos/movimientos', [
        'contrato' => $contrato,
        'filters' => $request->only(['actuacion', 'fecha_desde', 'fecha_hasta'])
    ]);
}

    public function formalizar($id){
        $contrato = Contrato::findOrFail($id);
        $contrato->estado_alerta = 'formalizado';
        $contrato->save();

        return "Contrato formalizado con éxito. Puedes cerrar esta ventana.";
    }

    public function vistaControlMando()
{
    // Obtenemos los departamentos como objetos (id y nombre) para el select
    $todos_los_departamentos = DB::table('departamentos')
        ->select('id', 'nombre')
        ->get();

    return Inertia::render('Contratos/control-mando', [
        'todos_los_departamentos' => $todos_los_departamentos
    ]);
}
    public function controlMando(Request $request)
{
    $usuarioLogueado = Auth::user();

    // Obtenemos el departamento del empleado
    $departamentoUsuario = DB::table('per_distribucion')
        ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
        ->where('per_distribucion_empleado', $usuarioLogueado->empleado_id)
        ->where('per_distribucion_dpto_principal', true)
        ->value('departamentos.nombre');

    $query = Contrato::query();

    // Normalizamos a mayúsculas para comparar
    $deptoUpper = mb_strtoupper($departamentoUsuario, 'UTF-8');

    if ($deptoUpper === 'CONTRATACIÓN' || $deptoUpper === 'CONTRATACION') {
        // Si se ha seleccionado un departamento específico en el filtro
        if ($request->filled('departamento')) {
            $query->where('unidad_promotora', $request->departamento);
        }
    } elseif ($departamentoUsuario) {
        $query->where('unidad_promotora', $departamentoUsuario);
    } else {
        return response()->json([]);
    }

    if ($request->filled('desde')) {
        $query->whereDate('fecha_inicio', '>=', $request->desde);
    }
    if ($request->filled('hasta')) {
        $query->whereDate('fecha_inicio', '<=', $request->hasta);
    }

    return response()->json($query->get());
}
public function generarPdf(Request $request, $id)
{
    // 1. Buscamos el contrato con las relaciones que usas en el Show
    $contrato = Contrato::with(['usuario', 'tipo', 'tipo_procedimiento'])->findOrFail($id);

    // 2. Capturamos el parámetro 'tipo' que enviamos desde React
    $modo = $request->query('tipo', 'basico');

    // 3. Cargamos la vista y le pasamos las variables
    $pdf = Pdf::loadView('pdf.contrato', compact('contrato', 'modo'));

    // 4. Configuración opcional de papel
    $pdf->setPaper('a4', 'portrait');

    // 5. Devolvemos el PDF (stream para abrir en pestaña, download para descargar directo)
    return $pdf->stream("contrato_{$contrato->n_expediente}.pdf");
}
}

