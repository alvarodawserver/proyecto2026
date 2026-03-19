import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

type Props = {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
};

export function AppShell({ children }: Props) {
    return (
        // Mantenemos el Provider para evitar el error de "useSidebar"
        // pero le decimos que por defecto esté cerrado (defaultOpen={false})
        <SidebarProvider defaultOpen={false}>
            <div className="flex min-h-screen w-full flex-col bg-white">
                {children}
            </div>
        </SidebarProvider>
    );
}
