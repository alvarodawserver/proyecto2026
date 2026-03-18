import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

type Movimiento = {
    id: number;
    observaciones: string;
    usuario: { id: number; nombre: string };
    fecha_movimiento: string;
    actuacion: string;
    contrato?: { n_expediente: string };
};

type Props = {
    movimientos: Movimiento[];
    filters: {
        actuacion?: string;
        fecha_desde?: string;
        fecha_hasta?: string;
    };
};

export default function Movimientos({ movimientos = [], filters }: Props) {
    // Debug corregido para ver qué llega realmente
    console.log("Datos reales de la Prop:", movimientos);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Inicio', href: '/dashboard' },
        { title: 'Auditoría General', href: '#' },
    ];

    // Usamos el objeto 'filters' que llega del backend
    const [actuacion, setActuacion] = useState(filters?.actuacion || '');
    const [fechaDesde, setFechaDesde] = useState(filters?.fecha_desde || '');
    const [fechaHasta, setFechaHasta] = useState(filters?.fecha_hasta || '');

    const applyFilters = (newFilters: any) => {
        const params = {
            actuacion: newFilters.actuacion ?? actuacion,
            fecha_desde: newFilters.fecha_desde ?? fechaDesde,
            fecha_hasta: newFilters.fecha_hasta ?? fechaHasta,
        };

        router.get('/movimientos', params, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setActuacion('');
        setFechaDesde('');
        setFechaHasta('');
        router.get('/movimientos');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Auditoría General" />

            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase flex justify-between items-center tracking-tight">
                <span>Historial Global de Movimientos</span>
                <button onClick={resetFilters} className="text-[9px] bg-white/20 hover:bg-white/40 px-2 py-0.5 rounded border border-white/20 uppercase">
                    Limpiar Filtros ↺
                </button>
            </div>

            <div className="flex flex-col gap-4 p-4 text-[11px]">
                {/* FILTROS */}
                <div className="bg-white border border-gray-300 p-3 flex flex-wrap items-end gap-6 shadow-sm">
                    <div className="flex flex-col gap-1">
                        <label htmlFor='actuacion' className="text-[10px] font-bold text-gray-500 uppercase">Actuación</label>
                        <select id='actuacion'
                            value={actuacion}
                            onChange={(e) => { setActuacion(e.target.value); applyFilters({ actuacion: e.target.value }); }}
                            className="text-[11px] border-gray-300 focus:ring-[#e96b7d] focus:border-[#e96b7d] rounded-sm py-1 min-w-[140px] uppercase"
                        >
                            <option value="">TODAS LAS OPERACIONES</option>
                            <option value="Creación">CREACIÓN</option>
                            <option value="Modificación">MODIFICACIÓN</option>
                            <option value="Restauración">RESTURACIÓN</option>
                            <option value="Eliminación">ELIMINACIÓN</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor='fecha_desde' className="text-[10px] font-bold text-gray-500 uppercase">Desde</label>
                        <input id='fecha_desde'
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => { setFechaDesde(e.target.value); applyFilters({ fecha_desde: e.target.value }); }}
                            className="text-[11px] border-gray-300 rounded-sm py-1"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor='fecha_hasta' className="text-[10px] font-bold text-gray-500 uppercase">Hasta</label>
                        <input id='fecha_hasta'
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => { setFechaHasta(e.target.value); applyFilters({ fecha_hasta: e.target.value }); }}
                            className="text-[11px] border-gray-300 rounded-sm py-1"
                        />
                    </div>
                </div>

                {/* TABLA */}
                <div className="overflow-hidden border border-gray-300 shadow-sm bg-white">
                    <table className="w-full border-collapse uppercase">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300 text-gray-700 font-bold">
                                <th className="px-4 py-2 text-left border-r border-gray-200">Fecha</th>
                                <th className="px-4 py-2 text-left border-r border-gray-200">Actuación</th>
                                <th className="px-4 py-2 text-left border-r border-gray-200">Expediente</th>
                                <th className="px-4 py-2 text-left border-r border-gray-200">Observaciones</th>
                                <th className="px-4 py-2 text-left">Responsable</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {movimientos.length > 0 ? movimientos.map((mov) => (
                                <tr key={mov.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-r border-gray-200">{mov.fecha_movimiento}</td>
                                    <td className="px-4 py-2 border-r border-gray-200 text-center">
                                        <span className={`px-2 py-1 rounded-full text-[9px] font-bold inline-block w-24 ${
                                            mov.actuacion === 'Creación' ? 'bg-green-100 text-green-700' :
                                            mov.actuacion === 'Edición' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {mov.actuacion}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border-r border-gray-200 font-bold">{mov.contrato?.n_expediente || 'N/A'}</td>
                                    <td className="px-4 py-2 border-r border-gray-200 normal-case italic text-gray-600">{mov.observaciones}</td>
                                    <td className="px-4 py-2 font-bold">{mov.usuario?.nombre || 'SISTEMA'}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-400">Sin registros</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
