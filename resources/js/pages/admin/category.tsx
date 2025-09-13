import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Edit, FolderOpen, Plus, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    products_count: number;
    products: {
        id: number;
        name: string;
        image: string;
        price: number;
        category_id: number;
    }[];
}

interface Props {
    categories: Category[];
}

declare const route: any;

export default function AdminCategory({ categories }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<{ name: string; _method?: string }>({
        name: '',
    });

    const openCreateModal = () => {
        reset();
        setEditingCategory(null);
        setShowModal(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCategory) {
            // method spoofing for Laravel
            setData((prev) => ({ ...prev, _method: 'put' }));

            router.post(route('admin.category.update', editingCategory.id), data, {
                onSuccess: () => closeModal(),
            });
        } else {
            router.post(route('admin.category.store'), data, {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            router.delete(route('admin.category.destroy', id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AdminLayout>
            <Head title="Kelola Kategori" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Kelola Kategori</h1>
                                <p className="text-gray-600">Kelola semua kategori produk Anda</p>
                            </div>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Kategori
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Category Header */}
                                <div className="bg-[#0123AA] p-4 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-opacity-20 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                                                <FolderOpen className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">KATEGORI</h4>
                                                <p className="text-xs opacity-90">Produk Jaring</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(category)}
                                                className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors"
                                            >
                                                <Edit className="h-4 w-4 text-[#0123AA]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 text-[#0123AA]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Category Content */}
                                <div className="p-6">
                                    <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100">
                                        <FolderOpen className="h-12 w-12 text-[#0123AA]" />
                                    </div>

                                    <h3 className="mb-2 text-lg font-semibold text-gray-800">{category.name}</h3>

                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center justify-between">
                                            <span>ID:</span>
                                            <span className="font-medium">{category.id}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Dibuat:</span>
                                            <span className="font-medium">{formatDate(category.created_at)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 rounded-lg bg-blue-50 p-3">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#0123AA]">{category.products_count}</div>
                                            <div className="text-xs text-gray-600">Produk Terkait</div>
                                        </div>
                                    </div>

                                    {/* Products Preview */}
                                    {category.products && category.products.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="mb-3 text-sm font-semibold text-gray-700">Produk Terbaru:</h4>
                                            <div className="space-y-2">
                                                {category.products.map((product) => (
                                                    <div key={product.id} className="flex items-center gap-3 rounded-lg bg-gray-50 p-2">
                                                        <img
                                                            src={`/storage/${product.image}`}
                                                            alt={product.name}
                                                            className="h-10 w-10 rounded-md object-cover"
                                                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                                e.currentTarget.src =
                                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRDNEM0QzIi8+CjxwYXRoIGQ9Ik0xMiAxNkwyMCAyNEwyOCAxNiIgc3Ryb2tlPSIjOTk5OTk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                                                            }}
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-medium text-gray-800">{product.name}</p>
                                                            <p className="text-xs font-semibold text-[#0123AA]">{formatPrice(product.price)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {category.products_count > 3 && (
                                                    <div className="text-center">
                                                        <p className="text-xs text-gray-500">+{category.products_count - 3} produk lainnya</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {category.products_count === 0 && (
                                        <div className="mt-4 rounded-lg border-2 border-dashed border-gray-200 p-4 text-center">
                                            <p className="text-xs text-gray-500">Belum ada produk dalam kategori ini</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {categories.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mb-4 text-6xl text-gray-400">📁</div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-600">Belum ada kategori</h3>
                            <p className="mb-6 text-gray-500">Mulai tambahkan kategori untuk produk Anda</p>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Kategori Pertama
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Create/Edit */}
            {showModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4" onClick={closeModal}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md rounded-xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">{editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h2>
                                <button
                                    onClick={closeModal}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="space-y-6" onClick={(e) => e.stopPropagation()}>
                                {/* Category Icon Preview */}
                                <div className="flex justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100">
                                        <FolderOpen className="h-8 w-8 text-[#0123AA]" />
                                    </div>
                                </div>

                                {/* Category Name */}
                                <div>
                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                        Nama Kategori
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama kategori"
                                        className="mt-2"
                                        required
                                        autoFocus
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Info Text */}
                                <div className="rounded-lg bg-blue-50 p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <p className="text-sm text-blue-700">Kategori akan digunakan untuk mengelompokkan produk jaring Anda</p>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex gap-4 border-t pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            closeModal();
                                        }}
                                        className="flex-1"
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-[#0123AA] text-white hover:bg-blue-600"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {processing ? 'Menyimpan...' : editingCategory ? 'Update Kategori' : 'Tambah Kategori'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AdminLayout>
    );
}
