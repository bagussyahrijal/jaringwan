import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Mail, MapPin, Phone, Play, ShoppingBag, Star, Users, X } from 'lucide-react';
import { useState } from 'react';

interface ImageTab {
    id: string;
    category: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface GalleryItem {
    id: string;
    title: string;
    image: string | null;
    video: string | null;
    description: string;
    created_at: string;
    updated_at: string;
    type?: 'foto' | 'video';
    mediaUrl?: string;
    tags?: string[];
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
    homeImage?: ImageTab;
    products: Product[];
    categories: Category[];
    gallery: GalleryItem[]; // Add gallery to props
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const ecommercePartners = [
    {
        name: 'Shopee',
        logo: '/assets/images/platforms/shopee.png',
        color: 'bg-orange-500',
        url: 'https://shopee.co.id/jaring_wan?entryPoint=ShopBySearch&searchKeyword=jaringwan',
    },
    {
        name: 'TikTok',
        logo: '/assets/images/platforms/tiktok.png',
        color: 'bg-black',
        url: 'https://vt.tiktok.com/ZSDusyhfE/?page=Mall',
    },
    {
        name: 'Tokopedia',
        logo: '/assets/images/platforms/tokopedia.png',
        color: 'bg-green-500',
        url: 'https://www.tokopedia.com/jaringwan',
    },
];

export default function Dashboard({ homeImage, products, categories, gallery }: Props) {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);

    // Get featured video from gallery (first video with content)
    const featuredVideo = gallery?.find(item => item.video && item.video.trim() !== '') || null;

    // Format price helper function
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Helper function to get proper image/video URL
    const getMediaUrl = (mediaPath: string) => {
        if (!mediaPath) return undefined;
        if (mediaPath.startsWith('/storage/')) return mediaPath;
        if (mediaPath.startsWith('http')) return mediaPath;
        return `/storage/${mediaPath}`;
    };

    const openVideoModal = (video: GalleryItem) => {
        setSelectedVideo(video);
        setIsVideoModalOpen(true);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
        setIsVideoModalOpen(false);
    };

    // Helper function to get proper image URL
    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return undefined;

        // If it already starts with /storage/, return as is
        if (imagePath.startsWith('/storage/')) {
            return imagePath;
        }

        // If it starts with http, return as is (external URL)
        if (imagePath.startsWith('http')) {
            return imagePath;
        }

        // Otherwise, prepend /storage/
        return `/storage/${imagePath}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                    style={{
                        backgroundImage: homeImage?.image ? `url('/storage/${homeImage.image}')` : "url('/assets/images/bg-hero.png')",
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
                    <div className="mx-auto max-w-4xl text-center text-white">
                        <h1 className="font-montserrat mb-6 text-4xl leading-tight font-bold md:text-6xl">
                            Selamat Datang di
                            <span className="block text-blue-300">Jaring Wan</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
                            Menyediakan berbagai jenis jaring ikan berkualitas tinggi untuk kebutuhan nelayan profesional. Dari tradisi ke modernitas,
                            kami hadir untuk mendukung kehidupan maritim Indonesia.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                onClick={() => { window.location.href = '/product'; }}
                                className="transform rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:cursor-pointer"
                            >
                                Jelajahi Produk
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                    <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white">
                        <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white"></div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="font-montserrat mb-4 text-3xl font-bold text-gray-900 md:text-4xl">JARING IKAN SIAP PAKAI</h2>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Koleksi jaring ikan berkualitas tinggi yang telah terbukti ketahanannya. Dibuat dengan bahan premium untuk hasil tangkapan
                            maksimal.
                        </p>
                    </div>

                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {products.slice(0, 6).map((product) => (
                                <Card
                                    key={product.id}
                                    className="py-0 group transform cursor-pointer overflow-hidden border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    onMouseEnter={() => setHoveredProduct(product.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                >
                                    <div className="relative overflow-hidden">
                                        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                                            {product.image ? (
                                                <img
                                                    src={getImageUrl(product.image)}
                                                    alt={product.name || 'Product Image'}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : null}
                                            <PlaceholderPattern
                                                className={`placeholder-pattern h-full w-full stroke-blue-300/30 ${product.image ? 'hidden' : ''}`}
                                            />
                                        </div>

                                        {/* Category Badge */}
                                        <Badge className="absolute top-3 left-3 bg-blue-600 font-semibold text-white">
                                            {product.category?.name || 'Produk'}
                                        </Badge>

                                    </div>

                                    <CardContent className="p-6">
                                        <CardTitle className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                                            {product.name}
                                        </CardTitle>

                                        {product.description && (
                                            <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                                                {product.description}
                                            </p>
                                        )}

                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="text-2xl font-bold text-blue-600">
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                Stok: {product.stock}
                                            </span>
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer" onClick={() => { window.open(product.url_shop, '_blank'); }}>
                                                <ShoppingBag className="mr-1 h-4 w-4" />
                                                Beli
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="mb-4">
                                <PlaceholderPattern className="h-32 w-32 mx-auto stroke-gray-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Produk Tidak Tersedia</h3>
                            <p className="text-gray-500">Produk sedang dalam proses update. Silakan coba lagi nanti.</p>
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => { window.location.href = '/product'; }}
                            className="rounded-full border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
                        >
                            Lihat Semua Produk
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="bg-gray-900 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="font-montserrat mb-4 text-3xl font-bold md:text-4xl">TEMAN SETIA PARA NELAYAN</h2>
                        <p className="mx-auto max-w-2xl text-gray-300">
                            Saksikan bagaimana produk kami telah membantu meningkatkan hasil tangkapan dan kehidupan para nelayan di seluruh
                            Indonesia.
                        </p>
                    </div>

                    <div className="relative mx-auto max-w-4xl">
                        {featuredVideo ? (
                            <div
                                className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-700"
                                onClick={() => openVideoModal(featuredVideo)}
                            >
                                {/* Video Thumbnail */}
                                <video
                                    src={getMediaUrl(featuredVideo.video!)}
                                    className="h-full w-full object-cover"
                                    muted
                                    preload="metadata"
                                />

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
                                        <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
                                    </div>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />

                                {/* Video Title */}
                                {featuredVideo.title && (
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-lg font-semibold text-white mb-1">{featuredVideo.title}</h3>
                                        {featuredVideo.description && (
                                            <p className="text-sm text-gray-300 line-clamp-2">{featuredVideo.description}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-700">
                                <PlaceholderPattern className="h-full w-full stroke-gray-600/30" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110 mx-auto mb-4">
                                            <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
                                        </div>
                                        <p className="text-white/80 text-sm">Video akan segera hadir</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                            </div>
                        )}
                    </div>

                    <div className="mt-8 text-center">
                        {featuredVideo ? (
                            <Button
                                size="lg"
                                className=" rounded-full bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
                                onClick={() => openVideoModal(featuredVideo)}
                            >
                                Tonton Video
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                className=" hover:cursor-pointer rounded-full bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
                                onClick={() => { window.location.href = '/gallery'; }}
                            >
                                Lihat Galeri
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {isVideoModalOpen && selectedVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={closeVideoModal}
                >
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] bg-black rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeVideoModal}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Video Player */}
                        <video
                            src={getMediaUrl(selectedVideo.video!)}
                            controls
                            autoPlay
                            className="w-full h-auto max-h-[80vh]"
                        />

                        {/* Video Info */}
                        {(selectedVideo.title || selectedVideo.description) && (
                            <div className="p-6 bg-gray-900 text-white">
                                {selectedVideo.title && (
                                    <h3 className="text-xl font-bold mb-2">{selectedVideo.title}</h3>
                                )}
                                {selectedVideo.description && (
                                    <p className="text-gray-300">{selectedVideo.description}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* E-commerce Partners */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="font-montserrat mb-4 text-3xl font-bold text-gray-900 md:text-4xl">E-COMMERCE</h2>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Temukan produk kami di berbagai platform e-commerce terpercaya. Belanja mudah, cepat, dan aman.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {ecommercePartners.map((partner, index) => (
                            <a
                                key={index}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <Card className="h-48 transform cursor-pointer overflow-hidden border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gray-900">
                                    <CardContent className="relative flex h-full items-center justify-center p-8">
                                        <div className="text-center">
                                            <div className={`${partner.color} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl`}>
                                                <img src={partner.logo} alt={partner.name} className="h-10 w-10 object-contain" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{partner.name}</h3>
                                        </div>
                                        <div className="absolute right-4 bottom-4">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                                <ArrowRight className="h-4 w-4 text-white" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="bg-blue-600 py-16 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="font-montserrat mb-4 text-3xl font-bold md:text-4xl">Siap Untuk Memulai?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
                        Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik untuk kebutuhan jaring ikan Anda.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100 hover:cursor-pointer" onClick={() => { window.location.href = '/contact' }}>
                            <Phone className="mr-2 h-5 w-5" />
                            Hubungi Kami
                        </Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
