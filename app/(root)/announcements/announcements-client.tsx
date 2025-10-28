"use client";

import { Button } from "@/components/ui/button";
import {
  Announcement,
  deleteAnnouncement,
} from "@/lib/actions/announcements.actions";
import { auth } from "@/lib/auth";
import { formatDistanceToNowStrict } from "date-fns";
import { tr } from "date-fns/locale";
import { Edit3, Trash2, Calendar, Image } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Session = typeof auth.$Infer.Session;

type ClientProps = {
  session: Session;
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

export default function AnnouncementsClient({ session, announcements }: ClientProps) {
  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("Duyuru silinemedi!");
      return;
    }

    const res = await deleteAnnouncement(id);
    toast.success(res.message);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-0 py-4 sm:py-6">
      <div className="flex flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Duyurular
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {announcements.pagination.total} duyuru bulundu
          </p>
        </div>
        <Button asChild>
          <Link href={"/announcements/add"}>Yeni Duyuru</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.pagination.total === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Image size={36} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Henüz duyuru yok
            </h3>
            <p className="text-sm text-gray-500">
              İlk duyurunuzu ekleyerek başlayın
            </p>
          </div>
        ) : (
          announcements.data.map((item) => {
            const getTextPreview = (content: any) => {
              if (!content || !Array.isArray(content)) return "";
              const firstTextBlock = content.find(
                (b: any) => b.type === "paragraph"
              );
              if (!firstTextBlock || !firstTextBlock.content) return "";
              const text = firstTextBlock.content
                .map((c: any) => (c.text ? c.text : ""))
                .join(" ");
              return text
            };

            const previewText = getTextPreview(item.content);

            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0 w-full sm:w-48">
                    <img
                      className="w-full sm:w-48 h-48 sm:h-32 object-cover rounded-lg"
                      alt={item.title}
                      src={item.coverImage}
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h2>

                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {previewText}
                      </p>
                    </div>

                    <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mt-4">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-6 h-6 rounded-full object-cover"
                          src={item.user.image || ""}
                          alt={item.user.name}
                        />
                        <span className="font-medium">{item.user.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>
                          {formatDistanceToNowStrict(new Date(item.createdAt), {
                            addSuffix: true,
                            locale: tr,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-1 sm:flex-none"
                    >
                      <Link href={`/announcements/${item.id}/edit`}>
                        <Edit3 size={16} />
                        <span className="hidden sm:inline">Düzenle</span>
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-none"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Sil</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-[90vw] max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-base sm:text-lg">
                            Duyuruyu silmek istediğinizden emin misiniz?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-sm">
                            <strong className="text-gray-900">
                              {item.title}
                            </strong>{" "}
                            başlıklı duyuru kalıcı olarak silinecektir. Bu işlem
                            geri alınamaz.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                          <AlertDialogCancel className="w-full sm:w-auto">
                            Vazgeç
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                          >
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
