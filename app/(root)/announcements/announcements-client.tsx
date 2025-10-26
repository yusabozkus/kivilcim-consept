"use client";

import { Button } from "@/components/ui/button";
import {
  Announcement,
  deleteAnnouncement,
} from "@/lib/actions/announcements.actions";
import { auth } from "@/lib/auth";
import { formatDistanceToNow } from "date-fns";
import { el, tr } from "date-fns/locale";
import { Edit3, Trash2 } from "lucide-react";
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
  data: {
    announcements: Announcement[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export default function AnnouncementsClient({ session, data }: ClientProps) {
  
  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("Duyuru silinemedi!");
      return;
    }

    const res = await deleteAnnouncement(id);

    toast.success(res.message);
  };

  return (
    <div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl font-bold">Duyurular</h1>
          <Button asChild>
            <Link href={"/announcements/add"}>Yeni Duyuru</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          {data.pagination.total == 0 && (
            <p className="text-center text-sm font-medium mt-10">
              Herhangi bir duyuru buliunamadı
            </p>
          )}
          {data.announcements.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-xl bg-secondary flex flex-row items-center justify-between"
            >
              <div className="flex flex-row gap-4">
                <img
                  className="object-cover h-[90px] w-[150px] rounded-xl"
                  alt="image"
                  src={item.coverImage}
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-black">
                      {item.title}
                    </h1>
                    <div className="flex flex-row items-center gap-3 mt-1">
                      <img
                        className="size-6 object-cover rounded-full"
                        src={item.user.image || ""}
                        alt=""
                      />
                      <p className="text-base font-medium">{item.user.name}</p>
                    </div>
                  </div>
                  <p className="text-black/70 text-sm font-light">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                      locale: tr,
                    })}{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  className="bg-blue-400 hover:bg-blue-500 transition-all ease-linear"
                >
                  <Link
                    className="flex flex-row gap-2"
                    href={`/announcements/${item.id}/edit`}
                  >
                    <Edit3 className="text-white" />
                    <p className="text-white">Düzenle</p>
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="bg-red-400 hover:bg-red-500 transition-all ease-linear">
                      <Trash2 />
                      <p>Sil</p>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Duyuruyu silmek istediğinizden emin misiniz?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <strong className="text-black">{item.title}</strong>{" "}
                        başlıklı duyuru kalıcı olarak silinecektir. Bu işlem
                        geri alınamaz.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item.id)}>
                        Sil
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
