import {Head, Link} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';


type Contrato = {
    id: number;
    n_expediente: string;
    descripcion: string;
    responsable: string;
    usuario?:{
        id:number,
        nombre:string,
    }
    tipo:{
        tipo_contrato:string
    }
    importe_estimado: number;
    tipo_procedimiento:{
        tipo_procedimiento:string,
    };
    fecha_prevista_f: string;
    fecha_inicio_f: string;
    alerta_vencimiento_f: string;
    unidad_promotora: string;
    duracion_estimada_f: string;
    estado_expediente: string;

};

type Props = {
    contrato: Contrato;
};



export default function Show({ contrato }:Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },
        { title: `Expediente ${contrato.n_expediente}`, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Contrato ${contrato.id}`} />

            <div className="flex flex-col gap-3 p-4">

                <h1 className="text-2xl font-bold mb-4">
                    Nº de expediente: {contrato.n_expediente}
                </h1>

                <p><span className="font-semibold text-gray-800">Tipo de contrato:</span> <span className="text-gray-600">{contrato.tipo.tipo_contrato}</span></p>

                <p><span className="font-semibold text-gray-800">Estado del expediente:</span> <span className="text-gray-600">{contrato.estado_expediente}</span></p>

                <p><span className="font-semibold text-gray-800">Responsable:</span> <span className="text-gray-600">{contrato.responsable}</span></p>

                <p><span className="font-semibold text-gray-800">Creado por:</span> <span className="text-gray-600">{contrato.usuario?.nombre}</span></p>

                <p><span className="font-semibold text-gray-800">Unidad promotora:</span> <span className="text-gray-600">{contrato.unidad_promotora}</span></p>

                <p><span className="font-semibold text-gray-800">Importe estimado:</span> <span className="text-gray-600">{contrato.importe_estimado}</span></p>

                <p><span className="font-semibold text-gray-800">Procedimiento de adjudicación:</span> <span className="text-gray-600">{contrato.tipo_procedimiento.tipo_procedimiento}</span></p>

                <p><span className="font-semibold text-gray-800">Fecha prevista:</span> <span className="text-gray-600">{contrato.fecha_prevista_f}</span></p>

                <p><span className="font-semibold text-gray-800">Fecha de inicio:</span> <span className="text-gray-600">{contrato.fecha_inicio_f}</span></p>

                <p><span className="font-semibold text-gray-800">Alerta de vencimiento:</span> <span className="text-gray-600">{contrato.alerta_vencimiento_f}</span></p>

                <p><span className="font-semibold text-gray-800">Duración estimada:</span> <span className="text-gray-600">{contrato.duracion_estimada_f}</span></p>

                <div className="flex gap-4 mt-4">
                    <Link
                        href={'/contratos'}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Volver
                    </Link>
                </div>

            </div>
        </AppLayout>
    );
}
