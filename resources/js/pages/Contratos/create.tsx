import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import {useState} from 'react';

interface Procedimiento{
    id:number,
    tipo_procedimiento:string
}

interface Tipo{
    id:number,
    tipo_contrato:string
}

interface Props{
    procedimientos:Procedimiento[],
    tipos:Tipo[]
}

export default function Create({procedimientos,tipos} : Props) {
    const [step, setStep] = useState(1);
    const { data, setData, post, errors, processing } = useForm({
        n_expediente: '',
        descripcion: '',
        responsable:'',
        tipos_id:'',
        importe_estimado:'',
        importe_final:'',
        tipo_procedimiento:'',
        fecha_prevista:'',
        fecha_inicio:'',
        duracion_estimada:'',
        n_resolucion:'',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Crear Contrato',
            href: '/contratos/create',
        },
    ];

    const nextStep = () => setStep(2);
    const prevStep = () => setStep(1);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/contratos/store');
    }

    const inputClass = (field: keyof typeof data) => `
        rounded-md border p-2 text-sm focus:ring-indigo-500 dark:bg-gray-800
        ${errors[field] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500 dark:border-gray-700'}
    `;

    return (
        <>
        <AppLayout breadcrumbs={breadcrumbs}>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex border-b mb-6">
                <button
                    className={`py-2 px-4 ${step === 1 ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
                    onClick={() => setStep(1)}
                >
                    1. Detalles del contrato
                </button>
                <button
                    className={`py-2 px-4 ${step === 2 ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
                    onClick={() => setStep(2)}
                >
                    2. Datos de la formalización
                </button>
            </div>

            <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:bg-gray-900">
                <h2 className="mb-6 text-lg font-bold">Datos del Contrato</h2>

                <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {step === 1 && (
                    <>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="n_expediente" className="text-sm font-medium">Número de expediente</label>
                            <input
                                id="n_expediente"
                                type="text"
                                className={inputClass('n_expediente')}
                                value={data.n_expediente}
                                onChange={e => setData('n_expediente', e.target.value)}
                            />
                            {errors.n_expediente && <span className="text-xs text-red-500">{errors.n_expediente}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="descripcion" className="text-sm font-medium">Descripción</label>
                            <input
                                id="descripcion"
                                type="text"
                                className={inputClass('descripcion')}
                                value={data.descripcion}
                                onChange={e => setData('descripcion', e.target.value)}
                            />
                            {errors.descripcion && <span className="text-xs text-red-500">{errors.descripcion}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="n_resolucion" className="text-sm font-medium">NºResolución</label>
                            <input
                                id="n_resolucion"
                                type="text"
                                className={inputClass('n_resolucion')}
                                value={data.n_resolucion}
                                onChange={e => setData('n_resolucion', e.target.value)}
                            />
                            {errors.n_resolucion && <span className="text-xs text-red-500">{errors.n_resolucion}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="tipos_id" className="text-sm font-medium">Tipo de contrato</label>
                            <select name="tipos_id" id="tipos_id"
                            className={inputClass('tipos_id')}
                            value={data.tipos_id}
                            onChange={e => setData('tipos_id',e.target.value)}>
                                    <option value="">Selecciona un tipo de contrato...</option>
                                    {tipos.map((tip) => (
                                        <option key={tip.id} value={tip.id}>
                                            {tip.tipo_contrato}
                                        </option>
                                    ))}
                            </select>
                            {errors.tipos_id && <span className="text-xs text-red-500">{errors.tipos_id}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="importe_estimado" className="text-sm font-medium">Importe estimado</label>
                            <input
                                id="importe_estimado"
                                type="number"
                                step={'0.01'}
                                placeholder='0.00'
                                className={inputClass('importe_estimado')}
                                value={data.importe_estimado}
                                onChange={e => setData('importe_estimado', e.target.value)}
                            />
                            {errors.importe_estimado && <span className="text-xs text-red-500">{errors.importe_estimado}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="tipo_procedimiento" className="text-sm font-medium">Proceso de adjudicación</label>
                            <select name="tipo_procedimiento" id="tipo_procedimiento"
                            className={inputClass('tipo_procedimiento')}
                            value={data.tipo_procedimiento}
                            onChange={e => setData('tipo_procedimiento',e.target.value)}>
                                <option value="">Seleccione un proceso...</option>
                                {procedimientos.map((proc)=>(
                                    <option key={proc.id} value={proc.id}>
                                        {proc.tipo_procedimiento}
                                    </option>
                                ))}
                            </select>
                            {errors.tipo_procedimiento && <span className="text-xs text-red-500">{errors.tipo_procedimiento}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="fecha_prevista" className="text-sm font-medium">Fecha prevista de inicio</label>
                            <input
                                id="fecha_prevista"
                                type="date"
                                className={inputClass('fecha_prevista')}
                                value={data.fecha_prevista}
                                onChange={e => setData('fecha_prevista', e.target.value)}
                            />
                            {errors.fecha_prevista && <span className="text-xs text-red-500">{errors.fecha_prevista}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="duracion_estimada" className="text-sm font-medium">Duración estimada</label>
                            <select name="duracion_estimada" id="duracion_estimada"
                            className={inputClass('duracion_estimada')}
                            value={data.duracion_estimada}
                            onChange={e => setData('duracion_estimada',e.target.value)}>
                                <option value="">Seleccione cuanto años va a durar</option>
                                    <option key="1" value="1 años">1 año</option>
                                    <option key="2" value="2 años">2 años</option>
                                    <option key="3" value="3 años">3 años</option>
                                    <option key="4" value="4 años">4 años</option>
                            </select>
                            {errors.duracion_estimada && <span className="text-xs text-red-500">{errors.duracion_estimada}</span>}
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <button
                                type='button'
                                onClick={() => setStep(2)}
                                className="w-full md:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fecha_inicio" className="text-sm font-medium">Fecha de inicio</label>
                            <input
                                id="fecha_inicio"
                                type="date"
                                className={inputClass('fecha_inicio')}
                                value={data.fecha_inicio}
                                onChange={e => setData('fecha_inicio', e.target.value)}
                            />
                            {errors.fecha_inicio && <span className="text-xs text-red-500">{errors.fecha_inicio}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="importe_final" className="text-sm font-medium">Importe de adjudicación</label>
                            <input
                                id="importe_final"
                                type="number"
                                step={'0.01'}
                                placeholder='0.00'
                                className={inputClass('importe_final')}
                                value={data.importe_final}
                                onChange={e => setData('importe_final', e.target.value)}
                            />
                            {errors.importe_final && <span className="text-xs text-red-500">{errors.importe_final}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="responsable" className="text-sm font-medium">Adjudicatario</label>
                            <input
                                id="responsable"
                                type="text"
                                className={inputClass('responsable')}
                                value={data.responsable}
                                onChange={e => setData('responsable', e.target.value)}
                            />
                            {errors.responsable && <span className="text-xs text-red-500">{errors.responsable}</span>}
                        </div>

                        <div className="md:col-span-2 mt-4 flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full md:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:opacity-50"
                            >
                                {processing ? 'Enviando...' : 'Finalizar'}
                            </button>

                            <button
                                type="button"
                                onClick={()=>setStep(1)}
                                className="w-full md:w-auto rounded-md bg-gray-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus:outline-none"
                            >
                                Volver
                            </button>
                        </div>
                    </>
                )}

                {Object.keys(errors).length > 0 && (
                    <div className="md:col-span-2 mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
                        <p className="font-bold text-sm mb-2">Errores detectados:</p>
                        <ul className="list-disc list-inside text-xs space-y-1">
                            {Object.entries(errors).map(([key, message]) => (
                                <li key={key}>{message}</li>
                            ))}
                        </ul>
                    </div>
                )}
                </form>
            </div>
        </div>
        </AppLayout>
        </>
    );
}
