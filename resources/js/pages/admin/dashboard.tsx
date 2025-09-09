import AppLayout from '@/layouts/app-layout';

export default function AdminDashboard() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/admin' }]}>
            <div className="px-6 py-10">
                <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-700">
                    Selamat datang di halaman admin. Gunakan menu di atas untuk mengelola produk, kategori, dan data lainnya.
                </p>
            </div>
        </AppLayout>
    );
}
