import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {contratos as contratoRoute} from '@/routes';
import Can from '@/components/can';
import { Link } from '@inertiajs/react';

type Contrato = {
    id:number,
    id_contrato:string,
    n_expediente:string,
    descripcion:string,
    responsable:string,
    tipos_id:number,
    importe_estimado:number | '',
    tipo_procedimiento:number;
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
                        <table className="w-full min-w-150 divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="px-4 py-2 text-left text-sm font-medium">Código contrato</th>
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
                                {(contratos).map((con) => (
                                    <tr key={con.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className='px-4 py-2 font-medium text-blue-600'>
                                                <Link href={`/contratos/show/${con.id}`}>
                                                    {con.id_contrato}
                                                </Link>
                                        </td>
                                        <td className="px-4 py-2">{con.n_expediente}</td>
                                        <td className="px-4 py-2">{con.descripcion}</td>
                                        <td className="px-4 py-2">{con.estado_expediente}</td>
                                        <td className="px-4 py-2">{con.responsable}</td>
                                        <Can permission='manejar_contratos'>
                                            <Link href={`/contratos/edit/${con.id}`}>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${'bg-blue-100 text-blue-500'}`}>
                                                    Editar
                                                </span>
                                            </Link>
                                            <Link href={`/contratos/destroy/${con.id}`}
                                            method='delete'
                                            onBefore={() => confirm('¿Estás seguro de que deseas eliminar este contrato?')}
                                            >
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${'bg-red-100 text-red-500'}`}>
                                                    Eliminar
                                                    </span>
                                            </Link>
                                        </Can>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Can permission='manejar_contratos'>
                    <Link href={`/contratos/create`}
                    className='btn btn-info'>
                        Dar de alta a un contrato
                    </Link>
                </Can>
            </div>
        </AppLayout>
    );
}
