import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

type Movimiento = {
    id: number;
    observaciones: string;
    usuario: {
        id: number;
        nombre: string;
    };
    fecha_movimiento_f: string;
    actuacion: string;
    contrato: {
        id_contrato: string;
        n_expediente: string;
    }
};

type Props = {
    movimientos: Movimiento[];
};

export default function Movimientos({ movimientos }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Control de Mando', href: '/contratos/control-mando' },
        { title: 'Registro Global de Actividad', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial de Actividad" />

            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase flex justify-between items-center tracking-tight">
                <span>Historial de Movimientos del Sistema</span>
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
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r">Usuario Responsable</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700">Contrato afectado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {movimientos.map((mov) => (
                                    <tr key={mov.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-2 font-medium  border-r border-gray-200 bg-gray-50/30">
                                            {mov.fecha_movimiento_f}
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
                                        <td className="px-4 py-2 border-r border-gray-200 normal-case italic">
                                            {mov.observaciones || '---'}
                                        </td>
                                        <td className="px-4 py-2 border-r font-bold text-gray-700">
                                            {mov.usuario?.nombre}
                                        </td>
                                        <td className="px-4 py-2 font-bold text-gray-700">
                                            {mov.contrato?.n_expediente}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 px-1 uppercase font-bold">
                    <span>Entradas totales: {movimientos?.length}</span>
                </div>
                <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="text-[10px] uppercase tracking-widest bg-gray-200 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
                    Volver
                </Button>
            </div>
        </AppLayout>
    );
}
