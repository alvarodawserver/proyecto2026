<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Confirmación - Ayuntamiento de Sanlúcar</title>
    <style>
        body { font-family: sans-serif; background: #f4f7f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 400px; }
        .icon { font-size: 50px; color: #4CAF50; margin-bottom: 20px; }
        h2 { color: #333; margin-bottom: 10px; }
        p { color: #666; line-height: 1.5; }
        .footer { margin-top: 20px; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="card">
        <div class="icon">✅</div>
        <h2>Aviso Desactivado</h2>
        <p>Has marcado el expediente <strong>{{ $expediente }}</strong> como gestionado.</p>
        <p>Ya no recibirás más correos automáticos sobre este contrato.</p>
        <p>Cierra esta pestaña cuando termines.</p>
        <div class="footer">Sistema de Gestión de Contratos - Sanlúcar de Barrameda</div>
    </div>
</body>
</html>
