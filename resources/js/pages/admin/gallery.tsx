import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Edit, Image, Plus, Tag, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

interface GalleryItem {
    id: string;
    tag: string;
    gallery_id: string;
}

interface Gallery {
    id: string;
    title: string;
    image: string;
    video: string;
    description: string;
    created_at: string;
    updated_at: string;
    gallery_items: GalleryItem[];
}

interface Props {
    galleries: Gallery[];
}

declare const route: any;

export default function AdminGallery({ galleries }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewVideo, setPreviewVideo] = useState<string | null>(null);
    const [galleryItems, setGalleryItems] = useState<{ id?: string; tag: string }[]>([{ tag: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add custom loading state
    const [uploadError, setUploadError] = useState<string | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        video: null as File | null,
        gallery_items: [{ tag: '' }],
    });

    const openCreateModal = () => {
        reset();
        setEditingGallery(null);
        setPreviewImage(null);
        setPreviewVideo(null);
        setGalleryItems([{ tag: '' }]);
        setData('gallery_items', [{ tag: '' }]);
        setShowModal(true);
    };

    const openEditModal = (gallery: Gallery) => {
        setEditingGallery(gallery);
        const items = gallery.gallery_items.length > 0 ? gallery.gallery_items.map((item) => ({ id: item.id, tag: item.tag })) : [{ tag: '' }];
        setGalleryItems(items);
        setData({
            title: gallery.title,
            description: gallery.description,
            image: null,
            video: null,
            gallery_items: items,
        });
        // Only set preview URLs when media exists to avoid /storage/null requests
        setPreviewImage(gallery.image ? `/storage/${gallery.image}` : null);
        setPreviewVideo(gallery.video ? `/storage/${gallery.video}` : null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingGallery(null);
        setPreviewImage(null);
        setPreviewVideo(null);
        setGalleryItems([{ tag: '' }]);
        setUploadError(null); // Reset upload error
        reset();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setUploadError(null); // Reset error state

        if (file) {
            // Check file size (2MB = 2 * 1024 * 1024 bytes)
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes

            if (file.size > maxSize) {
                setUploadError(`Ukuran gambar terlalu besar. Maksimal 2MB, ukuran file Anda: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
                e.target.value = ''; // Clear the input
                return;
            }

            // Check file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setUploadError('Format gambar tidak didukung. Gunakan format JPEG, PNG, GIF, atau WebP.');
                e.target.value = ''; // Clear the input
                return;
            }

            setData('image', file);
            setData('video', null); // Clear video when image is selected
            setPreviewVideo(null);

            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setData('image', null);
            setPreviewImage(null);
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setUploadError(null); // Reset error state

        if (file) {
            // Check file size (10MB = 10 * 1024 * 1024 bytes)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes

            if (file.size > maxSize) {
                setUploadError(`Ukuran video terlalu besar. Maksimal 10MB, ukuran file Anda: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
                e.target.value = ''; // Clear the input
                return;
            }

            // Check file type
            const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/wmv'];
            if (!allowedTypes.includes(file.type)) {
                setUploadError('Format video tidak didukung. Gunakan format MP4, MOV, AVI, atau WMV.');
                e.target.value = ''; // Clear the input
                return;
            }

            setData('video', file);
            setData('image', null); // Clear image when video is selected
            setPreviewImage(null);

            // Create video preview
            const reader = new FileReader();
            reader.onload = () => setPreviewVideo(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setData('video', null);
            setPreviewVideo(null);
        }
    };

    const addGalleryItem = () => {
        const newItems = [...galleryItems, { tag: '' }];
        setGalleryItems(newItems);
        setData('gallery_items', newItems);
    };

    const removeGalleryItem = (index: number) => {
        if (galleryItems.length > 1) {
            const newItems = galleryItems.filter((_, i) => i !== index);
            setGalleryItems(newItems);
            setData('gallery_items', newItems);
        }
    };

    const updateGalleryItem = (index: number, tag: string) => {
        const newItems = [...galleryItems];
        newItems[index] = { ...newItems[index], tag };
        setGalleryItems(newItems);
        setData('gallery_items', newItems);
    };

    // Enhanced submit validation
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset upload error
        setUploadError(null);

        // Client-side validation: ensure at least one file is selected for new galleries
        if (!editingGallery && !data.image && !data.video) {
            setUploadError('Anda harus mengupload setidaknya satu file (gambar atau video).');
            return;
        }

        // Additional file size check before submission
        if (data.video && data.video.size > 10 * 1024 * 1024) {
            setUploadError(`Video terlalu besar (${(data.video.size / (1024 * 1024)).toFixed(2)}MB). Maksimal 10MB.`);
            return;
        }

        if (data.image && data.image.size > 2 * 1024 * 1024) {
            setUploadError(`Gambar terlalu besar (${(data.image.size / (1024 * 1024)).toFixed(2)}MB). Maksimal 2MB.`);
            return;
        }

        if (editingGallery) {
            // Use the form's put method for updates
            put(route('admin.gallery.update', editingGallery.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    console.log('Update errors:', errors);
                    if (errors.video) {
                        setUploadError(errors.video);
                    }
                    if (errors.image) {
                        setUploadError(errors.image);
                    }
                }
            });
        } else {
            // Use the form's post method for creates
            post(route('admin.gallery.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    console.log('Create errors:', errors);
                    if (errors.video) {
                        setUploadError(errors.video);
                    }
                    if (errors.image) {
                        setUploadError(errors.image);
                    }
                }
            });
        }
    };

    // Alternative approach using router with custom loading state
    const handleSubmitWithCustomLoading = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Client-side validation
        if (!editingGallery && !data.image && !data.video) {
            alert('Anda harus mengupload setidaknya satu file (gambar atau video).');
            setIsSubmitting(false);
            return;
        }

        if (editingGallery) {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('_method', 'PUT');

            if (data.image) formData.append('image', data.image);
            if (data.video) formData.append('video', data.video);

            // Add gallery items
            data.gallery_items.forEach((item, index) => {
                formData.append(`gallery_items[${index}][tag]`, item.tag);
                if ('id' in item && item.id) {
                    formData.append(`gallery_items[${index}][id]`, String(item.id));
                }
            });

            router.post(route('admin.gallery.update', editingGallery.id), formData, {
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
            formData.append('title', data.title);
            formData.append('description', data.description);

            if (data.image) formData.append('image', data.image);
            if (data.video) formData.append('video', data.video);

            // Add gallery items
            data.gallery_items.forEach((item, index) => {
                formData.append(`gallery_items[${index}][tag]`, item.tag);
            });

            router.post(route('admin.gallery.store'), formData, {
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
        if (confirm('Apakah Anda yakin ingin menghapus galeri ini?')) {
            setIsSubmitting(true);
            router.delete(route('admin.gallery.destroy', id), {
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

    // Helper function to format file size
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <AdminLayout>
            <Head title="Kelola Galeri" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri</h1>
                                <p className="text-gray-600">Kelola semua galeri foto dan video Anda</p>
                            </div>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600 hover:cursor-pointer">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Galeri
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Galleries Grid */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {galleries.map((gallery, index) => (
                            <motion.div
                                key={gallery.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Gallery Header */}
                                <div className="bg-[#0123AA] p-4 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-opacity-20 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                                                <Image className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">GALERI</h4>
                                                <p className="text-xs opacity-90">Media Gallery</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(gallery)}
                                                className="bg-opacity-20 hover:cursor-pointer hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors"
                                            >
                                                <Edit className="h-4 w-4 text-[#0123AA]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(gallery.id)}
                                                className="hover:cursor-pointer bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Gallery Image */}
                                <div className="relative aspect-video">
                                    {gallery.image ? (
                                        <img
                                            src={`/storage/${gallery.image}`}
                                            alt={gallery.title}
                                            className="h-full w-full object-cover"
                                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                e.currentTarget.src =
                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRDNEM0QzIi8+CjxwYXRoIGQ9Ik0xMjAgODBMMTUwIDExMEwxODAgODAiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==';
                                            }}
                                        />
                                    ) : gallery.video ? (
                                        <video src={`/storage/${gallery.video}`} className="h-full w-full object-cover" controls />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                            Tidak ada media
                                        </div>
                                    )}
                                </div>

                                {/* Gallery Content */}
                                <div className="p-6">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-800">{gallery.title}</h3>
                                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">{gallery.description}</p>

                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center justify-between">
                                            <span>ID:</span>
                                            <span className="font-medium">{gallery.id.slice(0, 8)}...</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Dibuat:</span>
                                            <span className="font-medium">{formatDate(gallery.created_at)}</span>
                                        </div>
                                    </div>

                                    {/* Gallery Items/Tags */}
                                    {gallery.gallery_items && gallery.gallery_items.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="mb-2 flex items-center gap-1 text-sm font-semibold text-gray-700">
                                                <Tag className="h-3 w-3" />
                                                Tags:
                                            </h4>
                                            <div className="flex flex-wrap gap-1">
                                                {gallery.gallery_items.map((item) => (
                                                    <span
                                                        key={item.id}
                                                        className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                                                    >
                                                        {item.tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {gallery.gallery_items.length === 0 && (
                                        <div className="mt-4 rounded-lg border-2 border-dashed border-gray-200 p-4 text-center">
                                            <p className="text-xs text-gray-500">Belum ada tag untuk galeri ini</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {galleries.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mb-4 text-6xl text-gray-400">🖼️</div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-600">Belum ada galeri</h3>
                            <p className="mb-6 text-gray-500">Mulai tambahkan galeri foto dan video Anda</p>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Galeri Pertama
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
                        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">{editingGallery ? 'Edit Galeri' : 'Tambah Galeri Baru'}</h2>
                                <button
                                    onClick={closeModal}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="space-y-6" onClick={(e) => e.stopPropagation()}>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        {/* Gallery Title */}
                                        <div>
                                            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                                                Judul Galeri
                                            </Label>
                                            <Input
                                                id="title"
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Masukkan judul galeri"
                                                className="mt-2"
                                                required
                                                autoFocus
                                            />
                                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                        </div>

                                        {/* Gallery Description */}
                                        <div>
                                            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                                                Deskripsi
                                            </Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Masukkan deskripsi galeri"
                                                rows={4}
                                                className="mt-2"
                                                required
                                            />
                                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                        </div>

                                        {/* Gallery Tags */}
                                        <div>
                                            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                <Tag className="h-4 w-4" />
                                                Tags Galeri
                                            </Label>
                                            <div className="mt-2 space-y-3">
                                                {galleryItems.map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            value={item.tag}
                                                            onChange={(e) => updateGalleryItem(index, e.target.value)}
                                                            placeholder="Masukkan tag"
                                                            className="flex-1"
                                                            required
                                                        />
                                                        {galleryItems.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => removeGalleryItem(index)}
                                                                className="px-3"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                                <Button type="button" variant="outline" size="sm" onClick={addGalleryItem} className="w-full">
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Tambah Tag
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        {/* Gallery Image */}
                                        <div>
                                            <Label htmlFor="image" className="text-sm font-semibold text-gray-700">
                                                Gambar Galeri {!editingGallery && '*'}
                                                <span className="text-xs text-gray-500 ml-2">(Maks. 2MB)</span>
                                            </Label>
                                            <input
                                                id="image"
                                                type="file"
                                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                onChange={handleImageChange}
                                                disabled={!!data.video}
                                                className={`mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 ${!!data.video ? 'cursor-not-allowed opacity-50' : ''}`}
                                                required={!editingGallery && !data.video}
                                            />

                                            {/* Image file info */}
                                            {data.image && (
                                                <div className="mt-2 text-xs text-gray-600">
                                                    <span className="font-medium">File terpilih:</span> {data.image.name}
                                                    <span className="ml-2 text-blue-600">({formatFileSize(data.image.size)})</span>
                                                </div>
                                            )}

                                            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                            {!!data.video && (
                                                <p className="mt-1 text-xs text-amber-600">Video sudah dipilih. Hapus video untuk memilih gambar.</p>
                                            )}

                                            {previewImage && (
                                                <div className="mt-4">
                                                    <img src={previewImage} alt="Preview" className="h-32 w-full rounded-lg object-cover" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Gallery Video */}
                                        <div>
                                            <Label htmlFor="video" className="text-sm font-semibold text-gray-700">
                                                Video Galeri {!editingGallery && '*'}
                                                <span className="text-xs text-gray-500 ml-2">(Maks. 10MB)</span>
                                            </Label>
                                            <input
                                                id="video"
                                                type="file"
                                                accept="video/mp4,video/mov,video/avi,video/wmv"
                                                onChange={handleVideoChange}
                                                disabled={!!data.image}
                                                className={`mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 ${!!data.image ? 'cursor-not-allowed opacity-50' : ''}`}
                                                required={!editingGallery && !data.image}
                                            />

                                            {/* Video file info */}
                                            {data.video && (
                                                <div className="mt-2 text-xs text-gray-600">
                                                    <span className="font-medium">File terpilih:</span> {data.video.name}
                                                    <span className="ml-2 text-blue-600">({formatFileSize(data.video.size)})</span>
                                                </div>
                                            )}

                                            {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
                                            {!!data.image && (
                                                <p className="mt-1 text-xs text-amber-600">Gambar sudah dipilih. Hapus gambar untuk memilih video.</p>
                                            )}

                                            {previewVideo && (
                                                <div className="mt-4">
                                                    <video src={previewVideo} controls className="h-32 w-full rounded-lg object-cover" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Upload Error Display */}
                                        {uploadError && (
                                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <X className="h-5 w-5 text-red-400" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm text-red-800">{uploadError}</p>
                                                    </div>
                                                    <div className="ml-auto pl-3">
                                                        <button
                                                            onClick={() => setUploadError(null)}
                                                            className="inline-flex text-red-400 hover:text-red-600"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Info Text */}
                                        <div className="rounded-lg bg-blue-50 p-4">
                                            <div className="flex items-start gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                                                <div className="text-sm text-blue-700">
                                                    <p className="font-medium mb-1">Persyaratan Upload:</p>
                                                    <ul className="list-disc list-inside space-y-1 text-xs">
                                                        <li>Pilih salah satu: gambar atau video</li>
                                                        <li>Gambar: Maksimal 2MB (JPEG, PNG, JPG, GIF, WebP)</li>
                                                        <li>Video: Maksimal 10MB (MP4, MOV, AVI, WMV)</li>
                                                        <li>Pastikan koneksi internet stabil untuk upload file besar</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
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
                                                {editingGallery ? 'Mengupdate...' : 'Menyimpan...'}
                                            </div>
                                        ) : (
                                            editingGallery ? 'Update Galeri' : 'Tambah Galeri'
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
