import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { users as usersRoute } from '@/routes';

type Contrato = {
    id: number;
    n_expediente: string;
    // otros campos si los necesitas
};

type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    contratos: Contrato[]; //Array de contratos
};

type Props = {
    users: User[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: usersRoute(),
    },
];

export default function Index({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Usuarios</h1>

                    <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full min-w-[600px] divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="px-4 py-2 text-left text-sm font-medium">Fecha</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Observaciones</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Actuación</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Contratos</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                                    {(users).map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-2">{user.created_at}</td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">
                                            {user.contratos && user.contratos.length > 0 ? (
                                            user.contratos.map((contrato) => (
                                                <div key={contrato.id}>{contrato.n_expediente}</div>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">No tiene contratos</span>
                                        )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </AppLayout>
    );
}
