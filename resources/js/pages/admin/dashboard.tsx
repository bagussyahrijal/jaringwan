import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { AlertTriangle, Camera, CheckCircle, Eye, FolderOpen, Image, Info, Package, Plus, Store, TrendingUp } from 'lucide-react';
import { route } from 'ziggy-js';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    url_shop?: string;
    category_id: number;
    category: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Category {
    id: number;
    name: string;
    products_count: number;
}

interface Gallery {
    id: string;
    title: string;
    image: string;
    video: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface OnlineShop {
    id: string;
    name: string;
    description: string;
    image: string;
    url: string;
    created_at: string;
    updated_at: string;
}

interface Information {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface ImageTab {
    id: string;
    category: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    products: Product[];
    categories: Category[];
    galleries: Gallery[];
    onlineShops: OnlineShop[];
    information: Information[];
    imageTabs: ImageTab[];
}

export default function AdminDashboard({ products, categories, galleries, onlineShops, information, imageTabs }: Props) {
    // Calculate statistics
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const totalGalleries = galleries.length;
    const totalShops = onlineShops.length;
    const totalInformation = information.length;
    const totalImageTabs = imageTabs.length;

    // Calculate low stock products (stock <= 5)
    const lowStockProducts = products.filter((product) => product.stock <= 5);

    // Get recent galleries (last 3)
    const recentGalleries = galleries.slice(0, 3);

    // Get categories with most products
    const topCategories = [...categories].sort((a, b) => b.products_count - a.products_count).slice(0, 3);

    // Prepare limited displays (max 3 each)
    const displayGalleries = recentGalleries.slice(0, 3);
    const displayTopCategories = topCategories.slice(0, 3);
    const displayLowStock = lowStockProducts.slice(0, 3);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AdminLayout breadcrumbs={[{ title: 'Dashboard', href: '/admin' }]}>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gray-50">
                {/* Header (match product page style) */}
                <div className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                                <p className="text-gray-600">Ringkasan data & aktivitas situs Anda</p>
                            </div>
                            {/* (No action button for dashboard as requested) */}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {/* Produk */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Card className="flex h-full flex-col items-center justify-center py-6 text-center">
                                <div className="mb-3 flex items-center justify-center rounded-full bg-blue-50 p-4">
                                    <Package className="h-10 w-10 text-blue-600" />
                                </div>
                                <div className="text-4xl leading-none font-bold text-blue-600">{totalProducts}</div>
                                <h3 className="mb-1 text-sm font-medium text-gray-600">Produk</h3>
                            </Card>
                        </motion.div>

                        {/* Kategori */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <Card className="flex h-full flex-col items-center justify-center py-6 text-center">
                                <div className="mb-3 flex items-center justify-center rounded-full bg-green-50 p-4">
                                    <FolderOpen className="h-10 w-10 text-green-600" />
                                </div>
                                <div className="text-4xl leading-none font-bold text-green-600">{totalCategories}</div>
                                <h3 className="mb-1 text-sm font-medium text-gray-600">Kategori</h3>
                            </Card>
                        </motion.div>

                        {/* Galeri */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <Card className="flex h-full flex-col items-center justify-center py-6 text-center">
                                <div className="mb-3 flex items-center justify-center rounded-full bg-purple-50 p-4">
                                    <Image className="h-10 w-10 text-purple-600" />
                                </div>
                                <div className="text-4xl leading-none font-bold text-purple-600">{totalGalleries}</div>
                                <h3 className="mb-1 text-sm font-medium text-gray-600">Galeri</h3>
                            </Card>
                        </motion.div>

                        {/* Toko Online */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <Card className="flex h-full flex-col items-center justify-center py-6 text-center">
                                <div className="mb-3 flex items-center justify-center rounded-full bg-orange-50 p-4">
                                    <Store className="h-10 w-10 text-orange-600" />
                                </div>
                                <div className="text-4xl leading-none font-bold text-orange-600">{totalShops}</div>
                                <h3 className="mb-1 text-sm font-medium text-gray-600">Toko Online</h3>
                            </Card>
                        </motion.div>

                        {/* Informasi */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <Card className="flex h-full flex-col items-center justify-center py-6 text-center">
                                <div className="mb-3 flex items-center justify-center rounded-full bg-teal-50 p-4">
                                    <Info className="h-10 w-10 text-teal-600" />
                                </div>
                                <div className="text-4xl leading-none font-bold text-teal-600">{totalInformation}</div>
                                <h3 className="mb-1 text-sm font-medium text-gray-600">Informasi</h3>
                            </Card>
                        </motion.div>

                        {/* Background */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                            <Card className="flex h-full flex-col items-center justify-center py-6 text-center">
                                <div className="mb-3 flex items-center justify-center rounded-full bg-pink-50 p-4">
                                    <Camera className="h-10 w-10 text-pink-600" />
                                </div>
                                <div className="text-4xl leading-none font-bold text-pink-600">{totalImageTabs}</div>
                                <h3 className="mb-1 text-sm font-medium text-gray-600">Background</h3>
                            </Card>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Recent Galleries */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <Card className="flex h-full min-h-[360px] flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Image className="h-5 w-5" />
                                        Galeri Terbaru
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col">
                                    <div className="space-y-4">
                                        {displayGalleries.length > 0 ? (
                                            displayGalleries.map((gallery) => (
                                                <div key={gallery.id} className="flex items-start space-x-3">
                                                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                                                        {gallery.image && (
                                                            <img
                                                                src={`/storage/${gallery.image}`}
                                                                alt={gallery.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">{gallery.title}</p>
                                                        <p className="text-xs text-gray-500">{formatDate(gallery.created_at)}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">Belum ada galeri</p>
                                        )}
                                    </div>
                                    <div className="mt-auto pt-4">
                                        <Link href={route('admin.gallery.show')}>
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Eye className="mr-2 h-4 w-4" />
                                                Lihat Semua Galeri
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Top Categories */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                            <Card className="flex h-full min-h-[360px] flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Kategori Teratas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col">
                                    <div className="space-y-4">
                                        {displayTopCategories.length > 0 ? (
                                            displayTopCategories.map((category, index) => (
                                                <div key={category.id} className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                                            <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                                                        </div>
                                                        <span className="text-sm font-medium">{category.name}</span>
                                                    </div>
                                                    <Badge variant="secondary">{category.products_count} produk</Badge>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">Belum ada kategori</p>
                                        )}
                                    </div>
                                    <div className="mt-auto pt-4">
                                        <Link href={route('admin.category.index')}>
                                            <Button variant="outline" size="sm" className="w-full">
                                                <FolderOpen className="mr-2 h-4 w-4" />
                                                Kelola Kategori
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Low Stock Alert */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                            <Card className="flex h-full min-h-[360px] flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                        Stok Menipis
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col">
                                    <div className="space-y-4">
                                        {displayLowStock.length > 0 ? (
                                            displayLowStock.map((product) => (
                                                <div key={product.id} className="flex items-start space-x-3">
                                                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                                                        <img
                                                            src={`/storage/${product.image}`}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.category.name}</p>
                                                        <Badge variant={product.stock === 0 ? 'destructive' : 'secondary'} className="mt-1">
                                                            {product.stock === 0 ? 'Habis' : `${product.stock} tersisa`}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-center space-x-2 text-green-600">
                                                <CheckCircle className="h-4 w-4" />
                                                <span className="text-sm">Semua stok aman</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-auto pt-4">
                                        <Link href={route('admin.product.index')}>
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Package className="mr-2 h-4 w-4" />
                                                Kelola Produk
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Aksi Cepat</CardTitle>
                                <CardDescription>Shortcut untuk menambahkan konten baru</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                                    {/* Produk Baru */}
                                    <Link href={route('admin.product.index')}>
                                        <Button variant="outline" className="group h-24 w-full flex-col items-center justify-center space-y-2">
                                            <div className="relative flex items-center justify-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover:bg-blue-100">
                                                    <Package className="h-7 w-7 text-blue-600" />
                                                </div>
                                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                                                    <Plus className="h-3 w-3" />
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Produk Baru</span>
                                        </Button>
                                    </Link>

                                    {/* Kategori Baru */}
                                    <Link href={route('admin.category.index')}>
                                        <Button variant="outline" className="group h-24 w-full flex-col items-center justify-center space-y-2">
                                            <div className="relative flex items-center justify-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 transition-colors group-hover:bg-green-100">
                                                    <FolderOpen className="h-7 w-7 text-green-600" />
                                                </div>
                                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
                                                    <Plus className="h-3 w-3" />
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Kategori Baru</span>
                                        </Button>
                                    </Link>

                                    {/* Galeri Baru */}
                                    <Link href={route('admin.gallery.show')}>
                                        <Button variant="outline" className="group h-24 w-full flex-col items-center justify-center space-y-2">
                                            <div className="relative flex items-center justify-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 transition-colors group-hover:bg-purple-100">
                                                    <Image className="h-7 w-7 text-purple-600" />
                                                </div>
                                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white">
                                                    <Plus className="h-3 w-3" />
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Galeri Baru</span>
                                        </Button>
                                    </Link>

                                    {/* Toko Online */}
                                    <Link href={route('admin.online-shop.index')}>
                                        <Button variant="outline" className="group h-24 w-full flex-col items-center justify-center space-y-2">
                                            <div className="relative flex items-center justify-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 transition-colors group-hover:bg-orange-100">
                                                    <Store className="h-7 w-7 text-orange-600" />
                                                </div>
                                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white">
                                                    <Plus className="h-3 w-3" />
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Toko Online</span>
                                        </Button>
                                    </Link>

                                    {/* Informasi */}
                                    <Link href={route('admin.information.index')}>
                                        <Button variant="outline" className="group h-24 w-full flex-col items-center justify-center space-y-2">
                                            <div className="relative flex items-center justify-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 transition-colors group-hover:bg-teal-100">
                                                    <Info className="h-7 w-7 text-teal-600" />
                                                </div>
                                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                                                    <Plus className="h-3 w-3" />
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Informasi</span>
                                        </Button>
                                    </Link>

                                    {/* Background */}
                                    <Link href={route('admin.image-tab.index')}>
                                        <Button variant="outline" className="group h-24 w-full flex-col items-center justify-center space-y-2">
                                            <div className="relative flex items-center justify-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 transition-colors group-hover:bg-pink-100">
                                                    <Camera className="h-7 w-7 text-pink-600" />
                                                </div>
                                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-white">
                                                    <Plus className="h-3 w-3" />
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Background</span>
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </AdminLayout>
    );
}
