import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';


export default function Create() {
    const { data, setData, post, errors } = useForm({
        tipo_contrato: ''
    });


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Crear Contrato',
            href: '/tipos/create',
        },
    ];



    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/tipos/store');
    }

    return (
        <>
        <AppLayout breadcrumbs={breadcrumbs}>
        <div className="flex flex-1 flex-col gap-4 p-4">



            <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:bg-gray-900">
                <h2 className="mb-6 text-lg font-bold">Datos del procedimiento</h2>


                <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">

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
