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


    $contratos = Contrato::with('usuario')
        ->whereDate('alerta_vencimiento', '<=', $hoy)
        ->where('avisado', false)
        ->get();

    if ($contratos->isEmpty()) {
        $this->warn("No hay contratos con alerta para la fecha de hoy ($hoy).");
        return;
    }

    $this->info("Se han encontrado " . $contratos->count() . " contratos.");

    foreach ($contratos as $contrato) {

        $usuario = $contrato->usuario;

        if ($usuario && $usuario->email) {
            try {
                Mail::to($usuario->email)->send(new AlertaFormalizacionContrato($contrato));
                $this->info("Email enviado para el expediente: {$contrato->n_expediente}");

                // OPCIONAL: Si solo se quiere avisar UNA VEZ y ya:
                // $contrato->update(['avisado' => true]);

            } catch (\Exception $e) {
                $this->error("Error enviando a {$usuario->email}: " . $e->getMessage());
            }
        } else {
            $this->error("El contrato {$contrato->n_expediente} no tiene un usuario con email válido.");
        }
    }
    }
}
