import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { movimientos as movimientosRoute } from '@/routes';

type Movimiento = {
    id: number;
    observaciones: string;
    usuario: {
        id: number;
        nombre: string;
    };
    fecha_movimiento: string;
    actuacion: string;
};

type Props = {
    movimientos: Movimiento[];
};

export default function Movimientos({ movimientos }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },
        { title: 'Registro Global de Actividad', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de Actividad" />

            {/* Banner Institucional Rosa */}
            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase flex justify-between items-center tracking-tight">
                <span>Historial de Movimientos del Sistema</span>
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded">LOG_SISTEMA</span>
            </div>

            <div className="flex flex-col gap-4 p-4 text-[11px]">

                {movimientos?.length === 0 ? (
                    <div className="p-8 border border-gray-200 text-center rounded bg-gray-50">
                        <p className="text-gray-500 font-bold uppercase tracking-widest">No hay registros de actividad</p>
                    </div>
                ) : (
                    <div className="overflow-hidden border border-gray-300 shadow-sm bg-white">
                        <table className="w-full border-collapse uppercase">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200 w-40">Fecha</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200 w-32">Actuación</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200">Observaciones Técnicas</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700">Usuario Responsable</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {movimientos.map((mov) => (
                                    <tr key={mov.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-2 font-medium text-blue-600 border-r border-gray-200 bg-gray-50/30">
                                            {mov.fecha_movimiento}
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[9px] font-bold inline-block w-24 ${
                                                mov.actuacion === 'Creación' ? 'bg-green-100 text-green-700' :
                                                mov.actuacion === 'Edición' ? 'bg-blue-100 text-blue-700' :
                                                mov.actuacion === 'Borrado' ? 'bg-red-100 text-red-600' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {mov.actuacion}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 normal-case text-gray-600 italic">
                                            {mov.observaciones || '---'}
                                        </td>
                                        <td className="px-4 py-2 font-bold text-gray-700">
                                            {mov.usuario?.nombre}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 px-1 uppercase font-bold">
                    <span>Entradas totales: {movimientos?.length}</span>
                    <span>Auditoría Interna</span>
                </div>
            </div>
        </AppLayout>
    );
}
