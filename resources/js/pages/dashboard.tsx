import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Mail, MapPin, Phone, Play, ShoppingBag, Star, Users } from 'lucide-react';
import { useState } from 'react';

interface ImageTab {
    id: string;
    category: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    homeImage?: ImageTab;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const products = [
    {
        id: 1,
        title: 'Jaring Ikan Siap Pakai',
        price: 'Rp 50.000',
        image: '/assets/images/jaring-1.jpg',
        rating: 4.8,
        sold: 127,
        badge: 'SIAP PAKAI',
    },
    {
        id: 2,
        title: 'Jaring Ikan Siap Pakai',
        price: 'Rp 65.000',
        image: '/assets/images/jaring-2.jpg',
        rating: 4.9,
        sold: 89,
        badge: 'SIAP PAKAI',
    },
    {
        id: 3,
        title: 'Jaring Ikan Siap Pakai',
        price: 'Rp 75.000',
        image: '/assets/images/jaring-3.jpg',
        rating: 4.7,
        sold: 156,
        badge: 'SIAP PAKAI',
    },
];

const ecommercePartners = [
    {
        name: 'Shopee',
        logo: '/assets/images/shopee-logo.png',
        color: 'bg-orange-500',
        url: 'https://shopee.co.id',
    },
    {
        name: 'TikTok',
        logo: '/assets/images/tiktok-logo.png',
        color: 'bg-black',
        url: 'https://tiktok.com',
    },
    {
        name: 'Tokopedia',
        logo: '/assets/images/tokopedia-logo.png',
        color: 'bg-green-500',
        url: 'https://tokopedia.com',
    },
];

export default function Dashboard({ homeImage }: Props) {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

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
                                className="transform rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
                            >
                                Jelajahi Produk
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-white px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-blue-900"
                            >
                                Tentang Kami
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

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                className="group transform cursor-pointer overflow-hidden border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div className="relative overflow-hidden">
                                    <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                                        <PlaceholderPattern className="h-full w-full stroke-blue-300/30" />
                                    </div>
                                    <Badge className="absolute top-3 left-3 bg-blue-600 font-semibold text-white">{product.badge}</Badge>
                                    <div
                                        className={`absolute inset-0 flex items-center justify-center bg-blue-600/80 transition-opacity duration-300 ${
                                            hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <Button size="lg" className="bg-white font-semibold text-blue-600 hover:bg-gray-100">
                                            Lihat Detail
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <CardTitle className="mb-2 text-lg font-semibold text-gray-900">{product.title}</CardTitle>
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600">{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{product.sold} terjual</span>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            <ShoppingBag className="mr-1 h-4 w-4" />
                                            Beli
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                        >
                            Lihat Semua Produk
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="font-montserrat mb-6 text-3xl font-bold text-gray-900 md:text-4xl">JARING IKAN TIMAH</h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-600">
                                Dengan pengalaman lebih dari 20 tahun, kami telah menjadi partner terpercaya para nelayan Indonesia. Jaring ikan timah
                                berkualitas tinggi dengan daya tahan maksimal untuk berbagai kondisi laut.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                        <Users className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Dipercaya 1000+ Nelayan</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                        <Star className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Kualitas Premium Terjamin</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Melayani Seluruh Indonesia</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-blue-200">
                                <PlaceholderPattern className="h-full w-full stroke-blue-300/30" />
                            </div>
                        </div>
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
                        <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-700">
                            <PlaceholderPattern className="h-full w-full stroke-gray-600/30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
                                    <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Button size="lg" className="rounded-full bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700">
                            Tonton Video
                        </Button>
                    </div>
                </div>
            </section>

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
                            <Link key={index} href={partner.url} target="_blank" className="group">
                                <Card className="h-48 transform cursor-pointer overflow-hidden border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                    <CardContent className={`${partner.color} relative flex h-full items-center justify-center p-8`}>
                                        <div className="text-center">
                                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white transition-transform duration-300 group-hover:scale-110">
                                                <PlaceholderPattern className="h-10 w-10 stroke-gray-400" />
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
                        <Button size="lg" className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100">
                            <Phone className="mr-2 h-5 w-5" />
                            Hubungi Kami
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full border-white px-8 py-3 font-semibold text-white hover:bg-white hover:text-blue-600"
                        >
                            <Mail className="mr-2 h-5 w-5" />
                            Kirim Email
                        </Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
