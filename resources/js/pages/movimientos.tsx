import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { movimientos as movimientosRoute } from '@/routes';

type Movimiento = {
    id: number;
    observaciones: string;
    usuario:{
        id:number;
        nombre:string;
    };
    fecha_movimiento: string;
    fecha_movimiento_f:string;
    actuacion: string;
};

type Props = {
    movimientos: Movimiento[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Movimientos',
        href: movimientosRoute(),
    },
];

export default function Movimientos({ movimientos }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Movimientos" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Tus movimientos</h1>

                {movimientos?.length === 0 ? (
                    <p className="text-gray-500">No tienes movimientos aún.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full min-w-[600px] divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="px-4 py-2 text-left text-sm font-medium">Fecha</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Observaciones</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Actuación</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Usuario</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            {movimientos.map((mov) => (
                                <tr key={mov.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 text-sm">{mov.fecha_movimiento_f}</td>
                                    <td className="px-4 py-2 text-sm">{mov.observaciones}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            mov.actuacion === 'Creación' ? 'bg-green-100 text-green-700' :
                                            mov.actuacion === 'Edición' ? 'bg-blue-100 text-blue-700' :
                                            mov.actuacion === 'Borrado' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'}`}>
                                            {mov.actuacion}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-sm">{mov.usuario?.nombre || 'Sistema'}</td>
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
