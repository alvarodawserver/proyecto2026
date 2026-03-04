import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { SubmitEvent } from 'react';
import { route } from 'ziggy-js';

export default function Create() {
    const { data, setData, post } = useForm({
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
        estado_expediente:'',
    });


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Crear Contrato',
            href: '/contratos/create',
        },
    ];

    function submit(e: React.FormEvent) {
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

                    {/* Tipo de Contrato (Email en tu código) */}
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
                            type="text"
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

                    <div className="flex flex-col gap-2">
                        <label htmlFor="responsable" className="text-sm font-medium">Responsable del contrato</label>
                        <input
                            id="responsable"
                            type="text"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.responsable}
                            onChange={e => setData('responsable', e.target.value)}
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

                </form>
            </div>
        </div>
        </AppLayout>
        </>
    );
}
