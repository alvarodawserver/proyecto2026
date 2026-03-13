<!DOCTYPE html>


<html>


<head>


    <title>Alerta de Contrato</title>


</head>


<body style="font-family: sans-serif; line-height: 1.6; color: #333;">


    <h2 style="color: #2d3748;">Hola, {{ $contrato->responsable }}</h2>


    <p>Te informamos que se ha generado una alerta para el contrato con código: <strong>{{ $contrato->id_contrato }}</strong>.</p>





    <div style="background-color: #f7fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">


        <p><strong>Expediente:</strong> {{ $contrato->n_expediente }}</p>


        <p><strong>Descripción:</strong> {{ $contrato->descripcion }}</p>


    </div>





    <p>Por favor, procede con los trámites de formalización necesarios.</p>


    <p>Saludos,<br>El sistema de Gestión.</p>


    <p>Si ya has iniciado los trámites, pulsa el siguiente botón para que dejemos de enviarte recordatorios:</p>


    <a href="{{ URL::signedRoute('contrato.formalizar', ['id' => $contrato->id]) }}"


    style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">


        Marcar como Formalizado


    </a>


</body>


</html>
