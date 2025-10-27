"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit3, Image, Trash2, Plus, Calendar } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { createWork, deleteWork, updateWork, Work } from "@/lib/actions/work.actions";
import { formatDistanceToNowStrict } from "date-fns";
import { tr } from "date-fns/locale";
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

type Session = typeof auth.$Infer.Session;

type ClientProps = {
  session: Session;
  data: {
    works: Work[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export default function PageClient({ session, data }: ClientProps) {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Lütfen bir resim dosyası seçin");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Resim boyutu çok büyük. Maksimum 5MB olmalı.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEditSheet = (work: Work) => {
    setEditingWork(work);
    setForm({
      title: work.title,
      description: work.content,
    });
    setCoverImage(work.coverImage);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setEditingWork(null);
    setForm({ title: "", description: "" });
    setCoverImage(null);
  };

  const handleSaveProject = async () => {
    if (!form.title.trim() || !form.description.trim() || !coverImage) {
      toast.error("Lütfen tüm alanları doldurun!");
      return;
    }

    setIsLoading(true);
    try {
      if (editingWork) {
        const result = await updateWork(editingWork.id, {
          title: form.title,
          coverImage,
          content: form.description,
        });

        if (result.success) {
          toast.success("Proje başarıyla güncellendi!");
          handleCloseSheet();
        }
      } else {
        const result = await createWork({
          title: form.title,
          coverImage,
          content: form.description,
        });

        if (result.success) {
          toast.success("Proje başarıyla eklendi!");
          handleCloseSheet();
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("Proje silinemedi!");
      return;
    }

    const res = await deleteWork(id);
    toast.success(res.message);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-0 py-4 sm:py-6">
      <div className="flex flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Projeler</h1>
          <p className="text-sm text-gray-500 mt-1">
            {data.pagination.total} proje bulundu
          </p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="gap-2" onClick={() => setEditingWork(null)}>
              <Plus size={18} />
              Yeni Proje
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader className="pb-6 border-b">
              <SheetTitle className="text-lg font-bold">
                {editingWork ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 px-2 sm:px-4 py-4">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Kapak Görseli</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div
                  onClick={handleImageClick}
                  className="relative w-full h-[200px] sm:h-[250px] bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer rounded-xl border-2 border-dashed border-gray-300 overflow-hidden group"
                >
                  {coverImage ? (
                    <>
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                          <Image
                            className="mx-auto mb-2 text-white"
                            size={32}
                          />
                          <p className="text-white font-medium text-sm">
                            Görseli değiştir
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                        <Image size={28} className="text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium text-sm">
                        Görsel yüklemek için tıklayın
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        PNG, JPG (max. 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-semibold">
                  Proje Başlığı
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  id="title"
                  name="title"
                  className="h-12 text-base"
                  placeholder="Örn: Web Sitesi Yenileme Projesi"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Açıklama
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  id="description"
                  name="description"
                  className="min-h-[120px] max-h-[250px] text-sm resize-none"
                  placeholder="Proje hakkında detaylı bilgi ekleyin..."
                  disabled={isLoading}
                />
              </div>
            </div>

            <SheetFooter className="pt-6 border-t gap-2 flex-col sm:flex-row">
              <SheetClose asChild>
                <Button variant="outline" className="flex-1 w-full" onClick={handleCloseSheet}>
                  İptal
                </Button>
              </SheetClose>
              <Button
                disabled={isLoading}
                onClick={handleSaveProject}
                className="flex-1 gap-2 w-full"
              >
                {isLoading && <Spinner />}
                {isLoading ? (editingWork ? "Güncelleniyor..." : "Kaydediliyor...") : (editingWork ? "Güncelle" : "Kaydet")}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-4">
        {data.pagination.total === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Image size={36} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Henüz proje yok
            </h3>
            <p className="text-sm text-gray-500">
              İlk projenizi ekleyerek başlayın
            </p>
          </div>
        ) : (
          data.works.map((item) => (
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
                      {item.content}
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
                    variant="outline" 
                    size="sm" 
                    className="gap-2 flex-1 sm:flex-none"
                    onClick={() => handleOpenEditSheet(item)}
                  >
                    <Edit3 size={16} />
                    <span className="hidden sm:inline">Düzenle</span>
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
                          Projeyi silmek istediğinizden emin misiniz?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm">
                          <strong className="text-gray-900">
                            {item.title}
                          </strong>{" "}
                          başlıklı proje kalıcı olarak silinecektir. Bu işlem
                          geri alınamaz.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">Vazgeç</AlertDialogCancel>
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
          ))
        )}
      </div>
    </div>
  );
}