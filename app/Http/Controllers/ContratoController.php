<?php

namespace App\Http\Controllers;

use App\Models\Contrato;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContratoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Contratos/contratos',[
            'contratos' => Contrato::all(),]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Contratos/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'n_expediente' => 'required|max:255',
            'descripcion' => 'required|max:255',
            'responsable' => 'required|max:255',
            'tipo_contrato' => 'required|max:255',
            'importe_estimado' => 'required|numeric|min:0',
            'proc_adjudicacion' => 'required|max:255',
            'fecha_prevista' => 'required|date',
            'fecha_inicio' => 'nullable|date',
            'alerta_vencimiento' => 'nullable|date',
            'unidad_promotora' => 'required|max:255',
            'duracion_estimada' => 'required|date|after:fecha_inicio',
        ]);
       Contrato::create(array_merge($validated, [
            'created_by' => Auth::id(),
            'estado_expediente' => 'Activo',
        ]));


        return redirect()->route('contratos')->with('message', 'Contrato creado con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contrato $contrato)
    {
        $contrato_user = $contrato->load('user');
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
    // Enviamos el objeto completo, no solo el ID
    return Inertia::render('Contratos/edit', [
        'contrato' => $contrato
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
            'tipo_contrato' => 'required|max:255',
            'importe_estimado' => 'required|numeric|min:0',
            'proc_adjudicacion' => 'required|max:255',
            'fecha_prevista' => 'required|date',
            'fecha_inicio' => 'nullable|date',
            'unidad_promotora' => 'required|max:255',
            'duracion_estimada' => 'required|date',
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
        $contratos_desactivados = Contrato::onlyTrashed()->with('user')->get();
        return Inertia::render('Contratos/desactivados',['desactivados' => $contratos_desactivados]);
    }

    public function recuperarDesactivados($contrato_id){
        $contrato_recuperar = Contrato::onlyTrashed()->findOrFail($contrato_id);
        $contrato_recuperar->estado_expediente = 'Activo';
        $contrato_recuperar->save();
        $contrato_recuperar->restore();
        return redirect()->route('contratos')->with('success','El contrato se ha recuperado con éxito');
    }
}
