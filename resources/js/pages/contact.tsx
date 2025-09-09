import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/layouts/app-layout';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        alert('Pesan berhasil dikirim!');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const platforms = [
        {
            name: 'Shopee',
            icon: '/images/platforms/shopee.png',
            url: 'https://shopee.co.id/jaringwan',
            color: '#FF5722',
            description: 'Belanja mudah di Shopee'
        },
        {
            name: 'TikTok Shop',
            icon: '/images/platforms/tiktok.png',
            url: 'https://shop.tiktok.com/jaringwan',
            color: '#000000',
            description: 'Temukan produk terbaru'
        },
        {
            name: 'Tokopedia',
            icon: '/images/platforms/tokopedia.png',
            url: 'https://tokopedia.com/jaringwan',
            color: '#42A545',
            description: 'Mulai dari sini'
        }
    ];

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
                    <div className="relative z-10 container mx-auto px-4 h-full flex justify-center items-center">
                        <div className="text-white text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl font-bold mb-2"
                            >
                                Butuh Bantuan?
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl opacity-90"
                            >
                                Hubungi kami untuk konsultasi dan pemesanan
                            </motion.p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side - Store Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            {/* Store Information */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-[#0123AA] text-white p-6">
                                    <h2 className="text-2xl font-bold text-center">Toko Kami</h2>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        Jl. Raya Boboh, Prambon, Boboh, Kec. Menganti,
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Kabupaten Gresik, Jawa Timur 61174, Indonesia
                                    </p>

                                    {/* Interactive Map */}
                                    <div className="bg-gray-100 rounded-lg h-64 mb-6 relative overflow-hidden group cursor-pointer">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 group-hover:opacity-75 transition-opacity duration-300" />
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.123!2d112.589!3d-7.234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMDIuNCJTIDExMsKwMzUnMjAuNCJF!5e0!3m2!1sen!2sid!4v1"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="rounded-lg"
                                        />
                                        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg px-3 py-2">
                                            <span className="text-sm font-medium text-gray-700">📍 Lokasi Toko</span>
                                        </div>
                                    </div>

                                    {/* Platform Links */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Kami juga hadir di:</h4>
                                        <div className="flex justify-center space-x-4">
                                            {platforms.map((platform) => (
                                                <motion.a
                                                    key={platform.name}
                                                    href={platform.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onHoverStart={() => setHoveredPlatform(platform.name)}
                                                    onHoverEnd={() => setHoveredPlatform(null)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="relative group"
                                                >
                                                    <div
                                                        className="w-16 h-16 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-xl"
                                                        style={{ backgroundColor: platform.color }}
                                                    >
                                                        <img
                                                            src={platform.icon}
                                                            alt={platform.name}
                                                            className="w-8 h-8"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iI2ZmZiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzMzMyIgZm9udC1zaXplPSIxMiI+8J+Qsz08L3RleHQ+Cjwvc3ZnPgo=';
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Tooltip */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{
                                                            opacity: hoveredPlatform === platform.name ? 1 : 0,
                                                            y: hoveredPlatform === platform.name ? 0 : 10
                                                        }}
                                                        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                                                    >
                                                        {platform.description}
                                                    </motion.div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Contact Info & Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
                            {/* Contact Information */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-[#0123AA] text-white p-6">
                                    <h2 className="text-2xl font-bold text-center">Hubungi Kami</h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    {/* Phone */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="text-center bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-300"
                                    >
                                        <div className="flex justify-center mb-3">
                                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">+62 89675626365</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Silakan hubungi kami untuk pembelian produk atau konsultasi.
                                            Kami siap melayani Anda setiap Sabtu - Kamis, pukul 08.00 sampai 17.00 WIB
                                        </p>
                                        <a
                                            target='_blank'
                                            href="https://wa.me/6289675626365"
                                            className="inline-block mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                                        >
                                            Hubungi Sekarang
                                        </a>
                                    </motion.div>

                                    {/* Instagram */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="text-center bg-gray-50 rounded-lg p-4 hover:bg-pink-50 transition-colors duration-300"
                                    >
                                        <div className="flex justify-center mb-3">
                                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Jaring_Wan</h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Follow Instagram kami untuk update produk terbaru
                                        </p>
                                        <a
                                            href="https://instagram.com/jaring_wan"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                                        >
                                            Follow Instagram
                                        </a>
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="text-center bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-300"
                                    >
                                        <div className="flex justify-center mb-3">
                                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">wahyuan001@gmail.com</h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Kirim email untuk pertanyaan detail atau penawaran khusus
                                        </p>
                                        <a
                                            href="mailto:wahyuan001@gmail.com"
                                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                                        >
                                            Kirim Email
                                        </a>
                                    </motion.div>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
