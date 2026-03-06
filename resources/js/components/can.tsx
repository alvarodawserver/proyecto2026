import { usePage } from '@inertiajs/react';

interface Props {
    permission: string;
    children: React.ReactNode;
}

export default function Can({ permission, children }: Props) {
    const { auth } = usePage().props as any;

    
    if (auth.can[permission]) {
        return <>{children}</>;
    }

    return null;
}
