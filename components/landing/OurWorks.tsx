"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Work } from "@/lib/actions/work.actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar, RefreshCcw } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const OurWorks = ({ works }: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const handleShowAlert = (work: Work) => {
    setSelectedWork(work);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setSelectedWork(null);
  };

  return (
    <section
      className="w-full lg:h-full flex flex-row items-center justify-center px-4 lg:px-0"
      id="our-works"
    >
      <Sheet open={showAlert} onOpenChange={handleCloseAlert}>
        <SheetContent
          className="!w-[96%] lg:!max-w-[550px] overflow-y-auto no-scrollbar border-none backdrop-blur-lg bg-[#ffffffdc] h-[98%] rounded-xl right-0 top-0 bottom-0 m-2"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Proje Detayı</SheetTitle>
            <SheetDescription>
              {selectedWork &&
                format(new Date(selectedWork.createdAt), "d MMMM yyyy", {
                  locale: tr,
                })}
            </SheetDescription>
          </SheetHeader>

          {selectedWork && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 px-4 pb-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative w-full h-[300px] rounded-xl overflow-hidden group"
              >
                <img
                  src={selectedWork.coverImage}
                  alt={selectedWork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-black leading-tight">
                  {selectedWork.title}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="prose prose-sm dark:prose-invert max-w-none"
              >
                <p className="text-black/50 leading-relaxed whitespace-pre-wrap -mt-4">
                  {selectedWork.content}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={14} />
                  <span>
                    Oluşturulma:{" "}
                    {format(new Date(selectedWork.createdAt), "d MMMM yyyy", {
                      locale: tr,
                    })}
                  </span>
                </div>
                {selectedWork.updatedAt &&
                  selectedWork.createdAt !== selectedWork.updatedAt && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <RefreshCcw size={14} />
                      <span>
                        Güncelleme:{" "}
                        {format(
                          new Date(selectedWork.updatedAt),
                          "d MMMM yyyy",
                          { locale: tr }
                        )}
                      </span>
                    </div>
                  )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="pt-4"
              >
                <Button
                  onClick={handleCloseAlert}
                  className="w-full bg-primary hover:bg-red-400 text-white font-semibold py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Kapat
                </Button>
              </motion.div>
            </motion.div>
          )}
        </SheetContent>
      </Sheet>
      <div className="max-w-default w-full m-auto flex flex-col gap-16">
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl text-center leading-[50px] font-bold"
        >
          Projeler ve Etkinlikler
        </motion.h1>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {works.data.map((item, index) => (
            <motion.div
              key={`our_works_${index}`}
              onClick={() => handleShowAlert(item)}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="w-full h-[290px] rounded-2xl overflow-hidden relative group shadow cursor-pointer"
            >
              <motion.img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <motion.div
                className="absolute bottom-4 left-0 right-0 w-auto bg-[#ffffffcb] backdrop-blur-sm mx-4 rounded-xl p-5 text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" as const }}
              >
                <h1 className="text-black text-lg font-bold">{item.title}</h1>
                <p className="text-sm line-clamp-2">{item.content}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurWorks;
