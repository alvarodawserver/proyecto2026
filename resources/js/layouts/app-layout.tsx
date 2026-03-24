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
    const { auth } = usePage().props as any;
    const fixedBreadcrumbs = breadcrumbs.map((item, index) => {
        const hrefStr = String(item.href);
        if (index === 0 && hrefStr.includes('control-mando')) {
            if (!auth.can.ver_control_mando) {
                return { ...item, title: 'Mis Expedientes', href: '/contratos' };
            }
            return {
            ...item,
            title: 'Control de Mando',
            href: '/contratos/control-mando'
            };
        }

        return item;
    });

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="bg-[#e96b7d] p-2 px-4 text-white font-bold text-lg shadow-sm">
                <h1 className="text-xl font-medium">Gestión de Contratos</h1>
            </div>


            <div className="max-w-[1400px] mx-auto px-4">


                <div className="py-4">
                    <Breadcrumbs breadcrumbs={fixedBreadcrumbs} />
                </div>

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
