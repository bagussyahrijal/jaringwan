import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/layouts/app-layout';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  category: string;
  description: string;
}

export default function ProductPage() {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

    const categories = ['Semua', 'Jaring Ikan', 'Jaring Burung', 'Lain-lain'];

    const products: Product[] = [
        {
            id: 1,
            name: 'Jaring Ikan Siap Pakai',
            price: 60000,
            image: '/images/jaring-ikan-1.jpg',
            size: '20 Meter 3/4 Inch',
            category: 'Jaring Ikan',
            description: 'Jaring ikan berkualitas tinggi, siap pakai dengan ukuran standar'
        },
        {
            id: 2,
            name: 'Jaring Ikan Siap Pakai',
            price: 60000,
            image: '/images/jaring-ikan-2.jpg',
            size: '20 Meter 3/4 Inch',
            category: 'Jaring Ikan',
            description: 'Jaring ikan premium untuk hasil tangkapan maksimal'
        },
        {
            id: 3,
            name: 'Jaring Ikan Siap Pakai',
            price: 60000,
            image: '/images/jaring-ikan-3.jpg',
            size: '20 Meter 3/4 Inch',
            category: 'Jaring Ikan',
            description: 'Jaring ikan tahan lama dengan material berkualitas'
        },
        {
            id: 4,
            name: 'Jaring Ikan Siap Pakai',
            price: 60000,
            image: '/images/jaring-ikan-4.jpg',
            size: '20 Meter 3/4 Inch',
            category: 'Jaring Ikan',
            description: 'Jaring ikan profesional untuk nelayan'
        },
        {
            id: 5,
            name: 'Jaring Ikan Siap Pakai',
            price: 60000,
            image: '/images/jaring-ikan-5.jpg',
            size: '20 Meter 3/4 Inch',
            category: 'Jaring Ikan',
            description: 'Jaring ikan dengan kualitas export'
        },
        {
            id: 6,
            name: 'Jaring Ikan Siap Pakai',
            price: 60000,
            image: '/images/jaring-ikan-6.jpg',
            size: '20 Meter 3/4 Inch',
            category: 'Jaring Ikan',
            description: 'Jaring ikan standar industri'
        }
    ];

    const filteredProducts = selectedCategory === 'Semua'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 ">
                {/* Hero Section */}
                <div className="relative h-64 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center "
                        style={{
                            backgroundImage: 'url("assets/images/bg-hero-product.jpg")'
                        }} />
                    <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                        <div className="text-white">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl font-bold mb-2"
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
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Categories */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-64 flex-shrink-0"
                        >
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${selectedCategory === category
                                                    ? 'bg-[#0123AA] text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
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
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        onHoverStart={() => setHoveredProduct(product.id)}
                                        onHoverEnd={() => setHoveredProduct(null)}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        {/* Product Header */}
                                        <div className="bg-[#0123AA] text-white p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium text-sm">JARING IKAN SIAP PAKAI</h4>
                                                    <p className="text-xs opacity-90">Siap Kirim dan Berkualitas</p>
                                                </div>
                                                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                                    <img src="/assets/images/logo-jaringwan.png" alt="Logo" className=" object-contain">
                                                    </img>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Product Image */}
                                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                                } } />
                                            {/* Premium Badge */}
                                            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                                                <span className="text-xs font-medium text-blue-600">PREMIUM</span>
                                            </div>
                                            {/* Quick View Button */}
                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                                                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-medium"
                                            >
                                                Lihat Detail
                                            </motion.button>
                                        </div>
                                        {/* Product Info */}
                                        <div className="p-4">
                                            <div className="bg-[#0123AA] text-white text-center py-2 px-4 rounded-lg mb-3">
                                                <span className="text-sm font-medium">HARTA • TAHTA • SAMUDRA</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                                            <p className="text-sm text-gray-600 mb-3">{product.size}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xl font-bold text-blue-600">
                                                    {formatPrice(product.price)}
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="bg-[#0123AA] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                                >
                                                    Beli Sekarang
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                            {/* Load More Button */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="text-center mt-12"
                            >
                                <button className="bg-[#0123AA] hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Muat Lebih Banyak Produk
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

