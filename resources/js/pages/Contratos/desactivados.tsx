import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {desactivados as desactivadosRoute} from '@/routes';
import Can from '@/components/can';
import { Link } from '@inertiajs/react';

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
    desactivados: Contrato[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contratos desactivados',
        href: desactivadosRoute(),
    },
];

export default function Desactivados({ desactivados }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contratos" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Los contratos desactivados</h1>
                {desactivados?.length === 0 ? (
                    <p className="text-gray-500">No tienes contratos desactivados aún.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full min-w-[600px] divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="px-4 py-2 text-left text-sm font-medium">NºExpediente</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Descripción</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Estado</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Responsable</th>
                                    <Can permission='manejar_contratos'>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Acciones</th>
                                    </Can>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                                {(desactivados).map((con) => (
                                    <tr key={con.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-2 font-medium">
                                                {con.n_expediente}
                                        </td>

                                        <td className="px-4 py-2">{con.descripcion}</td>
                                        <td className="px-4 py-2">{con.estado_expediente}</td>
                                        <td className="px-4 py-2">{con.responsable}</td>
                                        <Can permission='manejar_contratos'>
                                            <Link href={`/contratos/recuperar/${con.id}`}
                                                method='put'>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${'bg-green-100 text-green-500'}`}>
                                                    Recuperar contrato
                                                </span>
                                            </Link>
                                        </Can>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
