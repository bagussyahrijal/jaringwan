import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { route } from 'ziggy-js';

interface ImageTab {
    id: string;
    category: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    imageTabs: ImageTab[];
}

export default function ImageTabPage({ imageTabs }: Props) {
    const [selectedItem, setSelectedItem] = useState<ImageTab | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ImageTab | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<ImageTab | null>(null);
    const [formData, setFormData] = useState({
        category: '',
        image: null as File | null,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const categories = ['Home and About', 'Product and Gallery'];

    // Check which categories are already taken
    const existingCategories = imageTabs.map((item) => item.category);
    const availableCategories = categories.filter((cat) => !existingCategories.includes(cat));
    const isAllCategoriesTaken = availableCategories.length === 0;

    const openModal = (item: ImageTab) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const openCreateModal = () => {
        setFormData({ category: '', image: null });
        setErrors({});
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        setFormData({ category: '', image: null });
        setErrors({});
    };

    const openEditModal = (item: ImageTab) => {
        setEditingItem(item);
        setFormData({ category: item.category, image: null });
        setErrors({});
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingItem(null);
        setFormData({ category: '', image: null });
        setErrors({});
    };

    const openDeleteModal = (item: ImageTab) => {
        setDeletingItem(item);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingItem(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const data = new FormData();
        data.append('category', formData.category);
        if (formData.image) {
            data.append('image', formData.image);
        }

        router.post(route('admin.image-tab.store'), data, {
            onSuccess: () => {
                closeCreateModal();
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        if (!editingItem) return;

        e.preventDefault();
        setErrors({});

        const data = new FormData();
        data.append('category', formData.category);
        if (formData.image) {
            data.append('image', formData.image);
        }
        data.append('_method', 'POST');

        router.post(route('admin.image-tab.update', editingItem.id), data, {
            onSuccess: () => {
                closeEditModal();
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleDelete = () => {
        if (!deletingItem) return;

        router.delete(route('admin.image-tab.destroy', deletingItem.id), {
            onSuccess: () => {
                closeDeleteModal();
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Manajemen Image Tab" />

            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Manajemen Image Tab</h1>
                            <p className="mt-2 text-gray-600">Kelola gambar banner untuk berbagai halaman</p>
                            <p className="mt-1 text-sm text-blue-600">
                                Maksimal 1 gambar untuk setiap kategori (Home and About, Product and Gallery)
                            </p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            disabled={isAllCategoriesTaken}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors ${
                                isAllCategoriesTaken ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            title={isAllCategoriesTaken ? 'Semua kategori sudah ada' : 'Tambah Image Tab'}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {isAllCategoriesTaken ? 'Semua Kategori Ada' : 'Tambah Image Tab'}
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500">Total Image Tab</dt>
                                        <dd className="text-lg font-medium text-gray-900">{imageTabs.length}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        {categories.map((category) => (
                            <div key={category} className="rounded-lg bg-white p-6 shadow-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">{category}</dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {imageTabs.filter((item) => item.category === category).length}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Tab Grid */}
                    <div className="rounded-lg bg-white shadow-sm">
                        <div className="p-6">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800">Daftar Image Tab</h2>

                            {imageTabs.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {imageTabs.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="transform cursor-pointer overflow-hidden rounded-xl border bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                        >
                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.category}
                                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                                    }}
                                                    onClick={() => openModal(item)}
                                                />
                                                {/* Category Badge */}
                                                <div className="absolute top-2 left-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                                                    {item.category}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                <div className="mb-3">
                                                    <h3 className="text-lg font-semibold text-gray-800">{item.category}</h3>
                                                    <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString('id-ID')}</p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openEditModal(item);
                                                        }}
                                                        className="flex-1 rounded-md bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-800 transition-colors hover:bg-yellow-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openDeleteModal(item);
                                                        }}
                                                        className="flex-1 rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-200"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="mb-4 text-gray-400">
                                        <svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17l2.5-3.15L14.5 17H9zm4.5-6L16 8.5 19 13h-5.5z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-lg font-medium text-gray-600">Belum ada Image Tab</h3>
                                    <p className="text-gray-500">
                                        Anda dapat menambahkan maksimal 2 image tab:
                                        <br />1 untuk kategori "Home and About" dan 1 untuk "Product and Gallery"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* View Modal */}
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedItem.category}</h2>
                                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mb-4 aspect-video">
                                    <img
                                        src={`/storage/${selectedItem.image}`}
                                        alt={selectedItem.category}
                                        className="h-full w-full rounded-lg object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                        }}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">Kategori</h3>
                                        <p className="text-gray-600">{selectedItem.category}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">Tanggal Upload</h3>
                                        <p className="text-gray-600">
                                            {new Date(selectedItem.created_at).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Create Modal */}
                {isCreateModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
                        onClick={closeCreateModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="w-full max-w-md rounded-lg bg-white p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="mb-4 text-lg font-semibold">Tambah Image Tab</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Kategori</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {availableCategories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {availableCategories.length === 0 && <p className="mt-1 text-sm text-gray-500">Semua kategori sudah digunakan</p>}
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Gambar</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={closeCreateModal}
                                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* Edit Modal */}
                {isEditModalOpen && editingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
                        onClick={closeEditModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="w-full max-w-md rounded-lg bg-white p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="mb-4 text-lg font-semibold">Edit Image Tab</h3>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Kategori</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Gambar Saat Ini</label>
                                    <img
                                        src={`/storage/${editingItem.image}`}
                                        alt={editingItem.category}
                                        className="h-20 w-20 rounded-md object-cover"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Gambar Baru (opsional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* Delete Modal */}
                {isDeleteModalOpen && deletingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
                        onClick={closeDeleteModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="w-full max-w-md rounded-lg bg-white p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="mb-4 text-lg font-semibold">Hapus Image Tab</h3>
                            <p className="mb-6 text-gray-600">
                                Apakah Anda yakin ingin menghapus image tab "{deletingItem.category}"? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={closeDeleteModal}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                >
                                    Hapus
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </AppLayout>
    );
}
