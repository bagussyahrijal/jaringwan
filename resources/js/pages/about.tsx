import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Information, type OnlineShop } from '@/types';
import { Head } from '@inertiajs/react';
import { Anchor, ArrowRight, Award, CheckCircle, Fish, Heart, MapPin, ShoppingBag, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tentang Kami',
        href: '/tentang-kami',
    },
];

const features = [
    {
        icon: ShoppingBag,
        title: 'Tersedia di berbagai E-commerce',
        subtitle: 'Shopee, Tiktok shop, Tokopedia',
        description: 'Mudah diakses melalui platform favorit Anda',
    },
    {
        icon: TrendingUp,
        title: 'Harga Terjangkau',
        subtitle: 'Cocok untuk kebutuhan harian nelayan usaha',
        description: 'Kualitas premium dengan harga yang bersahabat',
    },
    {
        icon: Award,
        title: 'Kualitas Terjamin',
        subtitle: 'Jaring ikan dan bahan kuat & tahan lama',
        description: 'Bahan berkualitas tinggi dan tahan cuaca ekstrem',
    },
];

const companyValues = [
    {
        title: 'Kualitas Terjamin',
        description: 'Setiap produk melalui kontrol kualitas ketat untuk memastikan daya tahan dan ketahanan maksimal.',
        icon: CheckCircle,
        color: 'text-blue-600',
    },
    {
        title: 'Harga Terjangkau',
        description: 'Memberikan nilai terbaik dengan harga yang kompetitif untuk semua kalangan nelayan.',
        icon: Target,
        color: 'text-green-600',
    },
    {
        title: 'Pengalaman 20+ Tahun',
        description: 'Dipercaya ribuan nelayan Indonesia selama lebih dari dua dekade dalam industri perikanan.',
        icon: Anchor,
        color: 'text-purple-600',
    },
    {
        title: 'Melayani Seluruh Indonesia',
        description: 'Jaringan distribusi yang luas menjangkau seluruh nusantara dengan layanan terpercaya.',
        icon: MapPin,
        color: 'text-orange-600',
    },
];

interface ImageTab {
    id: string;
    category: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface AboutProps {
    shops?: OnlineShop[];
    information?: Information[];
    aboutImage?: ImageTab;
}

export default function About({ shops = [], information = [], aboutImage }: AboutProps) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    // Get information data or use defaults
    const currentInfo = information.length > 0 ? information[0] : null;
    const badgeText = currentInfo?.title || 'Solusi Jaring Terpercaya';
    const headerText = currentInfo?.header || 'JARINGWAN';
    const contentText =
        currentInfo?.content ||
        'yang menyediakan berbagai jenis jaring berkualitas untuk kebutuhan perikanan, penangkapan, maupun keperluan sehari-hari. Dengan produk yang telah teruji dan telah dipilih, kami berkomitmen memberikan pelayanan terbaik agar pelanggan mendapatkan solusi jaring yang tepat dengan mudah, cepat, dan aman.';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tentang Kami" />

            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                    style={{
                        backgroundImage: aboutImage?.image ? `url('/storage/${aboutImage.image}')` : "url('/assets/images/bg-hero.png')",
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
                    <div className="mx-auto max-w-5xl text-center text-white">
                        <Badge className="mb-6 border-blue-400 bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-200">{badgeText}</Badge>

                        <h1 className="font-montserrat mb-8 text-4xl leading-tight font-bold md:text-6xl">
                            <span className="text-blue-300">{headerText}</span> adalah toko online terpercaya
                        </h1>

                        <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-gray-200 md:text-xl">{contentText}</p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                    <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white">
                        <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white"></div>
                    </div>
                </div>
            </section>


            {/* Online Shops Section */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="font-montserrat mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Toko Online Kami</h2>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Kunjungi toko online resmi kami untuk mendapatkan produk berkualitas dengan layanan terbaik
                        </p>
                    </div>

                    <div
                        className={`grid gap-8 ${shops.length === 1 ? 'mx-auto max-w-md grid-cols-1' : shops.length === 2 ? 'mx-auto max-w-4xl grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                    >
                        {shops.length > 0 ? (
                            shops.map((shop, index) => (
                                <Card
                                    key={shop.id}
                                    className="py-0 group transform cursor-pointer overflow-hidden border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <CardContent className="p-0">
                                        {/* Shop Image */}
                                        <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                            {shop.image ? (
                                                <img src={`/storage/${shop.image}`} alt={shop.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <>
                                                    <PlaceholderPattern className="h-full w-full stroke-gray-300/30" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="text-4xl">🏪</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="mb-3 text-xl font-bold text-gray-900">{shop.name}</h3>
                                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{shop.description}</p>
                                            <div className="flex items-center justify-between">
                                                <Badge className="bg-blue-600 text-white">Kunjungi Toko</Badge>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="hover:cursor-pointer transition-colors hover:bg-gray-900 hover:text-white"
                                                    onClick={() => window.open(shop.url, '_blank')}
                                                >
                                                    Lihat
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <div className="mb-4 text-gray-400">
                                    <ShoppingBag className="mx-auto h-16 w-16" />
                                </div>
                                <h3 className="mb-2 text-xl font-medium text-gray-600">Belum Ada Toko Online</h3>
                                <p className="text-gray-500">Toko online akan segera hadir. Pantau terus untuk update terbaru!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group text-center"
                                onMouseEnter={() => setHoveredFeature(index)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div
                                    className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 hover:scale-110 hover:bg-blue-600
                                        }`}
                                >
                                    <feature.icon
                                        className={`h-10 w-10 transition-colors duration-300
                                            }`}
                                    />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                                <p className="mb-3 font-medium text-blue-600">{feature.subtitle}</p>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Values Section */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="font-montserrat mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Mengapa Memilih Kami?</h2>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Komitmen kami terhadap kualitas dan kepuasan pelanggan menjadikan JARINGWAN pilihan utama para nelayan Indonesia
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {companyValues.map((value, index) => (
                            <Card key={index} className="border-l-4 border-blue-600 p-6 transition-shadow duration-300 hover:shadow-lg">
                                <div className="flex items-start space-x-4">
                                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100`}>
                                        <value.icon className={`h-6 w-6 ${value.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">{value.title}</h3>
                                        <p className="leading-relaxed text-gray-600">{value.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


        </AppLayout>
    );
}
