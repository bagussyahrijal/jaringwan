import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search, Home, Package, Calendar, Users, Phone } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
        icon: Home,
    },
    {
        title: 'Tentang Kami',
        href: '/about',
        icon: Users,
    },
    {
        title: 'Produk',
        href: '/product',
        icon: Package,
    },
    {
        title: 'Galeri',
        href: '/gallery',
        icon: Calendar,
    },
    {
        title: 'Kontak',
        href: '/contact',
        icon: Phone,
    },
];


interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <>
            {/* Top Section with Logo and Title */}
            <div className="bg-[#f6f0ff] border-b border-gray-200">
                <div className="mx-auto flex items-center justify-center px-4 md:max-w-7xl">
                    <Link href="/" className="flex items-center gap-4 py-5 space-x-4">
                        <AppLogoIcon />
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-montserrat font-extrabold text-[#0123AA] tracking-wider">JARING WAN</h1>
                            <p className="text-sm font-medium font-montserrat text-[#39567E] tracking-widest">HARTA - TAHTA - SAMUDERA</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Bottom Navigation Section */}
            <div className="bg-[#0123AA] border-b border-blue-700">
                <div className="mx-auto flex h-14 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px] text-white hover:bg-blue-700">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-white">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left p-4">
                                    <div className="flex items-center space-x-2">
                                        <AppLogoIcon className="h-8 w-8 fill-current text-blue-600" />
                                        <span className="font-bold text-blue-600">JARING WAN</span>
                                    </div>
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-start text-sm">
                                        <div className="flex flex-col space-y-2">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className={cn(
                                                        "flex items-center space-x-3 p-3 rounded-md font-medium transition-colors hover:bg-blue-50",
                                                        page.url === item.href ? "bg-blue-100 text-blue-600" : "text-gray-700"
                                                    )}
                                                >
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex h-full items-center justify-center flex-1">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-0">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center h-full px-6 py-2 text-sm font-medium transition-colors hover:bg-blue-700 hover:text-white",
                                                page.url === item.href
                                                    ? " text-white border-b-2 border-white"
                                                    : "text-white"
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>


                </div>
            </div>

            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-gray-200 bg-gray-50">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-gray-600 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
