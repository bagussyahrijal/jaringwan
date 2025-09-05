import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Users,
    Star,
    MapPin,
    ShoppingBag,
    TrendingUp,
    Award,
    Heart,
    CheckCircle,
    Target,
    Anchor,
    Fish
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tentang Kami',
        href: '/tentang-kami',
    },
];

const ecommerceStats = [
    {
        platform: 'Shopee',
        description: 'Terdepan sebagai jaring ikan, jaring burung, dan perlengkapan terbaik dengan harga terjangkau di toko nelyan kami.',
        color: 'bg-orange-500',
        icon: '🛍️',
        sales: '1000+ Produk Terjual'
    },
    {
        platform: 'Tokopedia',
        description: 'Berkualitas menjual jaring ikan, jaring burung, serta perlengkapan lainnya dengan pilihan lengkap dan kualitas terjamin.',
        color: 'bg-green-500',
        icon: '🏪',
        sales: '500+ Review Positif'
    },
    {
        platform: 'TikTok Shop',
        description: 'Mencari penjualan spesial dan promo menarik untuk setiap pembelian jaring ikan, jaring burung dan perlengkapan lainnya.',
        color: 'bg-black',
        icon: '🎵',
        sales: '2000+ Followers'
    }
];

const features = [
    {
        icon: ShoppingBag,
        title: 'Tersedia di berbagai E-commerce',
        subtitle: 'Shopee, Tiktok shop, Tokopedia',
        description: 'Mudah diakses melalui platform favorit Anda'
    },
    {
        icon: TrendingUp,
        title: 'Harga Terjangkau',
        subtitle: 'Cocok untuk kebutuhan harian nelayan usaha',
        description: 'Kualitas premium dengan harga yang bersahabat'
    },
    {
        icon: Award,
        title: 'Kualitas Terjamin',
        subtitle: 'Jaring ikan dan bahan kuat & tahan lama',
        description: 'Bahan berkualitas tinggi dan tahan cuaca ekstrem'
    }
];

const companyValues = [
    {
        title: 'Kualitas Terjamin',
        description: 'Setiap produk melalui kontrol kualitas ketat untuk memastikan daya tahan dan ketahanan maksimal.',
        icon: CheckCircle,
        color: 'text-blue-600'
    },
    {
        title: 'Harga Terjangkau',
        description: 'Memberikan nilai terbaik dengan harga yang kompetitif untuk semua kalangan nelayan.',
        icon: Target,
        color: 'text-green-600'
    },
    {
        title: 'Pengalaman 20+ Tahun',
        description: 'Dipercaya ribuan nelayan Indonesia selama lebih dari dua dekade dalam industri perikanan.',
        icon: Anchor,
        color: 'text-purple-600'
    },
    {
        title: 'Melayani Seluruh Indonesia',
        description: 'Jaringan distribusi yang luas menjangkau seluruh nusantara dengan layanan terpercaya.',
        icon: MapPin,
        color: 'text-orange-600'
    }
];

export default function About() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tentang Kami" />

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
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                    <div className="text-center text-white max-w-5xl mx-auto">
                        <Badge className="mb-6 bg-blue-600/20 text-blue-200 border-blue-400 px-4 py-2 text-sm font-medium">
                            Solusi Jaring Terpercaya
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-8 leading-tight">
                            <span className="text-blue-300">JARINGWAN</span> adalah toko online terpercaya
                        </h1>

                        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
                            yang menyediakan berbagai jenis jaring berkualitas untuk kebutuhan perikanan, penangkapan, maupun keperluan sehari-hari.
                            Dengan produk yang telah teruji dan telah dipilih, kami berkomitmen memberikan pelayanan terbaik agar pelanggan mendapatkan
                            solusi jaring yang tepat dengan mudah, cepat, dan aman.
                        </p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Mission Section with Background Image */}
            <section className="relative py-24 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/assets/images/bg-hero.png')"
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                    <p className="text-lg md:text-xl leading-relaxed mb-8 font-light">
                        <span className="font-semibold text-blue-300">sedikit kenalan yuk dengan Jaring Wan</span><br />
                        Jaring WAN hadir untuk memudahkan anda dalam berbagai kebutuhan - baik untuk
                        <span className="font-semibold text-yellow-300"> perikanan atau hobi burung</span>,
                        maupun memenuhi kegunaan lainnya dari berbagai
                        <span className="font-semibold text-green-300"> jenis jaring yang kuat namun tidak terlalu berat</span>
                    </p>

                    <div className="text-center mt-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
                            SETAHUN BERSAMA<br />
                            <span className="text-blue-300">JARINGWAN</span>
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Terima kasih telah nelayan kepercayaan tahun dengan jaring berkualitas yang siap pakai dan
                            mendukung kebutuhan sehari-hari Anda.
                        </p>
                        <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            Lihat Produk
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* E-commerce Platforms Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
                            Tersedia di berbagai E-Commerce
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Temukan produk berkualitas kami di platform terpercaya dengan layanan terbaik
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ecommerceStats.map((platform, index) => (
                            <Card
                                key={index}
                                className="group cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-0 overflow-hidden"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <CardContent className="p-0">
                                    {/* Image Placeholder */}
                                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                                        <PlaceholderPattern className="w-full h-full stroke-gray-300/30" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-4xl">{platform.icon}</div>
                                        </div>
                                        <div className={`absolute inset-0 ${platform.color}/90 flex items-center justify-center transition-opacity duration-300 ${
                                            hoveredCard === index ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                            <div className="text-center text-white p-4">
                                                <h3 className="text-2xl font-bold mb-2">{platform.platform}</h3>
                                                <Badge variant="secondary" className="bg-white/20 text-white">
                                                    {platform.sales}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{platform.platform}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {platform.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <Badge className={`${platform.color} text-white`}>
                                                {platform.sales}
                                            </Badge>
                                            <Button size="sm" variant="outline" className="group-hover:bg-gray-900 group-hover:text-white transition-colors">
                                                Lihat
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="text-center group cursor-pointer"
                                onMouseEnter={() => setHoveredFeature(index)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div className={`w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    hoveredFeature === index ? 'bg-blue-600 scale-110' : ''
                                }`}>
                                    <feature.icon className={`w-10 h-10 transition-colors duration-300 ${
                                        hoveredFeature === index ? 'text-white' : 'text-blue-600'
                                    }`} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-blue-600 font-medium mb-3">{feature.subtitle}</p>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Values Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
                            Mengapa Memilih Kami?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Komitmen kami terhadap kualitas dan kepuasan pelanggan menjadikan JARINGWAN
                            pilihan utama para nelayan Indonesia
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {companyValues.map((value, index) => (
                            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-600">
                                <div className="flex items-start space-x-4">
                                    <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <value.icon className={`w-6 h-6 ${value.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="group cursor-pointer">
                            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
                            <div className="text-blue-200">Nelayan Terpercaya</div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">20+</div>
                            <div className="text-blue-200">Tahun Pengalaman</div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                            <div className="text-blue-200">Jenis Produk</div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
                            <div className="text-blue-200">Kepuasan Pelanggan</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Fish className="w-16 h-16 mx-auto mb-6 text-blue-400" />
                    <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                        Bergabunglah dengan Komunitas Nelayan
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Jadilah bagian dari ribuan nelayan yang telah merasakan kualitas dan kepercayaan
                        produk JARINGWAN selama bertahun-tahun.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            <Heart className="mr-2 w-5 h-5" />
                            Mulai Berbelanja
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                            Hubungi Kami
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
