import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Movimiento = {
    id: number;
    observaciones: string;
    usuario: {
        id: number;
        nombre: string;
    };
    fecha_movimiento_f: string;
    actuacion: string;
};

type Props = {
    contrato: {
        id: number;
        n_expediente: string;
        movimientos: Movimiento[];
        usuario: {
            id: number;
            nombre: string;
        };
    };
};

export default function Movimientos({ contrato }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },
        { title: 'Control de Mando', href: '/contratos/control-mando' },
        { title: `Log: ${contrato.n_expediente}`, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Auditoría - ${contrato.n_expediente}`} />

            {/* Banner Institucional con estética de Control de Mando */}
            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase flex justify-between items-center tracking-tight">
                <span>Registro de Movimientos: {contrato.n_expediente}</span>
            </div>

            <div className="flex flex-col gap-4 p-4">

                {/* Tabla de Auditoría Estilo Técnico */}
                {contrato.movimientos?.length === 0 ? (
                    <div className="p-12 border-2 border-dashed border-gray-200 bg-gray-50/50 text-center rounded">
                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[12px]">
                            No se registran trazas de actividad para este expediente
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
                        <table className="w-full border-collapse text-[11px] uppercase">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200 w-40">Hora de la operación</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200 w-32">Operación</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200">Detalle de la Observación</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 w-48">Autor de la operación</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {contrato.movimientos.map((mov) => (
                                    <tr key={mov.id} className="hover:bg-blue-50/30 transition-colors border-b border-gray-100 last:border-0">
                                        <td className="px-4 py-2 font-mono text-gray-500 border-r border-gray-200 bg-gray-50/40">
                                            {mov.fecha_movimiento_f}
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200">
                                            <span className={`inline-block w-full text-center py-0.5 rounded-sm text-[9px] font-bold border ${
                                                mov.actuacion === 'Creación' ? 'bg-green-50 border-green-200 text-green-700' :
                                                mov.actuacion === 'Edición' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                                mov.actuacion === 'Borrado' ? 'bg-red-50 border-red-200 text-red-700' :
                                                'bg-gray-50 border-gray-200 text-gray-700'
                                            }`}>
                                                {mov.actuacion}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 normal-case text-gray-600 italic leading-relaxed">
                                            {mov.observaciones || '--- Sin observaciones registradas ---'}
                                        </td>
                                        <td className="px-4 py-2 font-bold text-[#e96b7d]">
                                            {mov.usuario?.nombre || 'USUARIO_DESCONOCIDO'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer Técnico */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 px-1 uppercase font-bold tracking-widest">
                    <div className="flex gap-4">
                        <span>Entradas: {contrato.movimientos?.length}</span>
                        <span>Expediente: {contrato.n_expediente}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Registro Verificado
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
