"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import {
  Announcement,
  updateAnnouncement,
} from "@/lib/actions/announcements.actions";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { ArrowLeft, Image, Redo2, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PartialBlock } from "@blocknote/core";

type EditClientProps = {
  data: Announcement;
};

export default function EditClient({ data }: EditClientProps) {
  const [title, setTitle] = useState(data?.title);
  const [coverImage, setCoverImage] = useState<string>(data?.coverImage);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editor = useCreateBlockNote({
    initialContent: data.content
      ? (data.content as any as PartialBlock[])
      : undefined,
  });

  const router = useRouter();

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.warning("Lütfen bir başlık girin");
      return;
    }

    const blocks = editor.document;
    if (blocks.length === 0) {
      toast.warning("Lütfen içerik ekleyin");
      return;
    }

    if (coverImage == null) {
      toast.warning("Image required");
      return;
    }

    setIsLoading(true);

    try {
      await updateAnnouncement(data.id, {
        title,
        coverImage,
        content: blocks,
      });

      toast.success("Duyuru başarıyla güncellendi!");
      router.push("/announcements");
    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };
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

  return (
    <div className="relative">
      <header className="w-full py-3 flex flex-row items-center justify-between border-b border-black/30 mb-10 sticky top-0 backdrop-blur-2xl z-50 bg-[#ffffff75]">
        <div className="flex flex-row items-center">
          <SidebarTrigger className="p-5 bg-accent mr-3" />
          <button
            onClick={() => router.back()}
            className="bg-secondary p-2 rounded-xl"
            disabled={isLoading}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => editor.undo()}
            className="bg-transparent p-2 rounded-xl hover:bg-secondary transition-all ease-linear"
            disabled={isLoading}
          >
            <Undo2 size={20} />
          </button>
          <button
            onClick={() => editor.redo()}
            className="bg-transparent p-2 rounded-xl hover:bg-secondary transition-all ease-linear"
            disabled={isLoading}
          >
            <Redo2 size={20} />
          </button>
        </div>
        <h1 className="text-lg font-bold">{title || "Yeni Duyuru"}</h1>
        <Button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Güncelleniyor..." : "Güncelle"}
        </Button>
      </header>
      <div className="max-w-[1000px] m-auto">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <div
          onClick={handleImageClick}
          className="w-full h-[500px] bg-neutral-100 hover:bg-neutral-200 transition-all ease-linear cursor-pointer rounded-xl flex flex-col items-center justify-center relative overflow-hidden group"
        >
          {coverImage ? (
            <>
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-all bg-black/50 px-4 py-2 rounded-lg">
                  Resmi değiştirmek için tıklayın
                </p>
              </div>
            </>
          ) : (
            <>
              <Image size={60} className="text-black/20" />
              <p className="text-black/40 font-medium mt-4">
                Resim seçmek ve ya yüklemek için tıklayınız.
              </p>
            </>
          )}
        </div>

        <Textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-0 !border-0 !ring-0 !outline-0 !shadow-none rounded-none font-bold !text-4xl placeholder:text-black/30 resize-none mt-10"
          placeholder="Başlık Ekleyin..."
          disabled={isLoading}
        />
        <BlockNoteView
          editor={editor}
          className="p-0 -mx-13 min-h-[500px]"
          theme="light"
          editable={!isLoading}
          shadCNComponents={{
            Button: { Button },
            DropdownMenu: {
              DropdownMenu,
              DropdownMenuContent,
              DropdownMenuItem,
              DropdownMenuLabel,
              DropdownMenuSeparator,
              DropdownMenuSub,
              DropdownMenuSubContent,
              DropdownMenuSubTrigger,
              DropdownMenuTrigger,
              DropdownMenuCheckboxItem,
            },
            Select: {
              Select,
              SelectContent,
              SelectItem,
              SelectTrigger,
              SelectValue,
            },
            Popover: { Popover, PopoverContent, PopoverTrigger },
            Input: { Input },
            Label: { Label },
          }}
        />
      </div>
    </div>
  );
}
