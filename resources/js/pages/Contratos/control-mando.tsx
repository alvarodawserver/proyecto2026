import React, { useEffect, useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Contrato {
    id: number;
    n_expediente: string;
    descripcion: string;
    unidad_promotora: string;
    fecha_inicio_f: string;
    estado_expediente: string;
}

interface Departamento {
    id: number;
    nombre: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/' },
    { title: 'Control de Mando', href: '/contratos/control-mando' },
];

const ControlMando = ({ todos_los_departamentos = [], user_rol }: { todos_los_departamentos?: Departamento[], user_rol?: number }) => {
    const { auth } = usePage().props as any;
    const user = auth.user;

    const miDepartamentoRaw = user?.empleado?.departamento_nombre || user?.departamento || '';
    const miDepartamento = miDepartamentoRaw.toUpperCase();

    const esContratacion = miDepartamento.includes('CONTRATACIÓN') || miDepartamento.includes('CONTRATACION');
    const esJefe = Number(user_rol) === 1;
    const esAdmin = user?.name?.toLowerCase() === 'admin';

    const tieneAcceso = (esContratacion && esJefe) || esAdmin;

    const [datos, setDatos] = useState<Contrato[]>([]);
    const [loading, setLoading] = useState(true);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [departamentoFiltro, setDepartamentoFiltro] = useState('');

    const fetchContratos = async () => {
        if (!tieneAcceso) return;
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (fechaInicio) params.append('desde', fechaInicio);
            if (fechaFin) params.append('hasta', fechaFin);
            if (departamentoFiltro) params.append('departamento', departamentoFiltro);

            const response = await fetch(`/api/contratos/control-mando?${params.toString()}`);
            const result = await response.json();
            setDatos(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContratos();
    }, [fechaInicio, fechaFin, departamentoFiltro]);

    const descargarPDF = (id: number, tipo: 'basico' | 'completo') => {
        window.open(`/contratos/${id}/pdf?tipo=${tipo}`, '_blank');
    };

    if (!tieneAcceso) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-8 text-center">
                    <h1 className="text-red-500 font-bold text-xl">Acceso Denegado</h1>
                    <p className="text-gray-600">No tienes permisos suficientes para ver esta sección.</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Control de Mando" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-wrap items-center gap-4 bg-gray-50 dark:bg-gray-800 p-3 border border-gray-300 rounded shadow-sm">
                    <div className="flex items-center gap-2">
                        <label htmlFor="fecha-desde" className="text-xs font-bold text-gray-700 dark:text-gray-300">DESDE:</label>
                        <input
                            id="fecha-desde"
                            type="date"
                            className="text-xs border-gray-300 rounded p-1"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="fecha-hasta" className="text-xs font-bold text-gray-700 dark:text-gray-300">HASTA:</label>
                        <input
                            id="fecha-hasta"
                            type="date"
                            className="text-xs border-gray-300 rounded p-1"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 border-l pl-4">
                        <label htmlFor="unidad-select" className="text-xs font-bold text-gray-700 dark:text-gray-300">UNIDAD:</label>
                        <select
                            id="unidad-select"
                            title="Seleccionar unidad"
                            className="text-xs border-gray-300 rounded p-1"
                            value={departamentoFiltro || ""}
                            onChange={(e) => setDepartamentoFiltro(e.target.value)}
                        >
                            <option value="">TODAS LAS UNIDADES</option>
                            {Array.isArray(todos_los_departamentos) && todos_los_departamentos.map((dept) => (
                                <option key={dept.id} value={dept.nombre}>
                                    {dept.nombre.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Link
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold py-1.5 px-3 border border-gray-300 rounded shadow-sm uppercase"
                        href={`/movimientos`}
                    >
                        Historial de movimientos
                    </Link>

                    <Link
                        className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white text-[10px] font-bold py-1.5 px-3 rounded shadow-sm uppercase"
                        href={`/contratos/create`}
                    >
                        Crear Contrato
                    </Link>

                    {(esContratacion || esAdmin) && (
                        <Link
                            className="flex items-center gap-2 bg-[#ef4444] hover:bg-[#dc2626] text-white text-[10px] font-bold py-1.5 px-3 rounded shadow-sm uppercase"
                            href={`/contratos/desactivados`}
                        >
                            Ver Contratos desactivados
                        </Link>
                    )}
                </div>

                <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse text-[11px]">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300 uppercase">
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900">Nº Expediente</th>
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900">Descripción</th>
                                {(esContratacion || esAdmin) && (
                                    <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900 text-center">Unidad Promotora</th>
                                )}
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900 text-center">Fecha Inicio</th>
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900 text-center">Estado</th>
                                <th className="px-4 py-2 font-bold text-blue-900 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6} className="p-8 text-center italic text-gray-500">Cargando registros...</td></tr>
                            ) : datos.map((contrato) => (
                                <tr key={contrato.id} className="border-b border-gray-200 hover:bg-blue-50/50">
                                    <td className="px-4 py-2 border-r border-gray-200 font-bold text-blue-600">
                                        <Link href={`/contratos/show/${contrato.id}`}>{contrato.n_expediente}</Link>
                                    </td>
                                    <td className="px-4 py-2 border-r border-gray-200 uppercase text-gray-700">
                                        {contrato.descripcion}
                                    </td>
                                    {(esContratacion || esAdmin) && (
                                        <td className="px-4 py-2 border-r border-gray-200 uppercase text-center text-gray-600">
                                            {contrato.unidad_promotora}
                                        </td>
                                    )}
                                    <td className="px-4 py-2 border-r border-gray-200 text-center text-gray-600">
                                        {contrato.fecha_inicio_f}
                                    </td>
                                    <td className="px-4 py-2 border-r border-gray-200 text-center">
                                        <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase border ${
                                            contrato.estado_expediente === 'Activo'
                                            ? 'bg-green-50 border-green-200 text-green-700'
                                            : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                        }`}>
                                            {contrato.estado_expediente}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className="flex flex-col gap-1 items-center">
                                            {contrato.estado_expediente !== 'Finalizado' && (
                                                <Link
                                                    href={`/contratos/edit/${contrato.id}`}
                                                    className="w-full min-w-[150px] bg-[#4fc3f7] hover:bg-blue-400 text-white text-[9px] py-0.5 text-center font-bold rounded shadow-sm"
                                                >
                                                    COMPLETAR CONTRATO
                                                </Link>
                                            )}
                                            <div className="flex gap-1 w-full min-w-[150px]">
                                                <button
                                                    onClick={() => descargarPDF(contrato.id, 'basico')}
                                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-[9px] py-0.5 font-bold rounded shadow-sm"
                                                >
                                                    PDF BÁS.
                                                </button>
                                                <button
                                                    onClick={() => descargarPDF(contrato.id, 'completo')}
                                                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-[9px] py-0.5 font-bold rounded shadow-sm"
                                                >
                                                    PDF COMP.
                                                </button>
                                            </div>
                                            <Link
                                                href={`/contratos/destroy/${contrato.id}`}
                                                method="delete"
                                                as="button"
                                                onBefore={() => confirm('¿Eliminar contrato?')}
                                                className="w-full min-w-[150px] bg-[#f2a154] hover:bg-orange-400 text-white text-[9px] py-0.5 text-center font-bold rounded shadow-sm"
                                            >
                                                ELIMINAR
                                            </Link>
                                            <Link
                                                href={`/contratos/${contrato.id}/movimientos`}
                                                className="w-full min-w-[150px] bg-[#84cc16] hover:bg-[#65a30d] text-white text-[9px] py-0.5 text-center font-bold rounded shadow-sm"
                                            >
                                                REGISTRO DE MOVIMIENTOS
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default ControlMando;
