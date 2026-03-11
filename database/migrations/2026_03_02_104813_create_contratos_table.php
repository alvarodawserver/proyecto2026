<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contratos', function (Blueprint $table) {
            $table->id();
            $table->string('id_contrato')->unique()->nullable();
            $table->string('n_expediente')->unique();
            $table->text('descripcion');
            $table->string('responsable');
            $table->foreignId('created_by')->nullable()->constrained('usuarios');
            $table->string('n_resolucion');
            $table->foreignId('tipos_id')->constrained('tipos');
            $table->decimal('importe_estimado',8,2);
            $table->decimal('importe_final',8,2);
            $table->foreignId('tipo_procedimiento')->constrained('adjudicaciones')->onDelete('restrict');
            $table->date('fecha_prevista');
            $table->date('fecha_inicio')->nullable();
            $table->timestamp('alerta_vencimiento')->nullable();
            $table->string('unidad_promotora');
            $table->string('duracion_estimada');
            $table->string('estado_expediente');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contratos');
    }
};
