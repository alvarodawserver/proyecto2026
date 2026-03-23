import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    return (
        <nav className="flex items-center justify-between w-full px-4 h-10 bg-[#f5f5f5] border-b border-gray-200">
            <Breadcrumb>
                <BreadcrumbList className="text-[13px]">
                    <BreadcrumbItem>
                        <a href="/ayudas/views/site/index.php" className="text-blue-600 hover:underline">
                            Inicio
                        </a>
                    </BreadcrumbItem>

                    {breadcrumbs.length > 0 && <BreadcrumbSeparator className="text-gray-400" />}

                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        // 1. Convertimos el href a string de forma segura
                        const hrefString = typeof item.href === 'string' ? item.href : '';

                        // 2. Ahora sí podemos usar includes sin error
                        const isExternal = hrefString.includes('.php');

                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="text-[#666666] font-normal">
                                            {item.title}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            {isExternal ? (
                                                /* Usamos hrefString que ya es de tipo string */
                                                <a href={hrefString} className="text-[#007bff] hover:underline">
                                                    {item.title}
                                                </a>
                                            ) : (
                                                /* Inertia Link acepta el objeto item.href original perfectamente */
                                                <Link href={item.href} className="text-[#007bff] hover:underline">
                                                    {item.title}
                                                </Link>
                                            )}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator className="text-gray-400" />}
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>

            <button
                onClick={() => window.history.back()}
                className="text-[10px] font-bold text-gray-500 hover:text-gray-800 transition-colors uppercase tracking-widest flex items-center gap-1"
            >
                <ArrowLeft size={12} />
                Volver
            </button>
        </nav>
    );
}
