<style>
    .navbar-ayudas a.navbar-brand { color: #FFF !important; }
    .navbar-ayudas a.navbar-brand:hover { color: #000 !important; }

    /* Controlar que con nombres largos no se desborde y tape las migas */
   /* #w1 #w2 > li:nth-child(4) {
        width: 20em;
    }
    #w1 #w2 > li:nth-child(4) > a {
        width: 100%;
        color: white;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }*/
</style>
<?php

/* @var $this \yii\web\View */
/* @var $content string */
use app\models\Usuario;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use yii\helpers\Url;
use app\components\MantenimientoWidget;
AppAsset::register($this);

$ts = 0;
$hash = "";
$secretKey = "contratacion_laravel";

if (Yii::$app->user->id != null) {
    $usuarioActual = Usuario::find()->where(['id' => Yii::$app->user->id])->one();
    $idEmpleadoLogin = $usuarioActual->empleado_id;
    $empleado = \app\models\Empleado::findOne($idEmpleadoLogin);

    $ts = time();
    $hash = md5(Yii::$app->user->id . $secretKey . $ts);
} else {
    $idEmpleadoLogin = null;
    $empleado = null;
}

?>
<?php 
///////////MODO DE MANTENIMIENTO
$manteniendo = MantenimientoWidget::widget();
if ($manteniendo && (!Yii::$app->user->can('admin') && Url::current() != "/ayudas/web/index.php?r=mantenimiento%2Findex")): 
    if (Url::current() != "/ayudas/web/index.php?r=site%2Flogin")
        Yii::$app->response->redirect(['mantenimiento/index']);    
endif; ?>




<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script> //window.history.replaceState(null, null, "/ayudas");</script>
    <?php $this->head() ?>

    <?php if (YII_ENV_PROD) {
        echo(Html::decode(	"<!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-111264958-1\"></script>
            <script>
                    window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-111264958-1');
            </script>"));
    } ?>
</head>
<body>


<?php
////////////
$manteni = '';
if ($manteniendo) $manteni = '<span style="color:#b2dd44"> en mantenimiento </span>';
////////////
$this->beginBody() 

?>
<div class="wrap">

    <?php
    NavBar::begin([
        'brandLabel' => Yii::$app->name . $manteni,
        'brandUrl' => Url::to(['site/index']),
        'options' => [
            'class' => 'navbar-fixed-top navbar-ayudas',
        ],
        'brandOptions' => [
            'class' => 'ayudas-titulo'
        ]
    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right no-hover'],
        'items' => [
            ['label' => 'Cambiar Contraseña', 'url' => ['restablecer', 'id' => Yii::$app->user->id]],
            [
                'label' => 'Gestión',
                'items' => [
                    
                    [
                        'label' => 'Empleados',
                        'url' => ['/empleados/index', 'EmpleadoSearch[grupal]' => 0],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('gestionarEmpleados')
                    ],
                    Yii::$app->user->can('gestionarEmpleados') ? '<li role="separator" class="divider"></li>' : '',
                    [
                        'label' => 'Conceptos',
                        'class' => 'dropdown-header',
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('gestionarConceptos')
                    ],
                    [
                        'label' => 'Gestionar conceptos', 'url' => ['/conceptos/index'],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('gestionarConceptos')
                    ],
                    [
                        'label' => '📂 Control de mando', 
                        'url' => "http://localhost:8000/auth/bridge/" . Yii::$app->user->id . "?ts=$ts&hash=$hash", 
                        'linkOptions' => [
                            'style' => 'background-color: #e3f2fd; font-weight: bold; color: #0d47a1 !important;', 
                        ],
                        'visible' => !Yii::$app->user->isGuest,
                    ],
                    [
                        'label' => 'Gestionar presupuestos', 
                        'url' => ['/utilidades/importar_y_descargar'],
                        'visible' => !Yii::$app->user->isGuest && 
                            (Yii::$app->user->can('admin') || 
                            $empleado->departamento == 'OFICINA DE GESTION PRESUPUESTARIA')
                    ],
                    [
                        'label' => 'Traspasar conceptos', 'url' => ['/conceptos/traspaso'],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('gestionarConceptos')
                    ],
                    [
                        'label' => 'Extra en conceptos', 'url' => ['/extra/index'],
                        'visible' => !Yii::$app->user->isGuest && (Yii::$app->user->can('gestionarConceptos') || Yii::$app->user->can('tramitador'))
                    ],
                    Yii::$app->user->can('gestionarConceptos') ? '<li role="separator" class="divider"></li>' : '',
                    [
                        'label' => 'Solicitudes',
                        'class' => 'dropdown-header',
                        'visible' => (!Yii::$app->user->isGuest && Yii::$app->user->can('valorarSolicitudes')) || (!Yii::$app->user->isGuest && Yii::$app->user->can('verMensualidades'))
                    ],
                    ['label' => 'Valorar Solicitudes', 'url' => ['/solicitudes/valorar', 'ValorarSearch[fecha]' => date('Y')], 'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('valorarSolicitudes')],
                    ['label' => 'Solicitudes valoradas', 'url' => ['/solicitudes/valoradas'], 'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('valorarSolicitudes')],
                    [
                        'label' => 'Registro de solicitudes',
                        'url' => ['/solicitudes/index', 'SolicitudSearch[fecha]' => date('Y')],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('verSolicitudes')
                    ],
                    ['label' => 'Registro de mensualidades', 'url' => ['/registros/index'], 'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('verMensualidades')],
                    !Yii::$app->user->isGuest && Yii::$app->user->can('verServdiet') ? '<li role="separator" class="divider"></li>' : '',
                    [
                        'label' => 'Servicios extraordinarios y dietas',
                        'class' => 'dropdown-header',
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('verServdiet')
                    ],
                    [
                        'label' => 'Valorar solicitudes serv. extr. y dietas',
                        'url' => ['/solicitudes/valorar-servdiet', 'ValorarServdietSearch[fecha]' => date('Y')],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('verServdiet')
                    ],
                    [
                        'label' => 'Solicitudes serv. extr. y dietas valoradas',
                        'url' => ['/solicitudes/valoradas-servdiet'],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('verServdiet')
                    ],
                    [
                        'label' => 'Registro de solicitudes serv. extr. y dietas',
                        'url' => ['/solicitudes/servdiet', 'ServdietSearch[fecha]' => date('Y')],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('verServdiet')
                    ],
                    [
                        'label' => 'Registro de mensualidades serv. extr. y dietas',
                        'url' => ['/registros-personal/index-personal'],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('verServdiet')
                    ],

                    Yii::$app->user->can('generarInformes') ? '<li role="separator" class="divider"></li>' : '',
                    [
                        'label' => 'Informes',
                        'class' => 'dropdown-header',
                        'visible' => (!Yii::$app->user->isGuest && Yii::$app->user->can('generarInformes'))
                    ],
                    ['label' => 'Concedido por empleado', 'url' => ['/informes/concedido-empleados'], 'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('generarInformes')],

                    Yii::$app->user->can('verParametros') ? '<li role="separator" class="divider"></li>' : '',
                    [
                        'label' => 'Parámetros',
                        'url' => ['/parametros/index'],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('verParametros')
                    ]
                ],
                'visible' => (!Yii::$app->user->isGuest && Yii::$app->user->can('gestionarConceptos')) || (!Yii::$app->user->isGuest && Yii::$app->user->can('verParametros')) || (!Yii::$app->user->isGuest && Yii::$app->user->can('valorarSolicitudes')) || (!Yii::$app->user->isGuest && Yii::$app->user->can('verMensualidades'))
            ],/*
            [
                'label' => 'Mis Solicitudes',
                'url' => ['/solicitudes/mis-solicitudes', 'MiSolicitudSearch[fecha]' => date('Y')],
                'visible' => !Yii::$app->user->isGuest
            ],*/
            [
                'label' => 'Crear Solicitud',
                'items' => [
                    [
                        'label' => 'Ayudas por Convenio',
                        'url' => ['/solicitudes/create','tip' => false],
                        'visible' => !Yii::$app->user->isGuest && Yii::$app->user->identity->datos->beneficiario_ayudas
                    ],[
                        'label' => 'Servicios Extraordinarios',
                        'url' => ['/solicitudes/create','tip' => true]
                    ],
                ],
                'visible' => !Yii::$app->user->isGuest && Yii::$app->user->can('hacerSolicitudes')
            ],
            Yii::$app->user->isGuest ?
            [
                'label' => 'Es necesario usar Firefox o Google Chrome',
            ] :
            [
                'label' => 'Usuario (' . Yii::$app->user->identity->datos->nombre . ')',
                'items' => [
                    ['label' => 'Parametros de telefonos y usuarios', 'url' => ['/mantenimiento/parametros'],
                    'visible' => Yii::$app->user->can('parametros')],
                    ['label' => 'Usuarios', 'url' => ['/segpasswords/index'],
                    'visible' => Yii::$app->user->can('parametros')],
                    ['label' => 'Telefonos', 'url' => ['/segtelefonos/index'],
                    'visible' => Yii::$app->user->can('parametros')],
                    ['label' => 'Historico de telefonos', 'url' => ['/seghistoricos/index'],
                    'visible' => Yii::$app->user->can('parametros')],
                    ['label' => 'Modo de Mantenimiento', 'url' => ['/mantenimiento/change'],
                    'visible' => Yii::$app->user->can('admin')],
                    ['label' => 'Mi cuenta', 'url' => ['/empleados/view', 'id' => $idEmpleadoLogin]],
                    '<li class="divider"></li>',
                    '',
                    [
                        'label' => 'Cerrar sesión',
                        'url' => ['site/logout'],
                        'linkOptions' => ['data-method' => 'POST']
                    ],
                ]
            ]
        ]
    ]);
    
    NavBar::end();
    ?>
    <?php 
    
    $extraCss = '';
        if (isset($this->params['fluid'])){
            $extraCss = '-fluid';
        }
        $extraCss = '';
        if (isset($this->params['breadcrumbs'])) {
            array_unshift($this->params['breadcrumbs'], ['label' => 'Portal ayudas', 'url' => ['site/index']]);
        }
    ?>
    <div class="container<?= $extraCss ?>">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= $content ?>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p id="pieAyt">&copy; Excmo. Ayuntamiento de Sanlúcar de Barrameda <?= date('Y') ?></p>

        <!-- <p class="pull-right"><?= Yii::powered() ?></p> -->
    </div>
</footer>

<?php $this->endBody() ?>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<div id="loading-overlay"></div>
<div class="loading-modal"></div>
</body>
</html>
<?php $this->endPage() ?>
