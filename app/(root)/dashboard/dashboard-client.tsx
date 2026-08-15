"use client";

import Link from "next/link";
import { ArrowUpRight, Layers, Megaphone, Sparkles, Users } from "lucide-react";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

const quickActions = [
  {
    title: "Review applications",
    description: "Evaluate the profiles of makers who want to join the collective.",
    href: "/users",
    icon: Users,
    color: "bg-[#ff6b35]",
  },
  {
    title: "Project showcase",
    description: "Manage active work, cover visuals, and project stories.",
    href: "/works",
    icon: Layers,
    color: "bg-[#6c5ce7]",
  },
  {
    title: "Studio journal",
    description: "Publish open calls, events, and notes from the process.",
    href: "/announcements",
    icon: Megaphone,
    color: "bg-[#164e63]",
  },
];

export default function DashboardClient({ session }: { session: Session | null }) {
  const firstName = session?.user.name?.split(" ")[0] || "maker";

  return (
    <div className="h-full overflow-y-auto px-4 pb-12 sm:px-0">
      <section className="relative overflow-hidden rounded-[28px] bg-[#101522] px-6 py-10 text-white sm:px-10 sm:py-12">
        <div className="absolute -right-20 -top-28 size-80 rounded-full border-[48px] border-white/5" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50">
            <Sparkles className="size-3.5 text-primary" /> Kıvılcım Studio OS
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Good morning, {firstName}.
          </h1>
          <p className="mt-4 max-w-xl leading-7 text-white/45">
            Manage projects, applications, and the collective publishing flow in one place.
          </p>
        </div>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-3xl border border-black/10 bg-white p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className={`grid size-12 place-items-center rounded-2xl text-white ${action.color}`}>
                  <Icon className="size-5" />
                </span>
                <ArrowUpRight className="size-5 text-black/25 transition-transform group-hover:rotate-45" />
              </div>
              <h2 className="mt-10 text-xl font-black text-[#101522]">{action.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#101522]/45">{action.description}</p>
            </Link>
          );
        })}
      </div>

      <section className="mt-8 grid gap-5 rounded-3xl border border-dashed border-black/15 bg-[#f7f4ed] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.15em] text-primary">Publishing check</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#101522]">
            Preview the public showcase
          </h2>
          <p className="mt-2 text-sm text-[#101522]/45">Check how published projects and stories appear on the homepage.</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#101522] px-5 py-3 text-sm font-bold text-white"
        >
          Open website <ArrowUpRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
