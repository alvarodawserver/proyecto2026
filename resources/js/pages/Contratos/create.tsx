import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { SubmitEvent } from 'react';
import { route } from 'ziggy-js';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        n_expediente: '',
        descripcion: '',
        responsable:'',
        tipo_contrato:'',
        importe_estimado:'',
        proc_adjudicacion:'',
        fecha_prevista:'',
        fecha_inicio:'',
        unidad_promotora:'',
        duracion_estimada:'',
    });


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Crear Contrato',
            href: '/contratos/create',
        },
    ];

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/contratos/store');
    }

    return (
        <>
        <AppLayout breadcrumbs={breadcrumbs}>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:bg-gray-900">
                <h2 className="mb-6 text-lg font-bold">Datos del Contrato</h2>


                <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="n_expediente" className="text-sm font-medium">Número de expediente</label>
                        <input
                            id="n_expediente"
                            type="text"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.n_expediente}
                            onChange={e => setData('n_expediente', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="descripcion" className="text-sm font-medium">Descripción</label>
                        <input
                            id="descripcion"
                            type="text"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="tipo_contrato" className="text-sm font-medium">Tipo de contrato</label>
                        <input
                            id="tipo_contrato"
                            type="text"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.tipo_contrato}
                            onChange={e => setData('tipo_contrato', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="importe_estimado" className="text-sm font-medium">Importe estimado</label>
                        <input
                            id="importe_estimado"
                            type="number"
                            step={'0.01'}
                            placeholder='0.00'
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.importe_estimado}
                            onChange={e => setData('importe_estimado', e.target.value)}
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <label htmlFor="proc_adjudicacion" className="text-sm font-medium">Proceso de adjudicación</label>
                        <input
                            id="proc_adjudicacion"
                            type="text"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.proc_adjudicacion}
                            onChange={e => setData('proc_adjudicacion', e.target.value)}
                        />
                    </div>

                    {/*<div className="flex flex-col gap-2">
                        <label htmlFor="responsable" className="text-sm font-medium">Responsable del contrato</label>
                        <input
                            id="responsable"
                            type="text"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.responsable}
                            onChange={e => setData('responsable', e.target.value)}
                        />
                    </div> */}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="fecha_prevista" className="text-sm font-medium">Fecha prevista</label>
                        <input
                            id="fecha_prevista"
                            type="date"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.fecha_prevista}
                            onChange={e => setData('fecha_prevista', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="fecha_inicio" className="text-sm font-medium">Fecha de inicio</label>
                        <input
                            id="fecha_inicio"
                            type="date"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.fecha_inicio}
                            onChange={e => setData('fecha_inicio', e.target.value)}
                        />
                    </div>


                    {/*<div className="flex flex-col gap-2">
                        <label htmlFor="unidad_promotora" className="text-sm font-medium">Unidad promotora</label>
                        <input
                            id="unidad_promotora"
                            type="text"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.unidad_promotora}
                            onChange={e => setData('unidad_promotora', e.target.value)}
                        />
                    </div> */}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="duracion_estimada" className="text-sm font-medium">Duración estimada</label>
                        <input
                            id="duracion_estimada"
                            type="date"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.duracion_estimada}
                            onChange={e => setData('duracion_estimada', e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                            Finalizar Registro
                        </button>
                    </div>
                    {Object.keys(errors).length > 0 && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                            Hay errores en el formulario. Revisa los campos.
                        </div>
                    )}

                </form>
            </div>
        </div>
        </AppLayout>
        </>
    );
}
