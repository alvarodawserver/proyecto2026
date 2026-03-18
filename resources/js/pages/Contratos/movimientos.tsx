import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

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
    contrato: {
        id: number;
        n_expediente: string;
        movimientos: Movimiento[];
    };
    filters: {
        actuacion?: string;
        fecha_desde?: string;
        fecha_hasta?: string;
    };
};

export default function Movimientos({ contrato, filters }: Props) {
    // Debug: Esto te dirá en la consola si los datos llegan o no
    console.log("Datos recibidos:", { contrato, filters });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },
        { title: `Log: ${contrato?.n_expediente || 'Cargando...'}`, href: '#' },
    ];

    const [actuacion, setActuacion] = useState(filters?.actuacion || '');
    const [fechaDesde, setFechaDesde] = useState(filters?.fecha_desde || '');
    const [fechaHasta, setFechaHasta] = useState(filters?.fecha_hasta || '');

    // Si por algún error del controlador 'contrato' es null, mostramos un aviso en lugar de pantalla en blanco
    if (!contrato) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-8 text-center text-red-500 font-bold uppercase">
                    Error: No se han podido cargar los datos del contrato.
                </div>
            </AppLayout>
        );
    }

    const applyFilters = (newFilters: any) => {
        const params = {
            actuacion: newFilters.actuacion ?? actuacion,
            fecha_desde: newFilters.fecha_desde ?? fechaDesde,
            fecha_hasta: newFilters.fecha_hasta ?? fechaHasta,
        };

        router.get(`/contratos/${contrato.id}/movimientos`, params, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setActuacion('');
        setFechaDesde('');
        setFechaHasta('');
        router.get(`/contratos/${contrato.id}/movimientos`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Auditoría - ${contrato?.n_expediente}`} />

            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase flex justify-between items-center tracking-tight">
                <span>Registro de Movimientos: {contrato?.n_expediente}</span>
                <button
                    onClick={resetFilters}
                    className="text-[9px] bg-white/20 hover:bg-white/40 px-2 py-0.5 rounded border border-white/20 uppercase transition-colors"
                >
                    Limpiar Filtros ↺
                </button>
            </div>

            <div className="flex flex-col gap-4 p-4">
                {/* FILTROS */}
                <div className="bg-white border border-gray-300 p-3 flex flex-wrap items-end gap-6 shadow-sm">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="select-actuacion" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Actuación
                        </label>
                        <select
                            id="select-actuacion"
                            name="actuacion"
                            title="Filtrar por tipo de actuación"
                            value={actuacion}
                            onChange={(e) => {
                                setActuacion(e.target.value);
                                applyFilters({ actuacion: e.target.value });
                            }}
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
                        <label htmlFor="fecha-desde" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Desde fecha
                        </label>
                        <input
                            id="fecha-desde"
                            name="fecha_desde"
                            type="date"
                            title="Seleccionar fecha de inicio"
                            value={fechaDesde}
                            onChange={(e) => {
                                setFechaDesde(e.target.value);
                                applyFilters({ fecha_desde: e.target.value });
                            }}
                            className="text-[11px] border-gray-300 focus:ring-[#e96b7d] focus:border-[#e96b7d] rounded-sm py-1"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fecha-hasta" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Hasta fecha
                        </label>
                        <input
                            id="fecha-hasta"
                            name="fecha_hasta"
                            type="date"
                            title="Seleccionar fecha de fin"
                            value={fechaHasta}
                            onChange={(e) => {
                                setFechaHasta(e.target.value);
                                applyFilters({ fecha_hasta: e.target.value });
                            }}
                            className="text-[11px] border-gray-300 focus:ring-[#e96b7d] focus:border-[#e96b7d] rounded-sm py-1"
                        />
                    </div>
                </div>

                {/* TABLA */}
                <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                        <thead className="bg-gray-50 border-b border-gray-300 text-gray-700 uppercase font-bold">
                            <tr>
                                <th scope="col" className="p-3">Fecha</th>
                                <th scope="col" className="p-3">Usuario</th>
                                <th scope="col" className="p-3">Actuación</th>
                                <th scope="col" className="p-3">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {contrato?.movimientos?.length > 0 ? (
                                contrato.movimientos.map((mov) => (
                                    <tr key={mov.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-3 whitespace-nowrap font-medium text-gray-600">
                                            {mov.fecha_movimiento ? mov.fecha_movimiento : '---'}
                                        </td>
                                        <td className="p-3 uppercase">{mov.usuario?.nombre || 'Sistema'}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                                                mov.actuacion === 'Creación' ? 'bg-green-100 text-green-700' :
                                                mov.actuacion === 'Edición' ? 'bg-blue-100 text-blue-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {mov.actuacion}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-500">{mov.observaciones}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-gray-400 uppercase font-bold italic">
                                        No hay movimientos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
