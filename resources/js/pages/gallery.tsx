import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface GalleryItemTag {
    id: string;
    tag: string;
    gallery_id: string;
}

interface GalleryItem {
    id: string;
    title: string;
    image: string | null;
    video: string | null;
    description: string;
    created_at: string;
    updated_at: string;
    gallery_items: GalleryItemTag[];
    // Computed properties
    type?: 'foto' | 'video';
    mediaUrl?: string;
    tags?: string[];
}

interface ImageTab {
    id: string;
    category: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    galleries: GalleryItem[];
    aboutImage?: ImageTab;
}

export default function GalleryPage({ galleries, aboutImage }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const categories = ['Semua', 'Foto', 'Video'];

    // Transform backend data to match frontend expectations
    const transformedGalleries = galleries.map((gallery) => ({
        ...gallery,
        type: gallery.image ? 'foto' : ('video' as 'foto' | 'video'),
        mediaUrl: gallery.image ? `/storage/${gallery.image}` : gallery.video ? `/storage/${gallery.video}` : '',
        tags: gallery.gallery_items.map((item) => item.tag),
    }));

    const filteredItems = transformedGalleries.filter((item) => {
        const categoryMatch =
            selectedCategory === 'Semua' ||
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
            <Head title="Galeri Foto & Video" />
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
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex-shrink-0 lg:w-64"
                        >
                            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-md">
                                {/* Media Type Filter */}
                                <div>
                                    <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                        <svg className="mr-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Media
                                    </h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`flex w-full items-center rounded-lg px-4 py-2 text-left transition-all duration-200 ${
                                                    selectedCategory === category
                                                        ? 'bg-[#0123AA] text-white shadow-md'
                                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                                }`}
                                            >
                                                {category === 'Foto' && (
                                                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                                {category === 'Video' && (
                                                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                                {category === 'Semua' && (
                                                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                            clipRule="evenodd"
                                                        />
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
                                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                            >
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            onHoverStart={() => setHoveredItem(item.id)}
                                            onHoverEnd={() => setHoveredItem(null)}
                                            className="transform cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                            onClick={() => openModal(item)}
                                        >
                                            {/* Item Image */}
                                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                                <img
                                                    src={
                                                        item.mediaUrl ||
                                                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4='
                                                    }
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                                    }}
                                                />

                                                {/* Type Badge */}
                                                <div className="bg-opacity-90 absolute top-4 right-4 rounded-full bg-white px-3 py-1">
                                                    <span
                                                        className={`text-xs font-medium ${item.type === 'foto' ? 'text-green-600' : 'text-red-600'}`}
                                                    >
                                                        {item.type === 'foto' ? 'FOTO' : 'VIDEO'}
                                                    </span>
                                                </div>

                                                {/* Video Play Button */}
                                                {item.type === 'video' && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="bg-opacity-50 rounded-full bg-black p-4">
                                                            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Hover Overlay */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                                                    className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black font-medium text-white"
                                                >
                                                    <div className="text-center">
                                                        <svg className="mx-auto mb-2 h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        Lihat Detail
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Item Content */}
                                            <div className="p-4">
                                                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-800">{item.title}</h3>
                                                <p className="mb-3 line-clamp-2 text-sm text-gray-600">{item.description}</p>

                                                {/* Tags */}
                                                {item.tags && item.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                                            <span
                                                                key={tagIndex}
                                                                className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {item.tags.length > 3 && (
                                                            <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                                +{item.tags.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center">
                                        <div className="mb-4 text-gray-400">
                                            <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-600">Belum ada galeri</h3>
                                        <p className="text-gray-500">Galeri {selectedCategory.toLowerCase()} belum tersedia.</p>
                                    </div>
                                )}
                            </motion.div>

                            {/* Load More Button */}
                            {filteredItems.length >= 6 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="mt-12 text-center"
                                >
                                    <button className="transform rounded-lg bg-[#0123AA] px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700">
                                        Muat Lebih Banyak Media
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal */}
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
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedItem.title}</h2>
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
                                    {selectedItem.type === 'foto' ? (
                                        <img
                                            src={selectedItem.mediaUrl}
                                            alt={selectedItem.title}
                                            className="h-full w-full rounded-lg object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                            }}
                                        />
                                    ) : (
                                        <video src={selectedItem.mediaUrl} controls className="h-full w-full rounded-lg">
                                            Browser Anda tidak mendukung video.
                                        </video>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">Deskripsi</h3>
                                        <p className="text-gray-600">{selectedItem.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedItem.tags &&
                                                selectedItem.tags.map((tag: string, index: number) => (
                                                    <span key={index} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
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
