<?php

namespace App\Console\Commands;

use App\Mail\AlertaFormalizacionContrato;
use App\Models\Contrato;
use App\Models\Usuario;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class EnviarAlertasContratos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:enviar-alertas-contratos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $hoy = now()->toDateString();
        $contratos = Contrato::whereDate('alerta_vencimiento','<=', $hoy)
        ->where('estado_alerta','pendiente')
        ->get();

        if ($contratos->isEmpty()) {
            $this->warn("No hay contratos con alerta para la fecha de hoy ($hoy).");
            return;
        }

        $this->info("Se han encontrado " . $contratos->count() . " contratos.");

        foreach ($contratos as $contrato) {
            $usuario = Usuario::find($contrato->created_by);

            if ($usuario && $usuario->email) {
                Mail::to($usuario->email)->send(new AlertaFormalizacionContrato($contrato));
            }
        }
    }
}
