import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Play, ShoppingBag, Star, Users, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

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
        badge: 'SIAP PAKAI'
    },
    {
        id: 2,
        title: 'Jaring Ikan Siap Pakai',
        price: 'Rp 65.000',
        image: '/assets/images/jaring-2.jpg',
        rating: 4.9,
        sold: 89,
        badge: 'SIAP PAKAI'
    },
    {
        id: 3,
        title: 'Jaring Ikan Siap Pakai',
        price: 'Rp 75.000',
        image: '/assets/images/jaring-3.jpg',
        rating: 4.7,
        sold: 156,
        badge: 'SIAP PAKAI'
    }
];

const ecommercePartners = [
    {
        name: 'Shopee',
        logo: '/assets/images/shopee-logo.png',
        color: 'bg-orange-500',
        url: 'https://shopee.co.id'
    },
    {
        name: 'TikTok',
        logo: '/assets/images/tiktok-logo.png',
        color: 'bg-black',
        url: 'https://tiktok.com'
    },
    {
        name: 'Tokopedia',
        logo: '/assets/images/tokopedia-logo.png',
        color: 'bg-green-500',
        url: 'https://tokopedia.com'
    }
];

export default function Dashboard() {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* Hero Section */}
            <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                    style={{
                        backgroundImage: "url('/assets/images/bg-hero.png')"
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                    <div className="text-center text-white max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-6 leading-tight">
                            Selamat Datang di
                            <span className="block text-blue-300">Jaring Wan</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            Menyediakan berbagai jenis jaring ikan berkualitas tinggi untuk kebutuhan nelayan profesional.
                            Dari tradisi ke modernitas, kami hadir untuk mendukung kehidupan maritim Indonesia.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                                Jelajahi Produk
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                                Tentang Kami
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
                            JARING IKAN SIAP PAKAI
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Koleksi jaring ikan berkualitas tinggi yang telah terbukti ketahanannya.
                            Dibuat dengan bahan premium untuk hasil tangkapan maksimal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                className="group cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-0 overflow-hidden"
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div className="relative overflow-hidden">
                                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                        <PlaceholderPattern className="w-full h-full stroke-blue-300/30" />
                                    </div>
                                    <Badge className="absolute top-3 left-3 bg-blue-600 text-white font-semibold">
                                        {product.badge}
                                    </Badge>
                                    <div className={`absolute inset-0 bg-blue-600/80 flex items-center justify-center transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                                            Lihat Detail
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                                        {product.title}
                                    </CardTitle>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600">{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{product.sold} terjual</span>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            <ShoppingBag className="w-4 h-4 mr-1" />
                                            Beli
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold">
                            Lihat Semua Produk
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-6">
                                JARING IKAN TIMAH
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Dengan pengalaman lebih dari 20 tahun, kami telah menjadi partner terpercaya
                                para nelayan Indonesia. Jaring ikan timah berkualitas tinggi dengan daya tahan
                                maksimal untuk berbagai kondisi laut.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Users className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Dipercaya 1000+ Nelayan</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Star className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Kualitas Premium Terjamin</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Melayani Seluruh Indonesia</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden">
                                <PlaceholderPattern className="w-full h-full stroke-blue-300/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                            TEMAN SETIA PARA NELAYAN
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Saksikan bagaimana produk kami telah membantu meningkatkan hasil tangkapan
                            dan kehidupan para nelayan di seluruh Indonesia.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden relative group cursor-pointer">
                            <PlaceholderPattern className="w-full h-full stroke-gray-600/30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold">
                            Tonton Video
                        </Button>
                    </div>
                </div>
            </section>

            {/* E-commerce Partners */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
                            E-COMMERCE
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Temukan produk kami di berbagai platform e-commerce terpercaya.
                            Belanja mudah, cepat, dan aman.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ecommercePartners.map((partner, index) => (
                            <a
                                key={index}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <Card className="h-48 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-0 overflow-hidden">
                                    <CardContent className={`${partner.color} h-full flex items-center justify-center p-8 relative`}>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <PlaceholderPattern className="w-10 h-10 stroke-gray-400" />
                                            </div>
                                            <h3 className="text-white font-bold text-xl">{partner.name}</h3>
                                        </div>
                                        <div className="absolute bottom-4 right-4">
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                <ArrowRight className="w-4 h-4 text-white" />
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
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                        Siap Untuk Memulai?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik
                        untuk kebutuhan jaring ikan Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
                            <Phone className="mr-2 w-5 h-5" />
                            Hubungi Kami
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold">
                            <Mail className="mr-2 w-5 h-5" />
                            Kirim Email
                        </Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
