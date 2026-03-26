import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Procedimiento {
    id: number,
    tipo_procedimiento: string
}

interface Tipo {
    id: number,
    tipo_contrato: string
}



interface Props {
    procedimientos: Procedimiento[],
    tipos: Tipo[],
}


export default function Create({ procedimientos, tipos}: Props) {
    const [step, setStep] = useState(1);
    const { data, setData, post, errors, processing } = useForm({
        n_expediente: '',
        descripcion: '',
        responsable: '',
        tipos_id: '',
        importe_estimado: '',
        importe_final: '',
        tipo_procedimiento: '',
        fecha_prevista: '',
        fecha_inicio: '',
        duracion_estimada: '',
        n_resolucion: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Contratos', href: '/contratos' },
        { title: 'Nuevo Expediente', href: '/contratos/create' },
    ];

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/contratos/store');
    }

    // Estilo de inputs alineado con el Control de Mando
    const inputClass = (field: keyof typeof data) => `
        w-full border p-2 text-[11px] uppercase focus:outline-none focus:ring-1 focus:ring-[#e96b7d] dark:bg-gray-800
        ${errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#e96b7d] dark:border-gray-700'}
    `;

    const labelClass = "text-[10px] font-bold text-gray-700 uppercase mb-1 flex items-center gap-1";

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Contrato" />


            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm uppercase">
                Registro de Nuevo Expediente
            </div>

            <div className="flex flex-1 flex-col gap-4 p-4 text-[11px]">

                {/* Tabs de navegación estilo técnico */}
                <div className="flex border border-gray-300 bg-gray-50 overflow-hidden rounded-sm shadow-sm">
                    <button
                        className={`flex-1 py-2 px-4 text-center transition-colors uppercase font-bold border-r border-gray-300 ${step === 1 ? 'bg-white text-[#e96b7d] border-b-2 border-b-[#e96b7d]' : 'text-gray-500 hover:bg-gray-100'}`}
                        onClick={() => setStep(1)}
                    >
                        1. Detalles Técnicos
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 text-center transition-colors uppercase font-bold ${step === 2 ? 'bg-white text-[#e96b7d] border-b-2 border-b-[#e96b7d]' : 'text-gray-500 hover:bg-gray-100'}`}
                        onClick={() => setStep(2)}
                    >
                        2. Formalización y Resolución
                    </button>
                </div>

                <div className="border border-gray-300 bg-white p-6 shadow-sm">
                    <form onSubmit={submit} className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

                        {step === 1 && (
                            <>
                                <div className="flex flex-col">
                                    <label htmlFor="n_expediente" className={labelClass}>Número de expediente <span className="text-red-500">*</span></label>
                                    <input
                                        id="n_expediente"
                                        type="text"
                                        className={inputClass('n_expediente')}
                                        value={data.n_expediente}
                                        placeholder="EJ: EXP-2024-001"
                                        onChange={e => setData('n_expediente', e.target.value)}
                                    />
                                    {errors.n_expediente && <span className="text-[10px] text-red-600 font-bold mt-1">{errors.n_expediente}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="tipos_id" className={labelClass}>Tipo de contrato</label>
                                    <select
                                        name="tipos_id"
                                        id="tipos_id"
                                        className={inputClass('tipos_id')}
                                        value={data.tipos_id}
                                        onChange={e => setData('tipos_id', e.target.value)}
                                    >
                                        <option value="">-- SELECCIONAR TIPO --</option>
                                        {tipos.map((tip) => (
                                            <option key={tip.id} value={tip.id}>{tip.tipo_contrato}</option>
                                        ))}
                                    </select>
                                    {errors.tipos_id && <span className="text-[10px] text-red-600 font-bold mt-1">{errors.tipos_id}</span>}
                                </div>

                                <div className="md:col-span-2 flex flex-col">
                                    <label htmlFor="descripcion" className={labelClass}>Descripción del objeto del contrato</label>
                                    <textarea
                                        id="descripcion"
                                        rows={2}
                                        className={inputClass('descripcion') + ' normal-case'}
                                        value={data.descripcion}
                                        onChange={e => setData('descripcion', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="importe_estimado" className={labelClass}>Presupuesto base (Importe estimado)</label>
                                    <div className="relative">
                                        <input
                                            id="importe_estimado"
                                            type="number"
                                            step="0.01"
                                            className={inputClass('importe_estimado')}
                                            value={data.importe_estimado}
                                            onChange={e => setData('importe_estimado', e.target.value)}
                                        />
                                        <span className="absolute right-3 top-2 text-gray-400 font-bold">€</span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="tipo_procedimiento" className={labelClass}>Procedimiento de adjudicación</label>
                                    <select
                                        name="tipo_procedimiento"
                                        id="tipo_procedimiento"
                                        className={inputClass('tipo_procedimiento')}
                                        value={data.tipo_procedimiento}
                                        onChange={e => setData('tipo_procedimiento', e.target.value)}
                                    >
                                        <option value="">-- SELECCIONAR PROCESO --</option>
                                        {procedimientos.map((proc) => (
                                            <option key={proc.id} value={proc.id}>{proc.tipo_procedimiento}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="flex flex-col">
                                    <label htmlFor="fecha_prevista" className={labelClass}>Fecha prevista de inicio</label>
                                    <input
                                        id="fecha_prevista"
                                        type="date"
                                        className={inputClass('fecha_prevista')}
                                        value={data.fecha_prevista}
                                        onChange={e => setData('fecha_prevista', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="duracion_estimada" className={labelClass}>Duración del contrato</label>
                                    <select
                                        name="duracion_estimada"
                                        id="duracion_estimada"
                                        className={inputClass('duracion_estimada')}
                                        value={data.duracion_estimada}
                                        onChange={e => setData('duracion_estimada', e.target.value)}
                                    >
                                        <option value="">-- SELECCIONAR PLAZO --</option>
                                        <option value="1 años">1 AÑO</option>
                                        <option value="2 años">2 AÑOS</option>
                                        <option value="3 años">3 AÑOS</option>
                                        <option value="4 años">4 AÑOS</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2 border-t border-gray-100 pt-4 flex justify-end">
                                    <Button
                                        onClick={() => setStep(2)}
                                        className="bg-[#e96b7d] text-white px-8 py-2 rounded-sm font-bold uppercase hover:bg-[#d65a6c] shadow-md"
                                    >
                                        Siguiente paso →
                                    </Button>
                                    <Button
                                        onClick={() => window.location.href = '/contratos/control-mando'}
                                        className="ml-3 bg-gray-200 text-gray-700 px-6 py-2 rounded-sm font-bold uppercase hover:bg-gray-300 border border-gray-300"
                                    >
                                        Volver
                                    </Button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="flex flex-col">
                                    <label htmlFor="fecha_inicio" className={labelClass}>Fecha de inicio</label>
                                    <input
                                        id="fecha_inicio"
                                        type="date"
                                        className={inputClass('fecha_inicio')}
                                        value={data.fecha_inicio}
                                        onChange={e => setData('fecha_inicio', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="importe_final" className={labelClass}>Importe de adjudicación (Final)</label>
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
                                    <label htmlFor="responsable" className={labelClass}>Empresa adjudicataria</label>
                                    <input
                                        id="responsable"
                                        type="text"
                                        className={inputClass('responsable')}
                                        value={data.responsable}
                                        onChange={e => setData('responsable', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="n_resolucion" className={labelClass}>Nº de resolución / decreto</label>
                                    <input
                                        id="n_resolucion"
                                        type="text"
                                        className={inputClass('n_resolucion')}
                                        value={data.n_resolucion}
                                        onChange={e => setData('n_resolucion', e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2 border-t border-gray-100 pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-sm font-bold uppercase hover:bg-gray-300 border border-gray-300"
                                    >
                                        ← Volver
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-green-600 text-white px-6 py-2 rounded-sm font-bold uppercase hover:bg-green-700 shadow-md disabled:opacity-50"
                                    >
                                        {processing ? 'Procesando registro...' : 'Guardar Expediente'}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Panel de errores */}
                        {Object.keys(errors).length > 0 && (
                            <div className="md:col-span-2 mt-4 p-3 bg-red-50 border border-red-200 text-red-700">
                                <p className="font-bold text-[10px] mb-1 uppercase">Se han detectado errores de validación:</p>
                                <ul className="list-disc list-inside text-[10px] grid grid-cols-2">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key} className="capitalize">{message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
