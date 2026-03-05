import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { movimientos} from '@/routes';
import type { NavItem } from '@/types';

interface SharedProps {
    permissions: {
        viewDashboard: boolean;
    };
    [key: string]: any;
}

const footerNavItems: NavItem[] = [
    {
        title: 'Repositorio Git',
        href: 'https://github.com/alvarodawserver/proyecto2026.git',
        icon: FolderGit2,
    },
    {
        title: 'Documentación',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { permissions } = usePage().props as unknown as SharedProps;

    const mainNavItems: NavItem[] = [
            ...(permissions?.viewDashboard // Usamos optional chaining por seguridad
                ? [
                    {
                        title: 'Inicio',
                        href: dashboard(),
                        icon: LayoutGrid, // Añadido para consistencia
                    },
                ]
                : []),
            {
                title: 'Movimientos',
                href: movimientos(),
                icon: BookOpen,
            },
        ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
