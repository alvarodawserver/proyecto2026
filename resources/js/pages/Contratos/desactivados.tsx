import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import Can from '@/components/can';

type Contrato = {
    id: number;
    n_expediente: string;
    descripcion: string;
    responsable: string;
    tipo_contrato: string;
    importe_estimado: number | '';
    proc_adjudicacion: string;
    fecha_prevista: string;
    fecha_inicio: string;
    unidad_promotora: string;
    duracion_estimada: string;
    estado_expediente: string;
};

type Props = {
    desactivados: Contrato[];
};

export default function Desactivados({ desactivados }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },
        { title: 'Contratos Desactivados', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contratos Desactivados" />


            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase flex justify-between items-center tracking-tight">
                <span>Archivo Histórico: Contratos Desactivados</span>
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded">ESTADO: INACTIVO</span>
            </div>

            <div className="flex flex-col gap-4 p-4 text-[11px]">

                {desactivados?.length === 0 ? (
                    <div className="p-12 border-2 border-dashed border-gray-200 bg-gray-50/50 text-center rounded">
                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">
                            No existen registros en la papelera de reciclaje
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden border border-gray-300 shadow-sm bg-white font-sans">
                        <table className="w-full border-collapse uppercase">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200 w-40">Nº Expediente</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200">Descripción del Objeto</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200">Último Estado</th>
                                    <th className="px-4 py-2 text-left font-bold text-gray-700 border-r border-gray-200">Responsable</th>
                                    <Can permission='manejar_contratos'>
                                        <th className="px-4 py-2 text-center font-bold text-gray-700 w-48 text-[10px]">Gestión de Recuperación</th>
                                    </Can>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {desactivados.map((con) => (
                                    <tr key={con.id} className="hover:bg-gray-50 transition-colors opacity-80 hover:opacity-100">
                                        <td className="px-4 py-2 font-mono font-bold text-gray-600 border-r border-gray-200 bg-gray-50/30">
                                            {con.n_expediente}
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 normal-case text-gray-600 italic leading-snug">
                                            {con.descripcion}
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200">
                                            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-sm text-[9px] font-bold border border-gray-300">
                                                {con.estado_expediente}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-200 font-semibold text-gray-700">
                                            {con.responsable}
                                        </td>
                                        <Can permission='manejar_contratos'>
                                            <td className="px-4 py-2 text-center bg-gray-50/50">
                                                <Link
                                                    href={`/contratos/recuperar/${con.id}`}
                                                    method="put"
                                                    as="button"
                                                    className="w-full bg-green-600 hover:bg-green-700 text-white text-[9px] font-bold py-1.5 px-2 rounded-sm shadow-sm transition-all uppercase flex items-center justify-center gap-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    Restaurar Expediente
                                                </Link>
                                            </td>
                                        </Can>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 px-1 uppercase font-bold tracking-widest">
                    <span>Expedientes en archivo: {desactivados?.length}</span>
                    <span className="flex items-center gap-1 italic">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Los contratos restaurados volverán al panel principal de gestión
                    </span>
                </div>
            </div>
        </AppLayout>
    );
}
