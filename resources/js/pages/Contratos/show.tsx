import {Head, Link} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';


type Contrato = {
    id: number;
    n_expediente: string;
    descripcion: string;
    responsable: string;
    id_contrato:string;
    usuario?:{
        id:number,
        nombre:string,
    }
    tipo:{
        tipo_contrato:string
    }
    importe_estimado: number;
    importe_final:number;
    tipo_procedimiento:{
        tipo_procedimiento:string,
    };
    fecha_prevista_f: string;
    fecha_inicio_f: string;
    alerta_vencimiento_f: string;
    unidad_promotora_nombre: string;
    duracion_estimada: string;
    estado_expediente: string;

};

type Props = {
    contrato: Contrato;
};


export default function Show({ contrato }: Props) {
    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },
        { title: `Expediente ${contrato.n_expediente}`, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Contrato ${contrato.id_contrato}`} />
            <div className="flex flex-col gap-3 p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Nº de expediente: {contrato.n_expediente}
                </h1>

                <div className="mb-4">
                    <Link
                        href={`/contratos/${contrato.id}/movimientos`}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 inline-block"
                    >
                        Registro de actividad
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border border-sidebar-border/50">
                    <table className="w-full min-w-150 table-fixed divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th colSpan={2} className="px-4 py-2 text-left font-bold">Datos del contrato</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            {/* Filas principales: siempre visibles */}
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                                <td className="w-1/3 px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Tipo de Contrato</td>
                                <td className="px-4 py-2">{contrato.tipo.tipo_contrato}</td>
                            </tr>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                                <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Estado del expediente</td>
                                <td className="px-4 py-2">{contrato.estado_expediente}</td>
                            </tr>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                                <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Responsable</td>
                                <td className="px-4 py-2">{contrato.responsable}</td>
                            </tr>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                                <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Importe estimado</td>
                                <td className="px-4 py-2">{contrato.importe_estimado} €</td>
                            </tr>

                            <tr
                                className='cursor-pointer bg-blue-50/30 hover:bg-blue-50 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-colors'
                                onClick={() => setMostrarDetalles(!mostrarDetalles)}
                            >
                                <td colSpan={2} className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">
                                    {mostrarDetalles ? '▼ Ocultar detalles adicionales' : 'Mostrar más detalles'}
                                </td>
                            </tr>

                            {mostrarDetalles && (
                                <>
                                    <tr className='bg-gray-50/30 dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-700 animate-in fade-in duration-300'>
                                        <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-400 pl-8 italic">Creado por</td>
                                        <td className="px-4 py-2">{contrato.usuario?.nombre || 'N/A'}</td>
                                    </tr>
                                    <tr className='bg-gray-50/30 dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-700 animate-in fade-in duration-300'>
                                        <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-400 pl-8 italic">Unidad promotora</td>
                                        <td className="px-4 py-2">{contrato.unidad_promotora_nombre}</td>
                                    </tr>
                                    <tr className='bg-gray-50/30 dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-700 animate-in fade-in duration-300'>
                                        <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-400 pl-8 italic">Fecha prevista</td>
                                        <td className="px-4 py-2">{contrato.fecha_prevista_f}</td>
                                    </tr>
                                    <tr className='bg-gray-50/30 dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-700 animate-in fade-in duration-300'>
                                        <td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-400 pl-8 italic">Importe final</td>
                                        <td className="px-4 py-2">{contrato.importe_final} €</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex gap-4 mt-4">
                    <Link
                        href={'/contratos'}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
