<?php
use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('app:enviar-alertas-contratos')
    ->dailyAt('08:00')
    ->timezone('Europe/Madrid') 
    ->onOneServer()
    ->emailOutputOnFailure('alvaro.vidal@iesdonana.org');
