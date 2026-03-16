import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { contratos as contratoRoute } from '@/routes';

type Contrato = {
    id: number;
    n_expediente: string;
    descripcion: string;
    responsable: string;
    tipos_id: number;
    importe_estimado: number | '';
    tipo_procedimiento: number;
    fecha_prevista: string;
    fecha_inicio: string;
    unidad_promotora: string;
    duracion_estimada: string;
    estado_expediente: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contratos',
        href: contratoRoute(),
    },
    {
        title: 'Control de Mando',
        href: '#',
    },
];

const ControlMando = () => {
    const { auth } = usePage().props as any;
    const user = auth.user;

    const [datos, setDatos] = useState<Contrato[]>([]);
    const [loading, setLoading] = useState(true);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const fetchContratos = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (fechaInicio) params.append('desde', fechaInicio);
            if (fechaFin) params.append('hasta', fechaFin);

            const response = await fetch(`/api/contratos/control-mando?${params.toString()}`);
            const result = await response.json();
            setDatos(result);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContratos();
    }, [fechaInicio, fechaFin]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Control de Mando" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Control de Mando: {user?.departamento === 'CONTRATACIÓN' ? 'Global' : user?.departamento}
                    </h1>

                    {/* Buscador por Fechas con Labels para Accesibilidad */}
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <label htmlFor="fecha-inicio" className="sr-only">Fecha Inicio</label>
                        <input
                            id="fecha-inicio"
                            type="date"
                            aria-label="Fecha de inicio"
                            className="text-sm border-none bg-transparent focus:ring-0 dark:text-white"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                        <span className="text-gray-400" aria-hidden="true">a</span>
                        <label htmlFor="fecha-fin" className="sr-only">Fecha Fin</label>
                        <input
                            id="fecha-fin"
                            type="date"
                            aria-label="Fecha de fin"
                            className="text-sm border-none bg-transparent focus:ring-0 dark:text-white"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                        {(fechaInicio || fechaFin) && (
                            <button
                                onClick={() => { setFechaInicio(''); setFechaFin(''); }}
                                className="text-xs text-red-500 hover:underline px-2"
                                type="button"
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">Nº Expediente</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">Descripción</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">Unidad</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">Fecha Inicio</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {loading ? (
                                    <tr><td colSpan={5} className="p-10 text-center text-gray-400">Cargando datos...</td></tr>
                                ) : datos.length > 0 ? (
                                    datos.map((contrato) => (
                                        <tr key={contrato.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium dark:text-gray-200">{contrato.n_expediente}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{contrato.descripcion}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{contrato.unidad_promotora}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{contrato.fecha_inicio}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase dark:bg-blue-900 dark:text-blue-200">
                                                    {contrato.estado_expediente}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={5} className="p-10 text-center text-gray-400">No se encontraron contratos para este periodo.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ControlMando;
