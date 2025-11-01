"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Home, LogOut, Settings, User } from "lucide-react";
import { sidebarItems } from "@/constants";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth-actions";
import SettingsModal from "./SettingsModal";
import { useSettingsModal } from "@/hooks/use-settings-modal";

type Session = typeof auth.$Infer.Session;

export default function Header({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useSettingsModal();

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;

    const matchedItem = sidebarItems.find((item) => item.url === path);

    const displayName =
      matchedItem?.title || segment.charAt(0).toUpperCase() + segment.slice(1);
    const Icon = matchedItem?.icon;

    return { path, displayName, isLast, Icon };
  });

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    session?.user.name || ""
  )}&background=random&color=fff`;

  const isShow = !(
    pathname.includes("announcements/add") ||
    (pathname.includes("announcements/") && pathname.endsWith("/edit"))
  );

  if (isShow) {
    return (
      <header className="w-full flex flex-row items-center justify-between py-3 sm:py-5 px-4 sm:px-0">
        <div className="flex flex-row items-center gap-4 md:gap-10 flex-1 min-w-0">
          <SidebarTrigger className="p-4 sm:p-5 bg-accent flex-shrink-0" />
          <Breadcrumb className="min-w-0 flex-1">
            <BreadcrumbList className="flex-wrap">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <Home className="size-4 sm:size-5 text-zinc-400 flex-shrink-0" />
                    <span className="hidden md:inline text-sm sm:text-base text-zinc-400 font-semibold">
                      Ana Sayfa
                    </span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {breadcrumbItems.length > 0 &&
                breadcrumbItems[0].path !== "/dashboard" &&
                breadcrumbItems.map((item, index) => (
                  <React.Fragment key={item.path}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem
                      className={!item.isLast ? "hidden sm:flex" : ""}
                    >
                      {item.isLast ? (
                        <BreadcrumbPage className="flex items-center gap-2">
                          {item.Icon && (
                            <item.Icon className="size-4 sm:size-5 text-black flex-shrink-0" />
                          )}
                          <span className="text-sm sm:text-base text-black font-semibold truncate">
                            {item.displayName}
                          </span>
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link
                            href={item.path}
                            className="flex items-center gap-2"
                          >
                            {item.Icon && (
                              <item.Icon className="size-4 sm:size-5 text-zinc-400 flex-shrink-0" />
                            )}
                            <span className="hidden md:inline text-sm sm:text-base text-zinc-400 font-semibold truncate">
                              {item.displayName}
                            </span>
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row items-center gap-2 sm:gap-4 cursor-pointer hover:bg-accent p-1.5 sm:p-2 rounded-xl">
                {session?.user.image ? (
                  <img
                    src={session.user.image}
                    className="size-8 sm:size-11 object-cover rounded-full flex-shrink-0"
                    alt={session.user.name}
                  />
                ) : (
                  <img
                    src={avatarUrl}
                    className="size-8 sm:size-11 object-cover rounded-full flex-shrink-0"
                    alt={session?.user.name}
                  />
                )}
                <div className="hidden lg:block">
                  <h1 className="text-sm sm:text-base font-bold truncate max-w-[150px]">
                    {session?.user.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-medium text-primary capitalize">
                    {session?.user.role}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="flex flex-row items-center justify-between">
                Hesabım
                <p className="text-xs font-light bg-primary/10 text-primary rounded-lg w-max capitalize px-2 py-0.5">
                  {session?.user.role}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuLabel className="rounded-xl pt-3 pb-5">
                <div className="flex flex-row items-center gap-4 cursor-pointer rounded-xl">
                  {session?.user.image ? (
                    <img
                      src={session.user.image}
                      className="size-11 object-cover rounded-full flex-shrink-0"
                      alt={session.user.name}
                    />
                  ) : (
                    <img
                      src={avatarUrl}
                      className="size-11 object-cover rounded-full flex-shrink-0"
                      alt={session?.user.name}
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <h1 className="text-base font-bold truncate">
                      {session?.user.name}
                    </h1>
                    <h1 className="text-sm font-medium text-zinc-400 -mt-0.5 truncate">
                      {session?.user.email}
                    </h1>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => open("profile")}
                  className="flex flex-row items-center gap-3 cursor-pointer"
                >
                  <User className="size-4 flex-shrink-0" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => open("general")}
                  className="flex flex-row items-center gap-3 cursor-pointer"
                >
                  <Settings className="size-4 flex-shrink-0" />
                  Ayarlar
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                <LogOut className="flex-shrink-0" />
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }
}
