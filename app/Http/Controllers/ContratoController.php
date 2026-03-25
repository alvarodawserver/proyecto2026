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
        $user = Auth::user();
        $contratos = Contrato::where('asignado_a', $user->nombre)->get();
        return Inertia::render('Contratos/contratos',[
            'contratos' => $contratos,]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $jefes = DB::table('usuarios')
            ->join('empleados', 'usuarios.empleado_id', '=', 'empleados.id')
            ->join('per_distribucion', 'empleados.id', '=', 'per_distribucion.per_distribucion_empleado')
            ->where('per_distribucion.per_distribucion_rol', 1)
            ->where('per_distribucion.per_distribucion_dpto_principal', 1)
            ->select('usuarios.nombre')
            ->get();

        return Inertia::render('Contratos/create',[
            'procedimientos' => Adjudicacione::all(),
            'tipos' => Tipo::all(),
            'jefes' => $jefes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usuario_asignao = $request->input('asignado_a');
        $id_empleado_asignado = DB::table('usuarios')
            ->where('nombre', $usuario_asignao)
            ->value('empleado_id');
            
        $unidad_promotora = DB::table('per_distribucion')
            ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
            ->where('per_distribucion_empleado', $id_empleado_asignado)
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
            'asignado_a' => 'required|max:255',
        ]);

       Contrato::create(array_merge($validated, [
            'created_by' => Auth::id(),
            'alerta_vencimiento' => now()->addMonths(4),
            'estado_expediente' => 'Activo',
            'unidad_promotora' => $unidad_promotora ?? ''
        ]));


        return redirect()->route('contratos')->with('message', 'Contrato creado con éxito');
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

    public function verMovimiento(Contrato $contrato){

        $contrato->load(['movimientos', 'usuario']);
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


    $departamentoUsuario = DB::table('per_distribucion')
        ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
        ->where('per_distribucion_empleado', $usuarioLogueado->empleado_id)
        ->where('per_distribucion_dpto_principal', true)
        ->value('departamentos.nombre');

    $query = Contrato::query();

    $esAdmin = strtolower($usuarioLogueado->nombre) === 'admin';
    $deptoUpper = mb_strtoupper($departamentoUsuario ?? '', 'UTF-8');
    $esContratacion = str_contains($deptoUpper, 'CONTRATACIÓN') || str_contains($deptoUpper, 'CONTRATACION');

    if ($esAdmin || $esContratacion) {

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

    public function formalizar($id){
        $contrato = Contrato::findOrFail($id);
        $contrato->estado_alerta = 'formalizado';
        $contrato->save();

        return "Contrato formalizado con éxito. Puedes cerrar esta ventana.";
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
