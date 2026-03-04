import {Head, Link} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { contratos as contratosRoute } from '@/routes';


type Contrato = {
    id: number;
    n_expediente: string;
    descripcion: string;
    responsable: string;
    created_by: string;
    tipo_contrato: string;
    importe_estimado: number;
    pro_adjudicacion: string;
    fecha_prevista: string;
    fecha_inicio: string;
    alerta_vencimiento: string;
    unidad_promotora: string;
    duracion_estimada: string;
    estado_expediente: string;

};

type Props = {
    contratos: Contrato[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contratos',
        href: contratosRoute(),
    },
];

export default function Show({ contrato }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Contrato ${contrato.id}`} />

            <div className="flex flex-col gap-3 p-4">

                <h1 className="text-2xl font-bold mb-4">
                    Nº de expediente: {contrato.n_expediente}
                </h1>

                <p><span className="font-semibold text-gray-800">Id:</span> <span className="text-gray-600">{contrato.id}</span></p>

                <p><span className="font-semibold text-gray-800">Tipo de contrato:</span> <span className="text-gray-600">{contrato.tipo_contrato}</span></p>

                <p><span className="font-semibold text-gray-800">Estado del expediente:</span> <span className="text-gray-600">{contrato.estado_expediente}</span></p>

                <p><span className="font-semibold text-gray-800">Responsable:</span> <span className="text-gray-600">{contrato.responsable}</span></p>

                <p><span className="font-semibold text-gray-800">Creado por:</span> <span className="text-gray-600">{contrato.created_by}</span></p>

                <p><span className="font-semibold text-gray-800">Unidad promotora:</span> <span className="text-gray-600">{contrato.unidad_promotora}</span></p>

                <p><span className="font-semibold text-gray-800">Importe estimado:</span> <span className="text-gray-600">{contrato.importe_estimado}</span></p>

                <p><span className="font-semibold text-gray-800">Procedimiento de adjudicación:</span> <span className="text-gray-600">{contrato.pro_adjudicacion}</span></p>

                <p><span className="font-semibold text-gray-800">Fecha prevista:</span> <span className="text-gray-600">{contrato.fecha_prevista}</span></p>

                <p><span className="font-semibold text-gray-800">Fecha de inicio:</span> <span className="text-gray-600">{contrato.fecha_inicio}</span></p>

                <p><span className="font-semibold text-gray-800">Alerta de vencimiento:</span> <span className="text-gray-600">{contrato.alerta_vencimiento}</span></p>

                <p><span className="font-semibold text-gray-800">Duración estimada:</span> <span className="text-gray-600">{contrato.duracion_estimada}</span></p>

                <div className="flex gap-4 mt-4">
                    <Link
                        className="text-blue-600 hover:underline"
                        href={`/contratos/${contrato.id}/edit`}
                    >
                        Editar
                    </Link>

                    <Link
                        className="text-red-600 hover:underline"
                        href={`/contratos/${contrato.id}/delete`}
                    >
                        Eliminar
                    </Link>
                    <Link
                        href={route('contratos.index')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Volver
                    </Link>
                </div>

            </div>
        </AppLayout>
    );
}
