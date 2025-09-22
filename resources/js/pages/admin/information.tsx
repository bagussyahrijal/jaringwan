import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Edit, FileText, Info, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Information {
    id: string;
    title: string;
    header: string;
    subheader:string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    information: Information[];
}

declare const route: any;

export default function AdminInformation({ information }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingInformation, setEditingInformation] = useState<Information | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add custom loading state

    const { data, setData, post, put, processing, errors, reset } = useForm<{
        title: string;
        header: string;
        subheader: string;
        content: string;
    }>({
        title: '',
        header: '',
        subheader: '',
        content: '',
    });

    const hasInformation = information.length > 0;
    const currentInformation = hasInformation ? information[0] : null;

    const openCreateModal = () => {
        if (hasInformation) {
            alert('Hanya boleh ada satu data informasi. Silakan edit data yang sudah ada.');
            return;
        }
        reset();
        setEditingInformation(null);
        setShowModal(true);
    };

    const openEditModal = (info: Information) => {
        setEditingInformation(info);
        setData({
            title: info.title,
            header: info.header,
            subheader: info.subheader,
            content: info.content,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingInformation(null);
        reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingInformation) {
            // Use the form's put method for updates
            put(route('admin.information.update', editingInformation.id), {
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    console.log('Update errors:', errors);
                }
            });
        } else {
            // Use the form's post method for creates
            post(route('admin.information.store'), {
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

        if (editingInformation) {
            // method spoofing for Laravel
            const submitData = { ...data, _method: 'PUT' };

            router.post(route('admin.information.update', editingInformation.id), submitData, {
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
            router.post(route('admin.information.store'), data, {
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
        if (confirm('Apakah Anda yakin ingin menghapus informasi ini?')) {
            setIsSubmitting(true);
            router.delete(route('admin.information.destroy', id), {
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
            <Head title="Kelola Informasi" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Kelola Informasi</h1>
                                <p className="text-gray-600">Kelola informasi perusahaan Anda</p>
                            </div>
                            {!hasInformation && (
                                <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600 hover:cursor-pointer">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Informasi
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Information Content */}
                <div className="container mx-auto px-4 py-8">
                    {hasInformation && currentInformation ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                        >
                            {/* Information Header */}
                            <div className="bg-[#0123AA] p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-opacity-20 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                                            <Info className="h-6 w-6 text-[#0123AA]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{currentInformation.title}</h2>
                                            <p className="text-blue-100">{currentInformation.header}</p>
                                            <p className="text-blue-100">{currentInformation.subheader}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(currentInformation)}
                                            className="hover:cursor-pointer bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center rounded-full bg-white transition-colors"
                                        >
                                            <Edit className="h-5 w-5 text-black" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(currentInformation.id)}
                                            className="hover:cursor-pointer bg-opacity-20 hover:bg-opacity-30 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Information Content */}
                            <div className="p-6">
                                <div className="mb-6 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100">
                                    <FileText className="h-16 w-16 text-[#0123AA]" />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold text-gray-800">Judul</h3>
                                        <p className="text-gray-600">{currentInformation.title}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold text-gray-800">Header</h3>
                                        <p className="text-gray-600">{currentInformation.header}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold text-gray-800">Subheader</h3>
                                        <p className="text-gray-600">{currentInformation.subheader}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold text-gray-800">Konten</h3>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <p className="whitespace-pre-wrap text-gray-700">{currentInformation.content}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-lg bg-blue-50 p-4">
                                        <div className="flex items-center justify-between text-sm text-blue-700">
                                            <span>Dibuat: {formatDate(currentInformation.created_at)}</span>
                                            <span>Diperbarui: {formatDate(currentInformation.updated_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="mb-4 text-6xl text-gray-400">📄</div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-600">Belum ada informasi</h3>
                            <p className="mb-6 text-gray-500">Tambahkan informasi perusahaan untuk ditampilkan di halaman about</p>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600 hover:cursor-pointer">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Informasi
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
                        className="w-full max-w-2xl rounded-xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingInformation ? 'Edit Informasi' : 'Tambah Informasi Baru'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="hover:cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="space-y-6" onClick={(e) => e.stopPropagation()}>
                                {/* Information Icon Preview */}
                                <div className="flex justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100">
                                        <FileText className="h-8 w-8 text-[#0123AA]" />
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                                        Judul
                                    </Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Masukkan judul informasi"
                                        className="mt-2"
                                        required
                                        autoFocus
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Header */}
                                <div>
                                    <Label htmlFor="header" className="text-sm font-semibold text-gray-700">
                                        Header
                                    </Label>
                                    <Input
                                        id="header"
                                        type="text"
                                        value={data.header}
                                        onChange={(e) => setData('header', e.target.value)}
                                        placeholder="Masukkan header informasi"
                                        className="mt-2"
                                        required
                                    />
                                    {errors.header && <p className="mt-1 text-sm text-red-600">{errors.header}</p>}
                                </div>

                                {/* Subheader */}
                                <div>
                                    <Label htmlFor="subheader" className="text-sm font-semibold text-gray-700">
                                        Subheader
                                    </Label>
                                    <Input
                                        id="subheader"
                                        type="text"
                                        value={data.subheader}
                                        onChange={(e) => setData('subheader', e.target.value)}
                                        placeholder="Masukkan subheader informasi"
                                        className="mt-2"
                                        required
                                    />
                                    {errors.subheader && <p className="mt-1 text-sm text-red-600">{errors.subheader}</p>}
                                </div>

                                {/* Content */}
                                <div>
                                    <Label htmlFor="content" className="text-sm font-semibold text-gray-700">
                                        Konten
                                    </Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Masukkan konten informasi"
                                        className="mt-2 min-h-[120px]"
                                        required
                                    />
                                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                </div>

                                {/* Info Text */}
                                <div className="rounded-lg bg-blue-50 p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        <p className="text-sm text-blue-700">
                                            {hasInformation && !editingInformation
                                                ? 'Hanya boleh ada satu data informasi'
                                                : 'Informasi akan ditampilkan di halaman about'}
                                        </p>
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
                                                {editingInformation ? 'Mengupdate...' : 'Menyimpan...'}
                                            </div>
                                        ) : (
                                            editingInformation ? 'Update Informasi' : 'Tambah Informasi'
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
