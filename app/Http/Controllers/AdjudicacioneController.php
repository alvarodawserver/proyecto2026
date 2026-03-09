<?php

namespace App\Http\Controllers;

use App\Models\Adjudicacione;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdjudicacioneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Procedimientos/procedimientos',['procedimientos' => Adjudicacione::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Procedimientos/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            ['tipo_procedimiento' => 'required|max:255'],
        );
        Adjudicacione::create($validated);
        return redirect()->route('procedimientos');

    }

    /**
     * Display the specified resource.
     */
    public function show(Adjudicacione $adjudicacione)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Adjudicacione $adjudicacione)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Adjudicacione $adjudicacione)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Adjudicacione $adjudicacione)
    {
        //
    }
}
