"use client";

import { Calendar, Home, Inbox, Search, Settings, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/constants";

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className={`flex flex-col items-center gap-4 py-6 justify-center  ${
            state === "collapsed" ? "px-0" : "px-4"
          }`}
        >
          <Logo
            className={`${
              state === "collapsed" ? "!size-8" : "!size-12"
            } transition-all ease-linear`}
          />
          <h1
            className={`text-2xl font-bold ${
              state === "collapsed" ? "hidden" : "block"
            }`}
          >
            Türk'ün Kanadı
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup className={`${state === "collapsed" ? "" : "px-2"}`}>
          <SidebarGroupLabel className="text-sm font-bold text-zinc-500">
            Yönetim
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu className="flex flex-col items-center justify-center">
              {sidebarItems.map((item) => (
                <SidebarMenuItem className="w-full" key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    isActive={pathname == item.url}
                    className={`${state === "collapsed" ? "" : "py-5 px-3"}`}
                  >
                    <a
                      href={item.url}
                      className={`${
                        state === "collapsed"
                          ? "flex flex-row items-center justify-center"
                          : ""
                      }`}
                    >
                      <item.icon className="!size-5.5" />
                      <span
                        className={`${
                          state === "collapsed" ? "hidden" : "block"
                        } ml-1 font-semibold`}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
