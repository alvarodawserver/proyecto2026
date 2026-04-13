import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

interface ContratoForm {
    descripcion: string;
    responsable: string;
    tipos_id: number | string;
    importe_final: number | string;
    tipo_procedimiento: string;
    fecha_inicio: string;
    duracion_estimada: string;
    n_resolucion:string;
    fecha_fin: string
}

interface Contrato extends ContratoForm {
    id: number;
    n_expediente: string; 
}


interface Props {
    contrato: Contrato;
}

export default function Edit({ contrato }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        descripcion: contrato.descripcion || '',
        responsable: contrato.responsable || '',
        tipos_id: contrato.tipos_id || '',
        importe_final: contrato.importe_final || '',
        tipo_procedimiento: contrato.tipo_procedimiento || '',
        fecha_inicio: contrato.fecha_inicio || '',
        duracion_estimada: contrato.duracion_estimada || '',
        n_resolucion: contrato.n_resolucion || '',
        fecha_fin: contrato.fecha_fin || '',

    });


    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },
        { title: `Expediente ${contrato.n_expediente}`, href: `/contratos/${contrato.id}` },
        { title: 'Editar Datos', href: '#' },
    ];

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/contratos/update/${contrato.id}`);
    }

    const inputClass = (field: keyof typeof data) => `
        w-full border p-2 text-[11px] uppercase focus:outline-none focus:ring-1 focus:ring-[#e96b7d] dark:bg-gray-800
        ${errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#e96b7d] dark:border-gray-700'}
    `;

    const labelClass = "text-[10px] font-bold text-gray-700 uppercase mb-1 flex items-center gap-1";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Formalizar ${contrato.n_expediente}`} />

            {/* Banner Institucional con ID de registro */}
            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase flex justify-between items-center">
                <span>Completar Expediente: {contrato.n_expediente}</span>
                <span className="text-[10px] bg-black/20 px-2 py-1 rounded">ID: {contrato.id}</span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-4 text-[11px]">

                <div className="mb-2">
                    <Link
                        href={`/contratos/control-mando`}
                        className="text-gray-500 hover:text-[#e96b7d] font-bold uppercase text-[10px] flex items-center gap-1 transition-colors"
                    >
                        ← Cancelar y volver
                    </Link>
                </div>

                <div className="border border-gray-300 bg-white p-6 shadow-sm">
                    <form onSubmit={submit} className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

                        {/* Descripción ocupa las dos columnas */}
                        <div className="md:col-span-2 flex flex-col">
                            <label htmlFor="descripcion" className={labelClass}>Descripción del objeto del contrato</label>
                            <textarea
                                id="descripcion"
                                rows={3}
                                className={inputClass('descripcion') + ' normal-case'}
                                value={data.descripcion}
                                onChange={e => setData('descripcion', e.target.value)}
                            />
                            {errors.descripcion && <span className="text-[10px] text-red-600 font-bold mt-1">{errors.descripcion}</span>}
                        </div>





                        <div className="flex flex-col">
                            <label htmlFor="responsable" className={labelClass}>Responsable del contrato</label>
                            <input
                                id="responsable"
                                type="text"
                                className={inputClass('responsable')}
                                value={data.responsable}
                                onChange={e => setData('responsable', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="n_resolucion" className={labelClass}>Nº de resolución</label>
                            <input
                                id="n_resolucion"
                                type="text"
                                className={inputClass('n_resolucion')}
                                value={data.n_resolucion}
                                onChange={e => setData('n_resolucion', e.target.value)}
                            />
                        </div>


                        <div className="flex flex-col">
                            <label htmlFor="importe_final" className={labelClass}>Importe de adjudicación</label>
                            <div className="relative">
                                <input
                                    id="importe_final"
                                    type="number"
                                    step="0.01"
                                    className={inputClass('importe_final')}
                                    value={data.importe_final}
                                    onChange={e => setData('importe_final', e.target.value)}
                                />
                                <span className="absolute right-3 top-2 text-gray-400 font-bold">€</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="fecha_inicio" className={labelClass}>Fecha de inicio efectiva</label>
                            <input
                                id="fecha_inicio"
                                type="date"
                                className={inputClass('fecha_inicio')}
                                value={data.fecha_inicio}
                                onChange={e => setData('fecha_inicio', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="fecha_fin" className={labelClass}>Fecha final</label>
                            <input
                                id="fecha_fin"
                                type="date"
                                className={inputClass('fecha_fin')}
                                value={data.fecha_fin}
                                onChange={e => setData('fecha_fin', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="duracion_estimada" className={labelClass}>Vigencia / Duración</label>
                            <select
                                name="duracion_estimada"
                                id="duracion_estimada"
                                className={inputClass('duracion_estimada')}
                                value={data.duracion_estimada}
                                onChange={e => setData('duracion_estimada', e.target.value)}
                            >
                                <option value="">-- SELECCIONAR --</option>
                                <option value="1 años">1 AÑO</option>
                                <option value="2 años">2 AÑOS</option>
                                <option value="3 años">3 AÑOS</option>
                                <option value="4 años">4 AÑOS</option>
                            </select>
                        </div>

                        {/* Botones de acción */}
                        <div className="md:col-span-2 border-t border-gray-100 pt-6 flex gap-3 justify-end">
                            <Link
                                href={`/contratos/control-mando`}
                                className="bg-gray-100 text-gray-600 px-6 py-2 rounded-sm font-bold uppercase hover:bg-gray-200 border border-gray-300 transition-colors"
                            >
                                Descartar Cambios
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#e96b7d] text-white px-10 py-2 rounded-sm font-bold uppercase hover:bg-[#d65a6c] shadow-md transition-all disabled:opacity-50"
                            >
                                {processing ? 'Actualizando...' : 'Actualizar Expediente'}
                            </button>
                        </div>

                        {/* Alerta de errores */}
                        {Object.keys(errors).length > 0 && (
                            <div className="md:col-span-2 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                                <span className="font-bold text-[10px] uppercase">⚠️ Errores en la edición:</span>
                                <span className="text-[10px]">Por favor, revise los campos resaltados en rojo.</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
