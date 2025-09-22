import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    url_shop: string;
    category_id: number;
    category: Category;
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
    aboutImage?: ImageTab;
}

export default function ProductPage({ products, categories, aboutImage }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

    // Create categories array with "Semua" option
    const categoryOptions = ['Semua', ...categories.map((cat) => cat.name)];

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'Semua' ? products : products.filter((product) => product.category.name === selectedCategory);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AppLayout>
            <Head title="Produk" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-64 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: aboutImage?.image ? `url('/storage/${aboutImage.image}')` : 'url("assets/images/bg-hero-product.jpg")',
                        }}
                    />
                    <div className="relative z-10 container mx-auto flex h-full items-center px-4">
                        <div className="text-white">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-2 text-4xl font-bold"
                            >
                                Produk Jaring Berkualitas
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl opacity-90"
                            >
                                Solusi terbaik untuk kebutuhan jaring Anda
                            </motion.p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto py-8">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Sidebar Categories */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex-shrink-0 lg:w-64"
                        >
                            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">Kategori</h3>
                                <div className="space-y-2">
                                    {categoryOptions.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full rounded-lg px-4 py-2 text-left transition-all duration-200 ${selectedCategory === category
                                                ? 'bg-[#0123AA] text-white shadow-md'
                                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                        {/* Product Grid */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                            >
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        onHoverStart={() => setHoveredProduct(product.id)}
                                        onHoverEnd={() => setHoveredProduct(null)}
                                        className="transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-80 overflow-hidden bg-gray-100">
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                                }}
                                            />
                                            {/* Quick View Button */}
                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                                                className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black font-medium text-white"
                                            >
                                                Lihat Detail
                                            </motion.button>
                                        </div>
                                        {/* Product Info */}
                                        <div className="p-4">
                                            <h3 className="mb-1 font-semibold text-gray-800">{product.name}</h3>
                                            <p className="mb-3 text-sm text-gray-600">{product.category.name}</p>
                                            <p className="mb-3 line-clamp-2 text-xs text-gray-500">{product.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</div>
                                                <motion.button
                                                    onClick={() => window.open(product.url_shop, '_blank')}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="rounded-lg bg-[#0123AA] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600 hover:cursor-pointer"
                                                >
                                                    Beli Sekarang
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                            {/* Load More Button */}
                            {filteredProducts.length >= 6 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="mt-12 text-center"
                                >
                                    <button className="transform rounded-lg bg-[#0123AA] px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700">
                                        Muat Lebih Banyak Produk
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
