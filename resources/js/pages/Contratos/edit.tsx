import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

interface ContratoForm {
    descripcion: string;
    responsable: string;
    tipos_id: number | string;
    importe_final: number | string;
    tipo_procedimiento: string;
    fecha_inicio: string;
    duracion_estimada: string;
}

// Actualizamos la interfaz Contrato para que incluya los campos que faltaban
interface Contrato extends ContratoForm {
    id: number;
}

interface Procedimiento {
    id: number;
    tipo_procedimiento: string;
}

interface Tipo {
    id: number;
    tipo_contrato: string;
}

interface Props {
    contrato: Contrato;
    procedimientos: Procedimiento[];
    tipos: Tipo[];
}



export default function Edit({ contrato, tipos, procedimientos }: Props) {
    const { data, setData, put, errors } = useForm({
        descripcion: contrato.descripcion || '',
        responsable: contrato.responsable || '',
        tipos_id: contrato.tipos_id || '',
        importe_final: contrato.importe_final || '',
        tipo_procedimiento: contrato.tipo_procedimiento || '',
        fecha_inicio: contrato.fecha_inicio || '',
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

        if (contrato && contrato.id) {
            put(`/contratos/update/${contrato.id}`);
        } else {
            console.error("No se pudo encontrar el ID del contrato");
        }
    }
    console.log(errors);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:bg-gray-900">
                    <h2 className="mb-6 text-lg font-bold">Datos del Contrato</h2>

                    <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

                         <div className="flex flex-col gap-2">
                            <label htmlFor="tipos_id" className="text-sm font-medium">Tipo de contrato</label>
                            <select name="tipos_id" id="tipos_id"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.tipos_id}
                            onChange={e => setData('tipos_id',e.target.value)}>
                                    <option value="">Selecciona un tipo de contrato...</option>
                                    {tipos.map((tip) => (
                                        <option key={tip.id} value={tip.id}>
                                            {tip.tipo_contrato}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="tipo_procedimiento" className="text-sm font-medium">Proceso de adjudicación</label>
                            <select name="tipo_procedimiento" id="tipo_procedimiento"
                            className="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                            value={data.tipo_procedimiento}
                            onChange={e => setData('tipo_procedimiento',e.target.value)}>
                                <option value="">Seleccione un proceso...</option>
                                {procedimientos.map((proc)=>(
                                    <option key={proc.id} value={proc.id}>
                                        {proc.tipo_procedimiento}
                                    </option>
                                ))}
                            </select>
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
