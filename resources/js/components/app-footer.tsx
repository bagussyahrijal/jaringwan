import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search, Home, Package, Calendar, Users, Phone, MapPin, ExternalLink, MessageCircle, Instagram, Youtube, Music, ArrowUp, Mail } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { useState, useEffect } from 'react';

const mainNavItems = [
    { title: 'Home', href: '/', icon: null },
    { title: 'About', href: '/tentang-kami', icon: null },
    { title: 'Produk', href: '/produk', icon: null },
    { title: 'Galeri', href: '/galeri', icon: null },
    { title: 'Kontak', href: '/kontak', icon: null },
];

interface AppFooterProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppFooter({ breadcrumbs = [] }: AppFooterProps) {
    const page = usePage<SharedData>();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}

            {/* Footer Section */}
            <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
                {/* Background Pattern */}

                <div className="mx-auto max-w-7xl px-4 py-12 relative z-10">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* TOKO KAMI Section */}
                        <div className="group">
                            <div className="flex items-center space-x-2 mb-4">
                                <Package className="w-5 h-5 text-blue-400" />
                                <h3 className="text-white font-semibold text-lg">TOKO KAMI</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: 'SHOPEE', onclick: () => window.open('https://shopee.co.id/jaring_wan?entryPoint=ShopBySearch&searchKeyword=jaringwan', '_blank'), color: 'hover:text-orange-400' },
                                    { name: 'TOKOPEDIA', onclick: () => window.open('https://www.tokopedia.com/jaringwan', '_blank'), color: 'hover:text-green-400' },
                                    { name: 'TikTok Shop', onclick: () => window.open('https://vt.tiktok.com/ZSDusyhfE/?page=Mall', '_blank'), color: 'hover:text-pink-400' }
                                ].map((store) => (
                                    <Link
                                        key={store.name}
                                        onClick={store.onclick}
                                        className={`group flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 ${store.color} transform hover:translate-x-2`}
                                    >
                                        <span className="font-medium">{store.name}</span>
                                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* QUICK LINK Section */}
                        <div className="group">
                            <div className="flex items-center space-x-2 mb-4">
                                <Home className="w-5 h-5 text-blue-400" />
                                <h3 className="text-white font-semibold text-lg">QUICK LINK</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: 'Home', href: '/dashboard' },
                                    { name: 'Tentang Kami', href: '/about' },
                                    { name: 'Produk', href: '/product' },
                                    { name: 'Galeri', href: '/gallery' },
                                    { name: 'Kontak', href: '/contact' }
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="block p-3 rounded-lg bg-gray-800/30 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 transform hover:translate-x-2 border-l-2 border-transparent hover:border-blue-400"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* HUBUNGI KAMI Section */}
                        <div className="group">
                            <div className="flex items-center space-x-2 mb-4">
                                <MessageCircle className="w-5 h-5 text-blue-400" />
                                <h3 className="text-white font-semibold text-lg">HUBUNGI KAMI</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    {
                                        name: 'WhatsApp', icon: MessageCircle, color: 'hover:text-green-400', onclick: () => window.open('https://wa.me/6289675626365', '_blank') },
                                    { name: 'Instagram', icon: Instagram, color: 'hover:text-pink-400', onclick: () => window.open('https://instagram.com/jaring_wan', '_blank') },
                                            { name: 'Email', icon: Mail, color: 'hover:text-pink-500', onclick: () => window.open('mailto:wahyuan001@gmail.com', '_blank') }
                                ].map((contact) => (
                                                <Link
                                                    key={contact.name}
                                                    onClick={contact.onclick}
                                                    target="_blank"
                                                    className={`group flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 ${contact.color} transform hover:scale-105`}
                                                >
                                                    <contact.icon className="w-5 h-5" />
                                                    <span className="font-medium">{contact.name}</span>
                                                    <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </Link>
                                            ))}
                            </div>
                        </div>

                        {/* Social Media Icons with Animation */}
                        <div className="group">
                            <div className="flex items-center space-x-2 mb-4">
                                <Users className="w-5 h-5 text-blue-400" />
                                <h3 className="text-white font-semibold text-lg">FOLLOW US</h3>
                            </div>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                {[
                                    {
                                        name: 'YouTube',
                                        onclick: () => window.open('https://youtube.com/@jaringwan', '_blank'),
                                        bgColor: 'hover:bg-red-600',
                                        icon: (
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: 'Instagram',
                                        onclick: () => window.open('https://instagram.com/jaring_wan', '_blank'),
                                        bgColor: 'hover:bg-pink-400',
                                        icon: (
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        )
                                    },
                                    { name: 'TikTok',
                                        onclick: () => window.open('https://vt.tiktok.com/ZSDusyhfE/?page=Mall', '_blank'),
                                        bgColor: 'hover:bg-black',
                                        icon: (
                                            <img src="assets/images/platforms/tiktok.png" className='size-5' alt="" />
                                        )
                                    }
                                ].map((social) => (
                                    <Link
                                        key={social.name}
                                        target="_blank"
                                        className={`group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${social.bgColor} transform hover:scale-110`}
                                        onClick={social.onclick}
                                    >
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>Indonesia</span>
                        </div>
                        <div className="text-sm mt-4 md:mt-0">
                            © 2025 JARINGWAN
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
