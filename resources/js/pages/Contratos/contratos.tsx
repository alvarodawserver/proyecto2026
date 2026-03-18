import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { contratos as contratoRoute } from '@/routes';
import Can from '@/components/can';

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

type Props = {
    contratos: Contrato[];
};

export default function Contratos({ contratos }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: contratoRoute() },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Contratos" />

            {/* Banner Institucional Rosa */}
            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase flex justify-between items-center tracking-tight">
                <span>Panel de Gestión: Contratos Activos</span>
                <Can permission='manejar_contratos'>
                    <Link
                        href="/contratos/create"
                        className="bg-white text-[#e96b7d] text-[10px] px-3 py-1 rounded-sm hover:bg-gray-100 transition-colors shadow-sm uppercase font-bold"
                    >
                        + Nuevo Expediente
                    </Link>
                </Can>
            </div>

            <div className="flex flex-col gap-4 p-4 text-[11px]">

                {contratos?.length === 0 ? (
                    <div className="p-12 border-2 border-dashed border-gray-200 bg-gray-50/50 text-center rounded">
                        <p className="text-gray-400 font-bold uppercase tracking-widest">No se han encontrado expedientes activos</p>
                    </div>
                ) : (
                    <div className="overflow-hidden border border-gray-300 shadow-sm bg-white font-sans">
                        <table className="w-full border-collapse uppercase">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200 w-36">Nº Expediente</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200">Descripción Objeto</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200 w-32">Estado</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200 w-44">Responsable</th>
                                    <Can permission='manejar_contratos'>
                                        <th className="px-4 py-2 text-center font-bold text-gray-700 w-40">Acciones</th>
                                    </Can>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {contratos.map((con) => (
                                    <tr key={con.id} className="hover:bg-gray-50 transition-colors">
                                        {/* NÚMERO DE EXPEDIENTE EN AZUL */}
                                        <td className="px-4 py-2 font-bold text-blue-600 border-r border-gray-200 bg-gray-50/30 font-mono">
                                            <Link href={`/contratos/show/${con.id}`} className="hover:underline">
                                                {con.n_expediente}
                                            </Link>
                                        </td>

                                        <td className="px-4 py-2 border-r border-gray-200 normal-case text-gray-600 leading-tight italic">
                                            {con.descripcion}
                                        </td>

                                        <td className="px-4 py-2 border-r border-gray-200">
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-sm text-[9px] font-bold inline-block w-full text-center">
                                                {con.estado_expediente}
                                            </span>
                                        </td>

                                        <td className="px-4 py-2 border-r border-gray-200 font-medium text-gray-700">
                                            {con.responsable}
                                        </td>

                                        <Can permission='manejar_contratos'>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center gap-2">
                                                    {/* BOTONES DE ACCIÓN COMO TEXTO */}
                                                    <Link href={`/contratos/edit/${con.id}`}>
                                                        <span className="px-2 py-1 rounded-full text-[9px] font-bold bg-blue-100 text-blue-600 border border-blue-200 hover:bg-blue-200 transition-colors">
                                                            EDITAR
                                                        </span>
                                                    </Link>

                                                    <Link
                                                        href={`/contratos/destroy/${con.id}`}
                                                        method="delete"
                                                        as="button"
                                                        onBefore={() => confirm('¿Desea dar de baja este contrato?')}
                                                    >
                                                        <span className="px-2 py-1 rounded-full text-[9px] font-bold bg-red-100 text-red-600 border border-red-200 hover:bg-red-200 transition-colors">
                                                            ELIMINAR
                                                        </span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </Can>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer informativo */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 px-1 uppercase font-bold tracking-widest">
                    <span>Total expedientes activos: {contratos?.length}</span>
                    <Can permission='manejar_contratos'>
                        <Link href="/contratos/desactivados" className="text-[#e96b7d] hover:underline">
                            Ir al archivo de desactivados
                        </Link>
                    </Can>
                </div>
            </div>
        </AppLayout>
    );
}
