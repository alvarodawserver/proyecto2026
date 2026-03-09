//AVISO: NO SE USA
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {contratos as contratoRoute} from '@/routes';
import Can from '@/components/can';
import { Link } from '@inertiajs/react';

type Departamento = {
    id:number,
    unidad_promotora:string,

};

type Props = {
    unidad_promotoras: Departamento[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Unidades Promotoras',
        href: '/unidad_promotoras',
    },
];

export default function UnidadPromotoras({ unidad_promotoras }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Unidades Promotoras" />

            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Unidades Promotoras</h1>

                {unidad_promotoras?.length === 0 ? (
                    <p className="text-gray-500">No tienes unidades promotoras aún.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        {unidad_promotoras.map((uni) => (
                            <div key={uni.id} className="flex items-center justify-between p-4 border-b border-sidebar-border/50 dark:border-sidebar-border">
                                <div>
                                    <Link href={`/unidad_promotoras/show/${uni.id}`}>
                                        <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                                            {uni.unidad_promotora}
                                        </h2>
                                    </Link>
                                </div>

                                <Can permission='manejar_unidad_promotoras'>
                                    <div className="flex gap-2"> {/* Contenedor para alinear botones */}
                                        <Link href={`/unidad_promotoras/edit/${uni.id}`}>
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-500">
                                                Editar
                                            </span>
                                        </Link>

                                        <Link
                                            href={`/unidad_promotoras/destroy/${uni.id}`}
                                            method="delete"
                                            as="button" // Importante para que el clic funcione como DELETE
                                            onBefore={() => confirm('¿Estás seguro de que deseas eliminar esta unidad promotora?')}
                                        >
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-500">
                                                Eliminar
                                            </span>
                                        </Link>
                                    </div>
                                </Can>
                            </div>
                        ))}
                    </div>
                )}

                <Can permission='manejar_unidad_promotoras'>
                    <Link
                        href="/unidad_promotoras/create"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 w-fit"
                    >
                        Crear Unidad Promotora
                    </Link>
                </Can>
            </div>
        </AppLayout>
    );
}
