import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { motion } from 'framer-motion';
import { Edit, Plus, Trash2, Upload, X } from 'lucide-react';
import React, { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';

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
}

interface Props {
    products: Product[];
    categories: Category[];
}

export default function AdminProduct({ products, categories }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add custom loading state

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image: null as File | null,
        url_shop: '',
        _method: 'post', // Add method field
    });

    const openCreateModal = () => {
        reset();
        setEditingProduct(null);
        setPreviewImage(null);
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            stock: product.stock.toString(),
            category_id: product.category_id.toString(),
            image: null,
            url_shop: product.url_shop || '',
        });
        setPreviewImage(`/storage/${product.image}`);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
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
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true); // Set custom loading state

        if (editingProduct) {
            // Update existing product
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('stock', data.stock);
            formData.append('category_id', data.category_id);
            formData.append('url_shop', data.url_shop);
            formData.append('_method', 'PUT');

            if (data.image) {
                formData.append('image', data.image);
            }

            router.post(route('admin.product.update', editingProduct.id), formData, {
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
            // Create new product - use the form's post method to get automatic processing state
            post(route('admin.product.store'), {
                forceFormData: true,
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

    // Alternative approach: Use form methods consistently
    const handleSubmitAlternative = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProduct) {
            // For updates, we need to set the method
            setData('_method', 'PUT');

            // Use the form's post method with method spoofing
            post(route('admin.product.update', editingProduct.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        } else {
            // For creates, use the form's post method
            post(route('admin.product.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(`/admin/product/${id}`);
        }
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
            <Head title="Kelola Produk" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Kelola Produk</h1>
                                <p className="text-gray-600">Kelola semua produk jaring Anda</p>
                            </div>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600 hover:cursor-pointer">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Produk
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Product Header */}
                                <div className="bg-[#0123AA] p-4 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-medium">PRODUK JARING</h4>
                                            <p className="text-xs opacity-90">{product.category.name}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(product)}
                                                className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors"
                                            >
                                                <Edit className="h-4 w-4 text-[#0123AA] hover:cursor-pointer" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="bg-opacity-20  hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 text-white hover:cursor-pointer" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                            e.currentTarget.src =
                                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                        }}
                                    />
                                    {/* Stock Badge */}
                                    <div className="bg-opacity-90 absolute top-4 right-4 rounded-full bg-white px-3 py-1">
                                        <span className="text-xs font-medium text-blue-600">Stok: {product.stock}</span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="mb-2 line-clamp-2 font-semibold text-gray-800">{product.name}</h3>
                                    <p className="mb-3 line-clamp-3 text-sm text-gray-600">{product.description}</p>
                                    <div className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mb-4 text-6xl text-gray-400">📦</div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-600">Belum ada produk</h3>
                            <p className="mb-6 text-gray-500">Mulai tambahkan produk jaring Anda</p>
                            <Button onClick={openCreateModal} className="bg-[#0123AA] text-white hover:bg-blue-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Produk Pertama
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
                                <h2 className="text-2xl font-bold text-gray-900">{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                                <button
                                    onClick={closeModal}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 hover:cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="space-y-6" onClick={(e) => e.stopPropagation()}>
                                {/* Image Upload */}
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">Gambar Produk</Label>
                                    <div className="mt-2">
                                        <div className="relative rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-400">
                                            {previewImage ? (
                                                <div className="relative">
                                                    <img src={previewImage} alt="Preview" className="mx-auto h-48 w-48 rounded-lg object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPreviewImage(null);
                                                            setData('image', null);
                                                        }}
                                                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                    <p className="mt-2 text-sm text-gray-600">Klik untuk upload atau drag & drop</p>
                                                    <p className="text-xs text-gray-500">PNG, JPG hingga 2MB</p>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                                onClick={(e) => e.stopPropagation()}
                                                required
                                            />
                                        </div>
                                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                    </div>
                                </div>

                                {/* Product Name */}
                                <div>
                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                        Nama Produk
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama produk"
                                        className="mt-2"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Category */}
                                <div>
                                    <Label htmlFor="category_id" className="text-sm font-semibold text-gray-700">
                                        Kategori
                                    </Label>
                                    <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
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
                                        placeholder="Masukkan deskripsi produk"
                                        rows={4}
                                        className="mt-2"
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Price and Stock */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                                            Harga (IDR)
                                        </Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            className="mt-2"
                                            required
                                        />
                                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="stock" className="text-sm font-semibold text-gray-700">
                                            Stok
                                        </Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            value={data.stock}
                                            onChange={(e) => setData('stock', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            className="mt-2"
                                            required
                                        />
                                        {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                                    </div>
                                </div>
                                {/* URL Shop */}
                                <div>
                                    <Label htmlFor="url_shop" className="text-sm font-semibold text-gray-700">
                                        URL Toko (opsional)
                                    </Label>
                                    <Input
                                        id="url_shop"
                                        type="url"
                                        value={data.url_shop}
                                        onChange={(e) => setData('url_shop', e.target.value)}
                                        placeholder="https://example.com"
                                        className="mt-2"
                                    />
                                    {errors.url_shop && <p className="mt-1 text-sm text-red-600">{errors.url_shop}</p>}
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
                                        disabled={processing || isSubmitting} // Use both states
                                        className="flex-1 bg-[#0123AA] text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {(processing || isSubmitting) ? (
                                            <div className="flex items-center">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                {editingProduct ? 'Mengupdate...' : 'Menyimpan...'}
                                            </div>
                                        ) : (
                                            editingProduct ? 'Update Produk' : 'Tambah Produk'
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
