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
        $usuarioLogueado = Auth::user();
        $contratos = Contrato::where('created_by', $usuarioLogueado->id)->get();
        return Inertia::render('Contratos/contratos',[
            'contratos' => $contratos,]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Contratos/create',[
            'procedimientos' => Adjudicacione::all(),
            'tipos' => Tipo::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usuarioLogueado = Auth::user();
        $unidad_promotora = DB::table('per_distribucion')
            ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
            ->where('per_distribucion_empleado', $usuarioLogueado->empleado_id)
            ->where('per_distribucion_dpto_principal', true)
            ->value('departamentos.nombre');

        $validated = $request->validate([
            'n_expediente' => 'required|max:255',
            'descripcion' => 'required|max:255',
            'responsable' => 'nullable|max:255',
            'tipos_id' => 'required|exists:tipos,id',
            'importe_estimado' => 'required|numeric|min:0',
            'importe_final' => 'nullable|numeric|min:0',
            'tipo_procedimiento' => 'required|exists:adjudicaciones,id',
            'fecha_prevista' => 'required|date',
            'fecha_inicio' => 'nullable|date',
            'n_resolucion' => 'nullable|max:255',
            'duracion_estimada' => 'required',
            'fecha_fin' => 'nullable|date'
        ]);



        $contrato = Contrato::create(array_merge($validated, [
            'created_by' => Auth::id(),
            'alerta_vencimiento' => now()->addMonths(4),
            'estado_expediente' => 'Activo',
            'unidad_promotora' => $unidad_promotora ?? '',
        ]));

        $contrato->fecha_fin = $contrato->getFechaFinAttribute();

        $contrato->save();

        return redirect()->back()->with('message', 'Contrato creado con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contrato $contrato)
    {
        $contrato_user = $contrato->load(['usuario.empleado', 'tipo', 'tipo_procedimiento']);;
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
            'responsable' => 'nullable|max:255',
            'tipos_id' => 'required|exists:tipos,id',
            'importe_final' => 'nullable|numeric|min:0',
            'tipo_procedimiento' => 'required|max:255',
            'fecha_inicio' => 'nullable|date',
            'duracion_estimada' => 'required',
            'n_resolucion' => 'nullable|max:255',
            'fecha_fin' => 'nullable|date'
        ]);

        if (empty($validated['fecha_fin'])){
        $contrato->fill($validated);
        $validated['fecha_fin'] = $contrato->calcularFechaFin();
        };


        // 1. CORRECCIÓN LÓGICA DE FORMALIZACIÓN
        // Cambiamos $data (que no existe) por $validated
        $validated['formalizado'] = $contrato->formalizado ?: (
            !empty($validated['fecha_inicio']) &&
            !empty($validated['importe_final']) &&
            !empty($validated['n_resolucion'])
        );

        // 2. ACTUALIZACIÓN
        $contrato->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contrato $contrato)
    {
        $contrato->estado_expediente = 'Desactivado';
        $contrato->save();
        $contrato->delete();
        return redirect()->back();
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
        return redirect()->route('control-mando')->with('success','El contrato se ha recuperado con éxito');
    }

    public function verMovimiento(Contrato $contrato){
        $contrato->load(['movimientos.usuario']);
        return Inertia::render('Contratos/movimientos',['contrato' => $contrato]);
    }


    public function vistaControlMando()
    {
        $usuarioLogueado = Auth::user();


        $distribucion = DB::table('per_distribucion')
            ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
            ->where('per_distribucion_empleado', $usuarioLogueado->empleado_id)
            ->where('per_distribucion_dpto_principal', true)
            ->select('per_distribucion_rol', 'departamentos.nombre as depto_nombre')
            ->first();

        $todos_los_departamentos = DB::table('departamentos')
            ->select('id', 'nombre')
            ->orderBy('nombre','asc')
            ->get();

        return Inertia::render('Contratos/control-mando', [
            'todos_los_departamentos' => $todos_los_departamentos,
            'user_rol' => $distribucion->per_distribucion_rol ?? null,
            'user_depto_nombre' => $distribucion->depto_nombre ?? ''
        ]);
    }

    public function controlMando(Request $request)
{
    $usuarioLogueado = Auth::user();
    if (!$usuarioLogueado) {
        return response()->json([], 401);
    }

    // Buscamos su departamento
    $departamentoUsuario = DB::table('per_distribucion')
        ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
        ->where('per_distribucion_empleado', $usuarioLogueado->empleado_id)
        ->where('per_distribucion_dpto_principal', true)
        ->value('departamentos.nombre');

    $query = Contrato::query();

    // --- LÓGICA PARA ADMIN O CONTRATACIÓN ---
    $esAdmin = strtolower($usuarioLogueado->nombre) === 'admin';
    $deptoUpper = mb_strtoupper($departamentoUsuario ?? '', 'UTF-8');
    $esContratacion = str_contains($deptoUpper, 'CONTRATACIÓN') || str_contains($deptoUpper, 'CONTRATACION');

    if ($esAdmin || $esContratacion) {
        // Si es admin o contratación, puede filtrar por el select o ver todo
        if ($request->filled('departamento')) {
            $query->where('unidad_promotora', $request->departamento);
        }
    } elseif ($departamentoUsuario) {
        // Si es un usuario normal, solo ve lo suyo
        $query->where('unidad_promotora', $departamentoUsuario);
    } else {
        // Si no hay departamento y no es admin, devolvemos vacío para seguridad
        return response()->json([]);
    }

    // Filtros de fecha
    if ($request->filled('desde')) {
        $query->whereDate('fecha_inicio', '>=', $request->desde);
    }
    if ($request->filled('hasta')) {
        $query->whereDate('fecha_inicio', '<=', $request->hasta);
    }

    return response()->json($query->get());
}

    public function formalizar($id){
        $contrato = Contrato::findOrFail($id);
        $contrato->formalizado = true;
        $contrato->save();

        return redirect()->back()->with('success','Contrato formalizado con éxito');
    }

    public function silenciarAlerta(Contrato $contrato)
    {
        if (!$contrato->avisado) {
            $contrato->update(['avisado' => true]);
        }

        return view('emails.confirmacion_alerta',['expediente' => $contrato->n_expediente]);
    }

    public function generarPdf(Request $request, $id)
    {

        $contrato = Contrato::with(['usuario', 'tipo', 'tipo_procedimiento'])->findOrFail($id);


        $modo = $request->query('tipo', 'basico');


        $pdf = Pdf::loadView('pdf.contrato', compact('contrato', 'modo'));


        $pdf->setPaper('a4', 'portrait');

        return $pdf->stream("contrato_{$contrato->n_expediente}.pdf");
    }
}
