import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Button } from '@headlessui/react';
import Can from '@/components/can';

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
    unidad_promotora: string;
    duracion_estimada: string;
    estado_expediente: string;

};

type Props = {
    contrato: Contrato;
};

export default function Show({ contrato }: Props) {
    const { auth } = usePage().props as any;




    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    const descargarPDF = (tipo: 'basico' | 'completo') => {
        const url = `/contratos/${contrato.id}/pdf?tipo=${tipo}`;
        window.open(url, '_blank');
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },

        { title: `Expediente ${contrato.n_expediente}`, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Contrato ${contrato.id_contrato}`} />


            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase">
                Vista de Expediente: {contrato.n_expediente}
            </div>

            <div className="flex flex-col gap-4 p-4 text-[11px]">

            <Can permission="manejar_contratos">
                <div className="flex flex-wrap gap-2 items-center bg-gray-50 p-3 border border-gray-300 rounded shadow-sm">
                    <button
                        onClick={() => descargarPDF('basico')}
                        className="bg-gray-500 text-white px-3 py-1.5 rounded-sm hover:bg-gray-600 font-bold uppercase shadow-sm flex items-center gap-2"
                    >
                        PDF Básico
                    </button>
                    <button
                        onClick={() => descargarPDF('completo')}
                        className="bg-indigo-600 text-white px-3 py-1.5 rounded-sm hover:bg-indigo-700 font-bold uppercase shadow-sm flex items-center gap-2"
                    >
                        PDF Completo
                    </button>

                    <div className="h-6 w-px bg-gray-300 mx-2" />

                    <Link
                        href={`/contratos/${contrato.id}/movimientos`}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-sm hover:bg-blue-700 font-bold uppercase shadow-sm"
                    >
                        Registro de actividad
                    </Link>
                </div>
            </Can>

                <div className="overflow-hidden border border-gray-300 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th colSpan={2} className="px-4 py-2 font-bold text-blue-900 uppercase bg-gray-100">
                                    Información Técnica del Contrato
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 uppercase">
                            <tr className='hover:bg-blue-50/50 transition-colors'>
                                <td className="w-1/3 px-4 py-2 font-bold text-gray-700 border-r border-gray-200 bg-gray-50/50">Tipo de Contrato</td>
                                <td className="px-4 py-2 text-blue-700 font-semibold">{contrato.tipo.tipo_contrato}</td>
                            </tr>
                            <tr className='hover:bg-blue-50/50 transition-colors'>
                                <td className="px-4 py-2 font-bold text-gray-700 border-r border-gray-200 bg-gray-50/50">Estado del expediente</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-0.5 rounded-sm font-bold border ${
                                        contrato.estado_expediente === 'Activo'
                                        ? 'bg-green-50 border-green-200 text-green-700'
                                        : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                    }`}>
                                        {contrato.estado_expediente}
                                    </span>
                                </td>
                            </tr>
                            <tr className='hover:bg-blue-50/50 transition-colors'>
                                <td className="px-4 py-2 font-bold text-gray-700 border-r border-gray-200 bg-gray-50/50">Responsable</td>
                                <td className="px-4 py-2">{contrato.responsable}</td>
                            </tr>
                            <tr className='hover:bg-blue-50/50 transition-colors'>
                                <td className="px-4 py-2 font-bold text-gray-700 border-r border-gray-200 bg-gray-50/50">Importe estimado</td>
                                <td className="px-4 py-2 font-bold">{contrato.importe_estimado != null ? `${contrato.importe_estimado} €` : '---'}</td>
                            </tr>


                            <tr
                                className='cursor-pointer bg-blue-100/30 hover:bg-blue-100/50 transition-colors border-t border-gray-300'
                                onClick={() => setMostrarDetalles(!mostrarDetalles)}
                            >
                                <td colSpan={2} className="px-4 py-2 font-bold text-blue-800 text-center tracking-wider">
                                    {mostrarDetalles ? '▲ OCULTAR DETALLES ADICIONALES' : '▼ MOSTRAR MÁS DETALLES'}
                                </td>
                            </tr>

                            {mostrarDetalles && (
                                <>
                                    <tr className='animate-in fade-in slide-in-from-top-1 duration-200'>
                                        <td className="px-4 py-2 font-bold text-gray-600 border-r border-gray-200 bg-gray-50/30 pl-8 italic text-[10px]">Creado por</td>
                                        <td className="px-4 py-2 text-gray-600">{contrato.usuario?.nombre || 'N/A'}</td>
                                    </tr>
                                    <tr className='animate-in fade-in slide-in-from-top-1 duration-200'>
                                        <td className="px-4 py-2 font-bold text-gray-600 border-r border-gray-200 bg-gray-50/30 pl-8 italic text-[10px]">Unidad promotora</td>
                                        <td className="px-4 py-2 text-gray-600">{contrato.unidad_promotora}</td>
                                    </tr>
                                    <tr className='animate-in fade-in slide-in-from-top-1 duration-200'>
                                        <td className="px-4 py-2 font-bold text-gray-600 border-r border-gray-200 bg-gray-50/30 pl-8 italic text-[10px]">Fecha prevista</td>
                                        <td className="px-4 py-2 text-gray-600">{contrato.fecha_prevista_f}</td>
                                    </tr>
                                    <tr className='animate-in fade-in slide-in-from-top-1 duration-200'>
                                        <td className="px-4 py-2 font-bold text-gray-600 border-r border-gray-200 bg-gray-50/30 pl-8 italic text-[10px]">Importe final</td>
                                        <td className="px-4 py-2 text-gray-600">{contrato.importe_final != null ? `${contrato.importe_final} €` : '---'}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-2">
                    <Button
                        onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = '/contratos'}
                        className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-sm hover:bg-gray-300 font-bold uppercase border border-gray-300 text-[10px]"
                    >
                        ← Volver al listado
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
