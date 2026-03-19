import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react'; // Importamos una flecha para volver
import AppLogo from '@/components/app-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();

    return (
        <>
            <div className="border-b border-gray-200 bg-white">
                {/* Cambiado md:max-w-7xl por w-full para usar todo el ancho */}
                <div className="flex h-16 items-center px-4 w-full">

                    {/* 1. Botón de Volver al Portal de Yii (INTEGRACIÓN) */}
                    <div className="flex items-center mr-6">
                        <a
                            href="http://localhost/ayudas/web/index.php"
                            className="flex items-center text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
                        >
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            VOLVER AL PORTAL
                        </a>
                    </div>

                    <div className="h-6 w-px bg-gray-200 mr-6" /> {/* Separador visual */}

                    {/* 2. Logo / Home */}
                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center space-x-2"
                    >
                        <AppLogo />
                    </Link>

                    {/* 3. Lado derecho: Solo el usuario */}
                    <div className="ml-auto flex items-center space-x-4">
                        <span className="text-xs font-medium text-gray-500 uppercase hidden sm:inline">
                            Sesión: {auth.user.name}
                        </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-1 border border-gray-100"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={auth.user.avatar}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Opcional: Quitamos los breadcrumbs si quieres que la tabla suba más arriba */}
            {/* Si los quieres dejar, ya se verán a ancho completo también */}
        </>
    );
}
