<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\Breadcrumbs;



$userId = Yii::$app->user->id;

$userName = Yii::$app->user->identity->nombre; 

$isAdmin = ($userName === 'admin' );


$db = Yii::$app->db;

$idRolJefe = $db->createCommand("SELECT per_roles_id FROM per_roles WHERE per_roles_nombre = 'Jefe de servicio'")
               ->queryScalar();


$isJefeContratacion = (new \yii\db\Query())
    ->select(['d.nombre'])
    ->from('per_distribucion pd')
    ->innerJoin('departamentos d', 'pd.per_distribucion_departamento = d.id')
    ->where([
        'pd.per_distribucion_empleado' => Yii::$app->user->identity->empleado_id,
        'pd.per_distribucion_rol' => $idRolJefe,
        'pd.per_distribucion_dpto_principal' => 1
    ])
    ->andWhere(['like', 'UPPER(d.nombre)', 'CONTRATACION'])
    ->exists();

///////////////////////////////////////////////////////////////////////////////////////////
$esCualquierJefe = (new \yii\db\Query())
    ->from('per_distribucion')
    ->where([
        'per_distribucion_empleado' => Yii::$app->user->identity->empleado_id,
        'per_distribucion_rol' => $idRolJefe,
        'per_distribucion_dpto_principal' => 1
    ])
    ->exists();

$mostrarControlMando = $isAdmin || $isJefeContratacion;
$mostrarMiExpediente = !$mostrarControlMando && $esCualquierJefe;




$ts = time();
$secretKey = "contratacion_laravel";
$userId = Yii::$app->user->id;
$hash = md5($userId . $secretKey . $ts);
$urlContratos = "http://localhost:8000/auth/bridge/$userId?ts=$ts&hash=$hash";
// Renderizar los breadcrumbs personalizados 'utbreadcrumbs'
echo Breadcrumbs::widget([
    'links' => isset($this->params['utbreadcrumbs']) ? $this->params['utbreadcrumbs'] : [],
]);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu de Utilidades</title>
    <style>
        .menu_index_h1 {
            background: #d9edf7;
            font-size: 24px;
            padding: 0.1em 1em 0em 1em;
        }
        .menu_index img { 
            width: 8em; 
        }
        .menu_index li span { 
            position: relative; 
            top: 1em; 
        }
        .menu_index li a { 
            color: #000; 
        }
        .menu_index ul { 
            display: flex; 
            flex-direction: row; 
            padding-bottom: 2em; 
            border-bottom: 1px solid #DDD; 
        }
        .menu_index ul li {
            list-style-type: none;
            padding: 0.5em 1em;
            text-align: center;
            width: 100%;
        }
        .globo_notif {
            width: 1.8em;
            height: 1.8em;
            padding: 0.25em;
            position: absolute;
            top: 35%;
            left: 69%;
            background: red;
            border-radius: 50%;
            color: white;
            font-weight: bold;
            font-size: 11pt;
            box-shadow: 2px 2px 2px 0px rgba(121,121,121,1);
        }
        a.link_ver_menu_admin {
            float: right;
            font-size: 10pt;
            margin-top: 0.5em;
        }
    </style>
</head>
<body>

<h1 class="menu_index_h1"><?= Html::encode($this->title) ?></h1>

<div class="menu_index">
    <ul>
        <li>
            <a href="<?= Url::to(['utilidades/importar-y-descargar']) ?>">
                <img src="<?= Yii::$app->request->baseUrl; ?>/imagenes/per_menu/per_crear_solicitud.png"><br>
                <span>Estado de ejecución presupuestario</span>
            </a>
        </li>
        <li>
            <a href="<?= Url::to(['utilidades/presupuestos-csv-usuario']) ?>"> 
                <img src="<?= Yii::$app->request->baseUrl; ?>/imagenes/per_menu/per_missolicitudes.png"><br>
                <span>Mi presupuesto</span>
            </a>
        </li>
        <li>
            <a href="<?= Url::to(['utilidades/presupuestos-csv']) ?>">
                <img src="<?= Yii::$app->request->baseUrl; ?>/imagenes/per_menu/per_solicitudestodas.png"><br>
                <span>Solicitudes (TODAS)</span>
            </a>
            <br>
            <span class="descripcion_enlaces">Gestión de los presupuestos (solo admin y oficina de gestión presupuestaria).</span>
        </li>
    </ul>
    <?php if ($mostrarControlMando): ?>
    <ul>
        <li>
            <a href="<?= $urlContratos ?>">
                <div style="font-size: 5em; color: #337ab7;">
                    <span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
                </div>
                <span>Gestión de Contratos</span>
            </a>
            <br>
            <span class="descripcion_enlaces">Acceso al nuevo sistema de gestión de contratos y proveedores.</span>
            <?php elseif ($mostrarMiExpediente): ?>
                <a href="<?= $urlContratos ?>">
                <div style="font-size: 5em; color: #5cb85c;">
                    <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
                </div>
                <span>Mi Expediente de Contratación</span>
            </a>
        </li>
    </ul>
<?php endif; ?>
</div>


</body>
</html>
