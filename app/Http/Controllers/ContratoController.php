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
        return Inertia::render('Contratos/contratos',['contratos' => Contrato::all()]);
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
            'importe_estimado' => 'required|decimal:2|gte:-999999.99|lte:999999.99',
            'proc_adjudicacion' => 'required|max:255',
            'fecha_prevista' => 'required|date',
            'fecha_inicio' => 'date',
            'alerta_vencimiento' => 'date',
            'unidad_promotora' => 'required|max:255',
            'duracion_estimada' => 'required|date',
            'estado_expediente' => 'required|max:255'
        ]);
        Contrato::create([
        $validated,
        'created_by' => Auth::user()->id
        ]);
        return redirect()->route('contratos')->with('message', 'Contrato creado con éxito');;
    }

    /**
     * Display the specified resource.
     */
    public function show(Contrato $contrato)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contrato $contrato)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contrato $contrato)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contrato $contrato)
    {
        //
    }
}
