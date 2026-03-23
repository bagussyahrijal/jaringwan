import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { type ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                    {items.map((item) => (
                        <SidebarMenuItem
                            key={item.title}
                            onMouseEnter={() => setHoveredItem(item.title)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <SidebarMenuButton
                                asChild
                                className={`
                                    transition-all duration-300 ease-in-out
                                    text-gray-500 dark:text-gray-400
                                    hover:text-blue-600 dark:hover:text-blue-400
                                    hover:bg-blue-50 dark:hover:bg-blue-900/20
                                    ${hoveredItem === item.title ? 'scale-105 shadow-sm bg-blue-50/50 dark:bg-blue-900/10' : ''}
                                `}
                            >
                                <a href={typeof item.href === 'string' ? item.href : item.href.url} target="_blank" rel="noopener noreferrer">
                                    {item.icon && (
                                        <div className={`
                                            p-1 rounded-md transition-colors duration-300
                                            ${hoveredItem === item.title ? 'bg-blue-100 dark:bg-blue-800' : ''}
                                        `}>
                                            <Icon iconNode={item.icon} className="h-4 w-4" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
