import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

// ELIMINADO: import { edit as editRoute } from '@/routes'; <--- Esto sobraba y fallaba

interface Contrato {
    id: number;
    descripcion: string;
    responsable: string;
    tipo_contrato: string;
    importe_estimado: number | string;
    proc_adjudicacion: string;
    fecha_prevista: string;
    fecha_inicio: string;
    unidad_promotora: string;
    duracion_estimada: string;
}

interface Props {
    contrato: Contrato;
}

export default function Edit({ contrato }: Props) {
    const { data, setData, put, errors } = useForm({
        descripcion: contrato.descripcion || '',
        responsable: contrato.responsable || '',
        tipo_contrato: contrato.tipo_contrato || '',
        importe_estimado: contrato.importe_estimado || '',
        proc_adjudicacion: contrato.proc_adjudicacion || '',
        fecha_prevista: contrato.fecha_prevista || '',
        fecha_inicio: contrato.fecha_inicio || '',
        unidad_promotora: contrato.unidad_promotora || '',
        duracion_estimada: contrato.duracion_estimada || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Contratos',
            href: '/contratos',
        },
        {
            title: 'Editar Contrato',
            href: `/contratos/edit/${contrato.id}`,
        },
    ];

    function submit(e: React.FormEvent) {
        e.preventDefault();

        // CAMBIO CRÍTICO: Añadimos la "/" inicial para que sea una ruta absoluta
        // y usamos el ID directamente desde la prop 'contrato'
        if (contrato && contrato.id) {
            put(`/contratos/update/${contrato.id}`);
        } else {
            console.error("No se pudo encontrar el ID del contrato");
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:bg-gray-900">
                    <h2 className="mb-6 text-lg font-bold">Datos del Contrato</h2>

                    <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Descripción */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="descripcion" className="text-sm font-medium">Descripción</label>
                            <input
                                id="descripcion"
                                type="text"
                                className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                                value={data.descripcion}
                                onChange={e => setData('descripcion', e.target.value)}
                            />
                            {errors.descripcion && <div className="text-red-500 text-xs">{errors.descripcion}</div>}
                        </div>

                        {/* Tipo de contrato */}
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

                        {/* Importe estimado */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="importe_estimado" className="text-sm font-medium">Importe estimado</label>
                            <input
                                id="importe_estimado"
                                type="number"
                                step="0.01"
                                className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                                value={data.importe_estimado}
                                onChange={e => setData('importe_estimado', e.target.value)}
                            />
                        </div>

                        {/* Proceso adjudicación */}
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

                        {/* Responsable */}
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

                        {/* Fecha prevista */}
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

                        {/* Fecha inicio */}
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

                        {/* Unidad promotora */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="unidad_promotora" className="text-sm font-medium">Unidad promotora</label>
                            <input
                                id="unidad_promotora"
                                type="text"
                                className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                                value={data.unidad_promotora}
                                onChange={e => setData('unidad_promotora', e.target.value)}
                            />
                        </div>

                        {/* Duración estimada */}
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
                                className="w-full md:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
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
    );
}
