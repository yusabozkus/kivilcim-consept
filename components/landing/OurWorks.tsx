"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, X } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Work } from "@/lib/actions/work.actions";
import { demoProjects } from "@/constants/brand";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Props = {
  works: {
    data: Work[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

type DisplayWork = {
  id: string;
  title: string;
  content: string;
  tag: string;
  accent: string;
  coverImage?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const projectAccents = [
  "from-[#ff6b35] via-[#ff8c5a] to-[#ffc46b]",
  "from-[#6c5ce7] via-[#8678ef] to-[#b8afff]",
  "from-[#10253f] via-[#164e63] to-[#22d3a7]",
];

export default function OurWorks({ works }: Props) {
  const [selectedWork, setSelectedWork] = useState<DisplayWork | null>(null);

  const displayWorks = useMemo<DisplayWork[]>(() => {
    if (!works.data.length) return demoProjects;

    return works.data.map((work, index) => ({
      id: work.id,
      title: work.title,
      content: work.content,
      coverImage: work.coverImage,
      createdAt: work.createdAt,
      updatedAt: work.updatedAt,
      tag: "Collective project",
      accent: projectAccents[index % projectAccents.length],
    }));
  }, [works.data]);

  return (
    <section id="our-works" className="bg-white px-4 py-24 sm:px-6 lg:py-32">
      <Sheet open={Boolean(selectedWork)} onOpenChange={() => setSelectedWork(null)}>
        <SheetContent className="w-[calc(100%-16px)] overflow-y-auto border-0 bg-[#f7f4ed] p-0 sm:max-w-xl">
          {selectedWork && (
            <div>
              {selectedWork.coverImage ? (
                <img
                  src={selectedWork.coverImage}
                  alt={selectedWork.title}
                  className="h-72 w-full object-cover"
                />
              ) : (
                <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${selectedWork.accent}`}>
                  <div className="absolute -right-12 -top-12 size-52 rounded-full border-[36px] border-white/20" />
                  <div className="absolute bottom-8 left-8 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                    {selectedWork.tag}
                  </div>
                </div>
              )}
              <div className="p-7 sm:p-10">
                <SheetHeader className="text-left">
                  <SheetDescription className="font-bold uppercase tracking-[0.14em] text-primary">
                    {selectedWork.tag}
                  </SheetDescription>
                  <SheetTitle className="pt-2 text-4xl font-black tracking-[-0.04em] text-[#101522]">
                    {selectedWork.title}
                  </SheetTitle>
                </SheetHeader>
                <p className="mt-7 text-base leading-8 text-[#101522]/60">
                  {selectedWork.content}
                </p>
                <div className="mt-9 flex items-center gap-2 border-t border-black/10 pt-6 text-sm text-[#101522]/50">
                  <CalendarDays className="size-4" />
                  {format(new Date(selectedWork.createdAt), "d MMMM yyyy", {
                    locale: enUS,
                  })}
                </div>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#101522] px-5 py-3 font-bold text-white"
                >
                  <X className="size-4" /> Close
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-kicker text-primary">Selected work</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-[#101522] sm:text-6xl">
              From curiosity to product.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#101522]/50 sm:text-base">
            Every project starts with a real question and moves forward through
            an open process and something concrete enough to test.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {displayWorks.map((item, index) => (
            <motion.button
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              onClick={() => setSelectedWork(item)}
              className="group overflow-hidden rounded-[28px] border border-black/10 bg-[#f7f4ed] text-left transition-transform hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`}>
                    <div className="absolute -right-10 -top-12 size-52 rounded-full border-[34px] border-white/20 transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-4 right-6 text-[92px] font-black leading-none text-white/20">
                      0{index + 1}
                    </div>
                    <div className="absolute left-7 top-7 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                      {item.tag}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-5">
                  <h3 className="text-2xl font-black tracking-[-0.03em] text-[#101522]">
                    {item.title}
                  </h3>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 transition-colors group-hover:bg-[#101522] group-hover:text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#101522]/50">
                  {item.content}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {!works.data.length && (
          <p className="mt-6 text-center text-xs text-[#101522]/35">
            Showing sample projects · Publish live work from the studio dashboard.
          </p>
        )}
      </div>
    </section>
  );
}
