import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Edit, ExternalLink, Plus, Store, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

interface OnlineShop {
    id: string;
    name: string;
    description: string;
    image: string;
    url: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    shops: OnlineShop[];
}

declare const route: any;

export default function AdminOnlineShop({ shops }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingShop, setEditingShop] = useState<OnlineShop | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add custom loading state

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        url: '',
        image: null as File | null,
    });

    const openCreateModal = () => {
        reset();
        setEditingShop(null);
        setPreviewImage(null);
        setShowModal(true);
    };

    const openEditModal = (shop: OnlineShop) => {
        setEditingShop(shop);
        setData({
            name: shop.name,
            description: shop.description,
            url: shop.url,
            image: null,
        });
        setPreviewImage(`/storage/${shop.image}`);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingShop(null);
        setPreviewImage(null);
        reset();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setData('image', null);
            setPreviewImage(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingShop) {
            // Use the form's put method for updates
            put(route('admin.online-shop.update', editingShop.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    console.log('Update errors:', errors);
                }
            });
        } else {
            // Use the form's post method for creates
            post(route('admin.online-shop.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    console.log('Create errors:', errors);
                }
            });
        }
    };

    // Alternative approach using router with custom loading state
    const handleSubmitWithCustomLoading = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (editingShop) {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('url', data.url);
            formData.append('_method', 'PUT');

            if (data.image) {
                formData.append('image', data.image);
            }

            router.post(route('admin.online-shop.update', editingShop.id), formData, {
                onSuccess: () => {
                    setIsSubmitting(false);
                    closeModal();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            });
        } else {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('url', data.url);

            if (data.image) {
                formData.append('image', data.image);
            }

            router.post(route('admin.online-shop.store'), formData, {
                onSuccess: () => {
                    setIsSubmitting(false);
                    closeModal();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            });
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus toko online ini?')) {
            setIsSubmitting(true);
            router.delete(route('admin.online-shop.destroy', id), {
                onFinish: () => setIsSubmitting(false)
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <AdminLayout>
            <Head title="Kelola Toko Online" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Kelola Toko Online</h1>
                                <p className="text-gray-600">Kelola semua toko online dan marketplace Anda</p>
                            </div>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600 hover:cursor-pointer">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Toko Online
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Online Shops Grid */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {shops.map((shop, index) => (
                            <motion.div
                                key={shop.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Shop Header */}
                                <div className="bg-[#0123AA] p-4 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-opacity-20 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                                                <Store className="h-5 w-5 text-[#0123AA]" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">TOKO ONLINE</h4>
                                                <p className="text-xs opacity-90">Marketplace</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(shop)}
                                                className="hover:cursor-pointer bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors"
                                            >
                                                <Edit className="h-4 w-4 text-[#0123AA]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(shop.id)}
                                                className="hover:cursor-pointer bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Shop Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={`/storage/${shop.image}`}
                                        alt={shop.name}
                                        className="h-full w-full object-cover"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                            e.currentTarget.src =
                                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRDNEM0QzIi8+CjxwYXRoIGQ9Ik0xMjAgODBMMTUwIDExMEwxODAgODAiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==';
                                        }}
                                    />

                                    {/* Visit Store Button */}
                                    <div className="absolute top-4 right-4">
                                        <a
                                            href={shop.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-green-600"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Kunjungi
                                        </a>
                                    </div>
                                </div>

                                {/* Shop Info */}
                                <div className="p-4">
                                    <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-800">{shop.name}</h3>
                                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">{shop.description}</p>

                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center justify-between">
                                            <span>ID:</span>
                                            <span className="font-medium">{shop.id.slice(0, 8)}...</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Dibuat:</span>
                                            <span className="font-medium">{formatDate(shop.created_at)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>URL:</span>
                                            <a
                                                href={shop.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="max-w-[120px] truncate font-medium text-blue-600 hover:text-blue-800"
                                                title={shop.url}
                                            >
                                                {new URL(shop.url).hostname}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {shops.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mb-4 text-6xl text-gray-400">🏪</div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-600">Belum ada toko online</h3>
                            <p className="mb-6 text-gray-500">Mulai tambahkan toko online dan marketplace Anda</p>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Toko Online Pertama
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
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">{editingShop ? 'Edit Toko Online' : 'Tambah Toko Online Baru'}</h2>
                                <button
                                    onClick={closeModal}
                                    className="hover:cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="space-y-6" onClick={(e) => e.stopPropagation()}>
                                {/* Image Upload */}
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Logo/Gambar Toko</Label>
                                    <div className="mt-2">
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/jpg"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                            required={!editingShop}
                                        />
                                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}

                                        {previewImage && (
                                            <div className="mt-4">
                                                <img src={previewImage} alt="Preview" className="h-32 w-32 rounded-lg object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Shop Name */}
                                <div>
                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                        Nama Toko
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama toko online"
                                        className="mt-2"
                                        required
                                        autoFocus
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* URL */}
                                <div>
                                    <Label htmlFor="url" className="text-sm font-semibold text-gray-700">
                                        URL Toko
                                    </Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        placeholder="https://onlineshop.com/namatoko"
                                        className="mt-2"
                                        required
                                    />
                                    {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                                        Deskripsi
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Masukkan deskripsi toko online"
                                        rows={4}
                                        className="mt-2"
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
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
                                        className="flex-1 hover:cursor-pointer"
                                        disabled={processing || isSubmitting} // Disable during processing
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing || isSubmitting} // Use both processing states
                                        className="hover:cursor-pointer flex-1 bg-[#0123AA] text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {(processing || isSubmitting) ? (
                                            <div className="flex items-center">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                {editingShop ? 'Mengupdate...' : 'Menyimpan...'}
                                            </div>
                                        ) : (
                                            editingShop ? 'Update Toko' : 'Tambah Toko'
                                        )}
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
