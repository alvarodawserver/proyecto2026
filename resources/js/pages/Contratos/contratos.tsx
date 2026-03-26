import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { contratos as contratoRoute } from '@/routes';
import Can from '@/components/can';
import { Fragment } from 'react';

type Contrato = {
    id: number;
    id_contrato: string;
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
    fecha_inicio_f: string,
    fecha_fin_f: string
};

type Props = {
    contratos: Contrato[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Utilidades',
        href: 'http://localhost:8080/index.php?r=utilidades/index',
    },
    {
        title: 'Contratos',
        href: '#',
    },
];

export default function Contratos({ contratos }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contratos" />

            <div className="flex flex-col gap-4 p-4">
                {/* Barra de Acciones Superior */}
                <div className="flex flex-wrap items-center gap-4 bg-gray-50 dark:bg-gray-800 p-3 border border-gray-300 rounded shadow-sm">
                    <h1 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mr-auto">
                        Panel de Gestión: Contratos Activos
                    </h1>


                        <Link
                            className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white text-[10px] font-bold py-1.5 px-3 rounded shadow-sm transition-colors uppercase tracking-wider"
                            href={`/contratos/create`}
                        >
                            Dar de alta nuevo contrato
                        </Link>

                </div>

                {/* Tabla con estilo Control de Mando */}
                <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse text-[11px]">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300 uppercase">
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900">Nº Expediente</th>
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900">Descripción</th>
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900">Fecha inicio</th>
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900">Fecha final</th>
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900 text-center">Estado</th>
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900">Responsable</th>
                                <th className="px-4 py-2 border-r border-gray-300 font-bold text-blue-900">Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {contratos?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center italic text-gray-500">
                                        No hay expedientes activos registrados.
                                    </td>
                                </tr>
                            ) : (
                                contratos.map((con) => (
                                    <tr key={con.id} className="border-b border-gray-200 hover:bg-blue-50/50 transition-colors">
                                        <td className="px-4 py-2 border-r border-gray-200 font-bold text-blue-600">
                                            <Link href={`/contratos/show/${con.id}`}>
                                                {con.n_expediente}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 uppercase text-gray-700 italic">
                                            {con.descripcion}
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 text-gray-600">
                                            {con.fecha_inicio_f}
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 text-gray-600">
                                            {con.fecha_fin_f}
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 text-center">
                                            <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase border ${
                                                con.estado_expediente === 'Activo'
                                                ? 'bg-blue-50 border-blue-200 text-blue-600'
                                                : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                            }`}>
                                                {con.estado_expediente || 'ACTIVO'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 uppercase text-gray-600">
                                            {con.responsable}
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 text-center">
                                            <Link
                                                href={`/contratos/destroy/${con.id}`}
                                                method="delete"
                                                as="button"
                                                onBefore={() => confirm('¿Eliminar contrato?')}
                                                className="w-full min-w-37.5 bg-[#b61313] hover:bg-red-600 text-white text-[9px] py-0.5 text-center font-bold rounded shadow-sm"
                                            >
                                                DAR DE BAJA
                                            </Link>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer de la tabla */}
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                    <span>Total expedientes activos: {contratos?.length}</span>

                </div>
            </div>
        </AppLayout>
    );
}
