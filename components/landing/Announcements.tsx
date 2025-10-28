"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Announcement } from "@/lib/actions/announcements.actions";
import Link from "next/link";

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

const Announcements = ({ announcements }: Props) => {
  return (
    <section
      className="w-full h-full flex flex-row items-center justify-center mt-24 py-24 bg-[#F2F4F3]"
      id="announcements"
    >
      <div className="max-w-default w-full m-auto flex flex-col gap-16 px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl text-center leading-[50px] font-bold">
            Güncel Duyurular
          </h1>
          <Link
            href={"/duyurular"}
            className="px-4 py-2 bg-primary rounded-full text-white transition-all ease-linear border border-transparent hover:bg-transparent hover:border-primary hover:text-primary"
          >
            Tümünü Gör
          </Link>
        </div>
        <div className="relative">
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop
            modules={[Navigation, Pagination]}
            className="w-full !pb-12 rounded-2xl"
          >
            {announcements.data.map((item) => {
              const getTextPreview = (content: any) => {
                if (!content || !Array.isArray(content)) return "";
                const firstTextBlock = content.find(
                  (b: any) => b.type === "paragraph"
                );
                if (!firstTextBlock || !firstTextBlock.content) return "";
                const text = firstTextBlock.content
                  .map((c: any) => (c.text ? c.text : ""))
                  .join(" ");
                return text.length > 100 ? text.slice(0, 100) + "..." : text;
              };

              const previewText = getTextPreview(item.content);

              return (
                <SwiperSlide key={item.id} className="!w-[372px]">
                  <Link href={`/duyurular/${item.id}`}>
                    <div className="space-y-5">
                      <div className="w-full h-[200px] rounded-2xl overflow-hidden">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold line-clamp-2">
                          {item.title}
                        </h2>
                        <p className="text-gray-700 mt-2 line-clamp-3">
                          {previewText}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button className="hidden text-primary swiper-button-prev-custom absolute -left-20 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full border border-primary lg:flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
            <ChevronLeft />
          </button>

          <button className="hidden text-primary swiper-button-next-custom absolute -right-20 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full border border-primary lg:flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
