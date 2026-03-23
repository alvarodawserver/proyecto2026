import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps, BreadcrumbItem } from '@/types';
import { Breadcrumbs } from '@/components/breadcrumbs';

//export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//        {children}
//    </AppLayoutTemplate>
//);

export default function AppLayout({
    children,
    breadcrumbs = [] // Recibe la prop aquí
}: {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[]
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* 1. RENDERIZA AQUÍ EL BREADCRUMB */}
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <main>
                {children}
            </main>
        </div>
    );
}
