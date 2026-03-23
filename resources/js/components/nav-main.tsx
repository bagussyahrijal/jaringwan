import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <SidebarGroup className="px-2 py-2">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Navigation
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item, index) => {
                    const isActive = page.url.startsWith(typeof item.href === 'string' ? item.href : item.href.url);

                    return (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <SidebarMenuItem
                                onMouseEnter={() => setHoveredItem(item.title)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="group"
                            >
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={{ children: item.title }}
                                    className={`
                                        relative overflow-hidden transition-all duration-300 ease-in-out
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                                            : 'hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-gray-700'
                                        }
                                        ${hoveredItem === item.title ? 'scale-105 shadow-md' : ''}
                                    `}
                                >
                                    <Link href={item.href} prefetch className="flex items-center gap-3 w-full relative z-10">
                                        {item.icon && (
                                            <div
                                                className={`
                                                    p-1.5 rounded-lg transition-all duration-300
                                                    ${isActive
                                                        ? 'bg-white/20 text-white'
                                                        : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                                    }
                                                    ${hoveredItem === item.title ? 'rotate-6' : ''}
                                                `}
                                            >
                                                <item.icon className="h-4 w-4" />
                                            </div>
                                        )}
                                        <span className={`
                                            font-medium transition-colors duration-300
                                            ${isActive
                                                ? 'text-white'
                                                : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                                            }
                                        `}>
                                            {item.title}
                                        </span>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                                        )}

                                        {/* Animated background effect */}
                                        {hoveredItem === item.title && !isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 animate-pulse" />
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </motion.div>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
