import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {contratos as contratoRoute} from '@/routes';

type Contrato = {
    id:number,
    n_expediente:string,
    descripcion:string,
    responsable:string,
    tipo_contrato:string,
    importe_estimado:number | '',
    proc_adjudicacion:string;
    fecha_prevista:string,
    fecha_inicio:string,
    unidad_promotora:string,
    duracion_estimada:string,
    estado_expediente:string,

};

type Props = {
    contratos: Contrato[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contratos',
        href: contratoRoute(),
    },
];

export default function Contratos({ contratos }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contratos" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Tus contratos</h1>
                {contratos?.length === 0 ? (
                    <p className="text-gray-500">No tienes contratos aún.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full min-w-[600px] divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="px-4 py-2 text-left text-sm font-medium">NºExpediente</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Descripción</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Estado</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Responsable</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                                {(contratos).map((con) => (
                                    <tr key={con.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-2">{con.n_expediente}</td>
                                        <td className="px-4 py-2">{con.descripcion}</td>
                                        <td className="px-4 py-2">{con.estado_expediente}</td>
                                        <td className="px-4 py-2">{con.responsable}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <a href="/contratos/create" className='btn btn-info'>Crear contrato</a>
            </div>
        </AppLayout>
    );
}
