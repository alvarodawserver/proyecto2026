import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {procedimientos as procedimientoRoute} from '@/routes';
import Can from '@/components/can';
import { Link } from '@inertiajs/react';

type Procedimiento = {
    id:number,
    tipo_procedimiento:string,
};

type Props = {
    procedimientos: Procedimiento[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Procedimientos',
        href: procedimientoRoute(),
    },
];

export default function Procedimientos({ procedimientos }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Procedimientos" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Procedimientos</h1>
                {procedimientos?.length === 0 ? (
                    <p className="text-gray-500">No tienes procedimientos aún.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full min-w-[600px] divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="px-4 py-2 text-left text-sm font-medium">Tipo de procedimiento</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Acciones</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                                {(procedimientos).map((pro) => (
                                    <tr key={pro.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-2 font-medium text-blue-600">
                                            <Link href={`/procedimientos/show/${pro.id}`}>
                                                {pro.tipo_procedimiento}
                                            </Link>
                                        </td>
                                        <Can permission='manejar_procedimientos'>
                                            <Link href={`/procedimientos/edit/${pro.id}`}>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${'bg-blue-100 text-blue-500'}`}>
                                                    Editar
                                                </span>
                                            </Link>
                                            <Link href={`/procedimientos/destroy/${pro.id}`}
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
                <Can permission='manejar_procedimientos'>
                    <Link href={`/procedimientos/create`}
                    className='btn btn-info'>
                        Crear Procedimiento
                    </Link>
                </Can>
            </div>
        </AppLayout>
    );
}
