import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import {desactivados} from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { FileText, ArrowLeftRight, ClipboardList, FileMinus, Wrench, Cross, CrossIcon, Crosshair, MinusIcon, MinusCircleIcon, FileX, Files } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-8 p-8">
                <div className="border-b border-gray-200 pb-2 dark:border-neutral-700">
                    <h2 className="text-lg font-medium text-gray-600 dark:text-neutral-400">Gestión General</h2>
                </div>

                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <Link
                        href="/contratos"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-blue-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <FileText className="size-12 text-violet-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Contratos</h3>
                        <p className="text-sm text-gray-500">Gestión de los contratos.</p>
                    </Link>
                    <Link
                        href="/movimientos"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-blue-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <ArrowLeftRight className="size-12 text-blue-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Movimientos</h3>
                        <p className="text-sm text-gray-500">Gestión de los movimientos.</p>
                    </Link>
                    <Link
                        href={desactivados()}
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-blue-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <FileX className="size-12 text-pink-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Contratos desactivados</h3>
                        <p className="text-sm text-gray-500">Gestión de los contratos desactivados.</p>
                    </Link>
                    <Link
                        href="/procedimientos"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-green-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <ClipboardList className="size-12 text-green-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Procedimientos</h3>
                        <p className="text-sm text-gray-500">Gestión de los procedimientos.</p>
                    </Link>
                    <Link
                        href="/tipos"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-green-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <Files className="size-12 text-orange-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Tipos de contratos</h3>
                        <p className="text-sm text-gray-500">Gestión de los tipos de contratos.</p>
                    </Link>
                </div>

            </div>
        </AppLayout>
    );
}
