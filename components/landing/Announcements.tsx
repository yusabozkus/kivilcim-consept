"use client";

import Link from "next/link";
import { ArrowRight, Asterisk } from "lucide-react";
import { Announcement } from "@/lib/actions/announcements.actions";
import { demoNotes } from "@/constants/brand";

type Props = {
  announcements: {
    data: Announcement[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

type Note = {
  id: string;
  title: string;
  preview: string;
  category: string;
  date: string;
  accent: string;
  coverImage?: string;
  href?: string;
};

const accents = [
  "from-[#ff6b35] via-[#f05a2a] to-[#992b11]",
  "from-[#6c5ce7] via-[#493aa8] to-[#17112f]",
  "from-[#173e47] via-[#0d7377] to-[#16a085]",
];

function getTextPreview(content: unknown) {
  if (!Array.isArray(content)) return "";
  const block = content.find(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "type" in item &&
      item.type === "paragraph"
  ) as { content?: Array<{ text?: string }> } | undefined;

  return (block?.content || [])
    .map((item) => item.text || "")
    .join(" ")
    .slice(0, 180);
}

export default function Announcements({ announcements }: Props) {
  const notes: Note[] = announcements.data.length
    ? announcements.data.slice(0, 3).map((item, index) => ({
        id: item.id,
        title: item.title,
        preview: getTextPreview(item.content),
        category: "From the collective",
        date: new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date(item.createdAt)),
        accent: accents[index % accents.length],
        coverImage: item.coverImage,
        href: `/journal/${item.id}`,
      }))
    : demoNotes;

  return (
    <section id="announcements" className="bg-[#e9e4d9] px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="section-kicker text-primary">Studio journal</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-[#101522] sm:text-6xl">
              Notes from the process.
            </h2>
          </div>
          {announcements.data.length > 0 && (
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 font-extrabold text-[#101522]"
            >
              View all stories <ArrowRight className="size-4" />
            </Link>
          )}
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {notes.map((note, index) => {
            const banner = (
              <article
                className={`group relative overflow-hidden rounded-[28px] text-white ${
                  index === 0 ? "min-h-[440px] lg:col-span-2" : "min-h-[360px]"
                }`}
              >
                {note.coverImage ? (
                  <img
                    src={note.coverImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${note.accent}`}>
                    <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:52px_52px]" />
                    <div className="absolute -right-14 -top-16 size-72 rounded-full border-[48px] border-white/15 transition-transform duration-700 group-hover:scale-110" />
                    <Asterisk className="absolute right-[20%] top-[24%] size-20 stroke-[1] text-white/20" />
                    <span className="absolute bottom-4 right-7 text-[120px] font-black leading-none text-white/10">
                      0{index + 1}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#090d18]/95 via-[#090d18]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-9 lg:p-10">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                      {note.category}
                    </span>
                    <span>{note.date}</span>
                  </div>
                  <div className={`mt-5 ${index === 0 ? "max-w-4xl" : "max-w-xl"}`}>
                    <h3
                      className={`font-black leading-[1] tracking-[-0.04em] ${
                        index === 0 ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
                      }`}
                    >
                      {note.title}
                    </h3>
                    <div className="mt-5 flex items-end justify-between gap-6">
                      <p className="max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                        {note.preview}
                      </p>
                      <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm transition-all group-hover:-rotate-12 group-hover:bg-white group-hover:text-[#101522]">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );

            return note.href ? (
              <Link
                key={note.id}
                href={note.href}
                className={index === 0 ? "lg:col-span-2" : ""}
              >
                {banner}
              </Link>
            ) : (
              <div key={note.id} className={index === 0 ? "lg:col-span-2" : ""}>
                {banner}
              </div>
            );
          })}
        </div>

        {!announcements.data.length && (
          <p className="mt-6 text-center text-xs text-[#101522]/35">
            Showing sample journal entries · Publish live stories from the studio dashboard.
          </p>
        )}
      </div>
    </section>
  );
}
