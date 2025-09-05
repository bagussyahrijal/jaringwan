import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/layouts/app-layout';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  type: 'foto' | 'video';
  description: string;
  videoUrl?: string;
  tags: string[];
}

export default function GalleryPage() {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const categories = ['Semua', 'Foto', 'Video'];

    const galleryItems: GalleryItem[] = [
        {
            id: 1,
            title: 'Proses Pembuatan Jaring Ikan',
            image: '/images/gallery/foto-1.jpg',
            type: 'foto',
            description: 'Dokumentasi proses pembuatan jaring ikan berkualitas tinggi',
            tags: ['produksi', 'jaring', 'kualitas']
        },
        {
            id: 2,
            title: 'Tim Ahli Jaring Professional',
            image: '/images/gallery/foto-2.jpg',
            type: 'foto',
            description: 'Tim ahli yang berpengalaman dalam pembuatan jaring',
            tags: ['tim', 'ahli', 'professional']
        },
        {
            id: 3,
            title: 'Video Tutorial Pemasangan Jaring',
            image: '/images/gallery/video-1.jpg',
            type: 'video',
            description: 'Tutorial lengkap cara pemasangan jaring ikan yang benar',
            videoUrl: '/videos/tutorial-pemasangan.mp4',
            tags: ['tutorial', 'pemasangan', 'edukasi']
        },
        {
            id: 4,
            title: 'Kualitas Material Jaring',
            image: '/images/gallery/foto-3.jpg',
            type: 'foto',
            description: 'Detail material berkualitas tinggi yang digunakan',
            tags: ['material', 'kualitas', 'detail']
        },
        {
            id: 5,
            title: 'Proses Quality Control',
            image: '/images/gallery/video-2.jpg',
            type: 'video',
            description: 'Video proses kontrol kualitas sebelum pengiriman',
            videoUrl: '/videos/quality-control.mp4',
            tags: ['qc', 'kualitas', 'standar']
        },
        {
            id: 6,
            title: 'Hasil Jaring Siap Kirim',
            image: '/images/gallery/foto-4.jpg',
            type: 'foto',
            description: 'Jaring ikan berkualitas siap untuk dikirim ke pelanggan',
            tags: ['produk', 'siap', 'kirim']
        }
    ];

    const filteredItems = galleryItems.filter(item => {
        const categoryMatch = selectedCategory === 'Semua' ||
            (selectedCategory === 'Foto' && item.type === 'foto') ||
            (selectedCategory === 'Video' && item.type === 'video');

        return categoryMatch;
    });

    const openModal = (item: GalleryItem) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-64 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url("assets/images/bg-hero-product.jpg")'
                        }}
                    />
                    <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                        <div className="text-white">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl font-bold mb-2"
                            >
                                Galeri Foto & Video
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl opacity-90"
                            >
                                Dokumentasi proses dan hasil karya berkualitas kami
                            </motion.p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-64 flex-shrink-0"
                        >
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                {/* Media Type Filter */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                        Media
                                    </h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
                                                    selectedCategory === category
                                                        ? 'bg-[#0123AA] text-white shadow-md'
                                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                                }`}
                                            >
                                                {category === 'Foto' && (
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {category === 'Video' && (
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {category === 'Semua' && (
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Gallery Grid */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        onHoverStart={() => setHoveredItem(item.id)}
                                        onHoverEnd={() => setHoveredItem(null)}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                                        onClick={() => openModal(item)}
                                    >

                                        {/* Item Image */}
                                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                                }}
                                            />

                                            {/* Type Badge */}
                                            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                                                <span className={`text-xs font-medium ${item.type === 'foto' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {item.type === 'foto' ? 'FOTO' : 'VIDEO'}
                                                </span>
                                            </div>

                                            {/* Video Play Button */}
                                            {item.type === 'video' && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="bg-black bg-opacity-50 rounded-full p-4">
                                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Hover Overlay */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                                                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-medium"
                                            >
                                                <div className="text-center">
                                                    <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Lihat Detail
                                                </div>
                                            </motion.div>
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
                                <button className="bg-[#0123AA] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Muat Lebih Banyak Media
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedItem.title}</h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="aspect-video mb-4">
                                    {selectedItem.type === 'foto' ? (
                                        <img
                                            src={selectedItem.image}
                                            alt={selectedItem.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <video
                                            src={selectedItem.videoUrl}
                                            controls
                                            className="w-full h-full rounded-lg"
                                            poster={selectedItem.image}
                                        >
                                            Browser Anda tidak mendukung video.
                                        </video>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Deskripsi</h3>
                                        <p className="text-gray-600">{selectedItem.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedItem.tags.map((tag, index) => (
                                                <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </AppLayout>
    );
}
