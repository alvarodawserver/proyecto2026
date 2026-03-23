import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps, BreadcrumbItem } from '@/types';
import { Breadcrumbs } from '@/components/breadcrumbs';

//export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//        {children}
//    </AppLayoutTemplate>
//);

export default function AppLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* CABECERA NARANJA: Ocupa el 100% del ancho de la pantalla */}
            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm">
                <h1 className="text-xl font-medium">Control de Mando</h1>
            </div>

            {/* CONTENEDOR LIMITADO: Aquí es donde el Breadcrumb se "encoge" para alinearse con la tabla */}
            <div className="max-w-[1400px] mx-auto px-4">

                {/* El Breadcrumb ahora está aquí, dentro del margen, debajo del color */}
                <div className="py-4">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
