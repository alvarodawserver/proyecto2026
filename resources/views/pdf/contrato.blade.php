<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contrato {{ $contrato->n_expediente }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 1px solid #000; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .section-header { background-color: #eee; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h2>EXPEDIENTE Nº: {{ $contrato->n_expediente }}</h2>
        <p>Informe Generado: {{ date('d/m/Y') }} (Modo: {{ ucfirst($modo) }})</p>
    </div>

    <table>
        <thead>
            <tr>
                <th colspan="2">DATOS DEL CONTRATO</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width="30%"><strong>Tipo de Contrato:</strong></td>
                <td>{{ $contrato->tipo->tipo_contrato }}</td>
            </tr>
            <tr>
                <td><strong>Estado:</strong></td>
                <td>{{ $contrato->estado_expediente }}</td>
            </tr>
            <tr>
                <td><strong>Responsable:</strong></td>
                <td>{{ $contrato->responsable }}</td>
            </tr>
            <tr>
                <td><strong>Importe Estimado:</strong></td>
                <td>{{ number_format($contrato->importe_estimado, 2, ',', '.') }} €</td>
            </tr>

            {{-- SI ES COMPLETO, AÑADIMOS MÁS FILAS --}}
            @if($modo === 'completo')
                <tr>
                    <td><strong>Unidad Promotora:</strong></td>
                    <td>{{ $contrato->unidad_promotora }}</td>
                </tr>
                <tr>
                    <td><strong>Creado por:</strong></td>
                    <td>{{ $contrato->usuario->nombre ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <td><strong>Fecha Prevista:</strong></td>
                    <td>{{ $contrato->fecha_prevista_f }}</td>
                </tr>
                <tr>
                    <td><strong>Importe Final:</strong></td>
                    <td>{{ number_format($contrato->importe_final, 2, ',', '.') }} €</td>
                </tr>
                <tr>
                    <td><strong>Descripción:</strong></td>
                    <td>{{ $contrato->descripcion }}</td>
                </tr>
            @endif
        </tbody>
    </table>
</body>
</html>
