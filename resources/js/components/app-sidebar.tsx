import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Route } from 'lucide-react';
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
import { dashboard} from '@/routes';
import { movimientos} from '@/routes';
import { contratos} from '@/routes';
import {desactivados} from '@/routes';
import type { NavItem } from '@/types';
import Can from '@/components/can';
import {usePage} from '@inertiajs/react';



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
    const {auth} = usePage().props as any;

    const canManage = auth.can.manejar_contratos;

    const mainNavItems: NavItem[] = [
        {
            title: 'Inicio',
            href: dashboard()
        },
        {
            title: 'Control de Mando',
            href: '/contratos/control-mando',
        },
        {
            title: 'Movimientos',
            href: movimientos()
        },
        {
            title:'Contratos',
            href:contratos()
        },
        ...(canManage ? [{ title:'Contratos Desactivados', href: desactivados()}] : []),
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
