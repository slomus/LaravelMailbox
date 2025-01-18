import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Home from '@/Pages/Home';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Home />
        </AuthenticatedLayout>
    );
}
