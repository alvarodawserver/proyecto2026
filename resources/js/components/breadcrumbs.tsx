import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { ArrowLeft } from 'lucide-react'; // O tu librería de iconos
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    return (
        <nav className="flex items-center justify-between w-full px-4 py-2 bg-[#f5f5f5] border border-[#e3e3e3] rounded shadow-sm">
            <div className="flex items-center text-[13px]">
                <a href="http://localhost:8080/index.php" className="text-[#337ab7] hover:underline">Inicio</a>

                {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <span className="mx-2 text-[#ccc]">/</span>
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-[#777] italic">{item.title}</span>
                        ) : (
                            <Link href={item.href} className="text-[#337ab7] hover:underline">
                                {item.title}
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={() => window.history.back()}
                className="text-[10px] font-bold text-gray-400 hover:text-[#337ab7] uppercase flex items-center gap-1"
            >
                <ArrowLeft size={12} /> VOLVER
            </button>
        </nav>
    );
}
