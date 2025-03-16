'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@/libs/contexts/UserProvider';
import { cn } from '@/shadcn/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/shadcn/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { Button } from '@/shadcn/components/ui/button';

/* eslint-disable react/require-default-props */

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  title: string;
  className?: string;
  children: React.ReactNode;
}

// Fix arrow body style and prop spreading warnings
const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className = '', title, children, href, onClick }, ref) => (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          href={href}
          onClick={onClick}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
);

ListItem.displayName = 'ListItem';

const Header = () => {
  const { setTheme } = useTheme();
  const user = useUser();

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left side - Site Name */}
        <div>
          <Link
            href="/"
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Bog Republic
          </Link>
        </div>

        {/* Right side - User menu */}
        <div className="relative">
          <NavigationMenu className="relative">
            <NavigationMenuList className="list-none">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <span className="font-medium">
                    {user?.username || 'Account'}
                  </span>
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="w-[220px] p-2">
                    <ul className="grid gap-1 list-none m-0 p-0">
                      <ListItem href="/profile" title="Profile">
                        View and edit your profile
                      </ListItem>

                      <ListItem href="/settings" title="Settings">
                        Manage your account settings
                      </ListItem>

                      <ListItem
                        onClick={() => console.log('Logout Clicked')}
                        href="/"
                        title="Logout"
                      >
                        Sign out of your account
                      </ListItem>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      Light
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      Dark
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setTheme('system')}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
