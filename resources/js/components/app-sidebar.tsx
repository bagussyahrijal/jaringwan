import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Camera, Folder, LayoutGrid, MessageCircle, Moon, Package, ShoppingCart, Sun, SunMoon, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Produk',
        href: '/admin/product',
        icon: Package,
    },
    {
        title: 'Kategori',
        href: '/admin/category',
        icon: Tag,
    },
    {
        title: 'Galeri',
        href: '/admin/gallery',
        icon: Camera,
    },
    {
        title: 'Toko Online',
        href: '/admin/online-shop',
        icon: ShoppingCart,
    },
    {
        title: 'Informasi',
        href: '/admin/information',
        icon: BookOpen,
    },
    // {
    //     title: 'Kontak',
    //     href: '/admin/contact',
    //     icon: MessageCircle,
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
            <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 ">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
                            <Link href={dashboard()} prefetch>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg shadow-md hover:rotate-6 transition-transform duration-200">
                                        <AppLogo />
                                    </div>
                                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                                        <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">Jaring Wan</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</span>
                                    </div>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarHeader>

            <SidebarContent className="bg-white dark:bg-gray-900 transition-colors duration-300">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
