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
    const [showAll, setShowAll] = useState(false); // Add state for showing all products
    const [productsToShow, setProductsToShow] = useState(6); // Track number of products to show

    // Create categories array with "Semua" option
    const categoryOptions = ['Semua', ...categories.map((cat) => cat.name)];

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'Semua' ? products : products.filter((product) => product.category.name === selectedCategory);

    // Get products to display based on showAll state
    const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, productsToShow);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleLoadMore = () => {
        setShowAll(true);
    };

    const handleShowLess = () => {
        setShowAll(false);
        setProductsToShow(6);
    };

    // Reset showAll when category changes
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setShowAll(false);
        setProductsToShow(6);
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
                                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                    <svg className="mr-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Kategori
                                </h3>
                                <div className="space-y-2">
                                    {categoryOptions.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => handleCategoryChange(category)}
                                            className={`w-full rounded-lg px-4 py-2 text-left transition-all duration-200 ${
                                                selectedCategory === category
                                                    ? 'bg-[#0123AA] text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                {/* Product Stats */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="text-sm text-gray-600">
                                        <div className="flex justify-between mb-2">
                                            <span>Total Produk:</span>
                                            <span className="font-semibold">{filteredProducts.length}</span>
                                        </div>
                                    </div>
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
                                {displayedProducts.length > 0 ? (
                                    displayedProducts.map((product, index) => (
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
                                                    <div className="text-center">
                                                        <svg className="mx-auto mb-2 h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Lihat Detail
                                                    </div>
                                                </motion.button>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-4">
                                                <h3 className="mb-1 line-clamp-1 font-semibold text-gray-800">{product.name}</h3>
                                                <p className="mb-3 text-sm text-gray-600">{product.category.name}</p>
                                                <p className="mb-3 line-clamp-2 text-xs text-gray-500">{product.description}</p>

                                                {/* Stock Status */}
                                                <div className="mb-3">
                                                    {product.stock > 0 ? (
                                                        <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                            Stok: {product.stock}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                                            Stok Habis
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</div>
                                                    <motion.button
                                                        onClick={() => window.open(product.url_shop, '_blank')}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        disabled={product.stock === 0}
                                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                                            product.stock > 0
                                                                ? 'bg-[#0123AA] text-white hover:bg-blue-600 hover:cursor-pointer'
                                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {product.stock > 0 ? 'Beli Sekarang' : 'Stok Habis'}
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center">
                                        <div className="mb-4 text-gray-400">
                                            <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-600">Belum ada produk</h3>
                                        <p className="text-gray-500">
                                            Produk untuk kategori "{selectedCategory}" belum tersedia.
                                        </p>
                                    </div>
                                )}
                            </motion.div>

                            {/* Load More / Show Less Button */}
                            {filteredProducts.length > 6 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="mt-12 text-center"
                                >
                                    {!showAll ? (
                                        <button
                                            onClick={handleLoadMore}
                                            className="transform rounded-lg bg-[#0123AA] px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
                                        >
                                            Muat Lebih Banyak Produk
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleShowLess}
                                            className="transform rounded-lg bg-gray-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700"
                                        >
                                            Tampilkan Lebih Sedikit
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
