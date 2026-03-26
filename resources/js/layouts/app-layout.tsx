import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps, BreadcrumbItem } from '@/types';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { usePage } from '@inertiajs/react';

//export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//        {children}
//    </AppLayoutTemplate>
//);

export default function AppLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    const { props } = usePage();
    const urls = (props as any).urls || { home: '#', utilidades: '#' };

    const breadcrumbsDinamicos = breadcrumbs.map((item) => {

        let nuevoHref = item.href;

        if (item.href === 'home') nuevoHref = urls.home;
        if (item.href === 'utilidades') nuevoHref = urls.utilidades;

        return {
            ...item,
            href: nuevoHref,
        };
    });

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header rosa/rojo */}
            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm">
                <h1 className="text-xl font-medium">Gestión de Contratos</h1>
            </div>

            <div className="max-w-350 mx-auto px-4">
                {/* Ahora el breadcrumb anterior será "Utilidades" */}
                <div className="py-4">
                    <Breadcrumbs breadcrumbs={breadcrumbsDinamicos} />
                </div>

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
