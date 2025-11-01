"use client";

import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { auth } from "@/lib/auth";
import { signOutFromAllDevices } from "@/lib/actions/auth-actions";
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

type Props = {
  session: Session;
};

export default function General({ session }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOutAllAccount = async () => {
    if (!session?.user?.id) {
      toast.error("Kullanıcı bilgisi bulunamadı");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signOutFromAllDevices(session.user.id);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error("Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // if (!session?.user?.id) {
    //   toast.error("Kullanıcı bilgisi bulunamadı");
    //   return;
    // }
    // if (
    //   !confirm(
    //     "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
    //   )
    // ) {
    //   return;
    // }
    // setIsLoading(true);
    // try {
    //   const result = await deleteAccount(session.user.id);
    //   if (result.success) {
    //     toast.success(result.message);
    //   } else {
    //     toast.error(result.error);
    //   }
    // } catch (error: any) {
    //   toast.error("Bir hata oluştu");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-black mb-2">
            Genel Ayarlar
          </h3>
          <p className="text-sm text-black/50">
            Uygulama için genel tercihleri düzenleyin
          </p>
        </div>

        <div className="flex flex-row items-center justify-between mt-10">
          <h1 className="text-base font-medium">Tüm cihazlardan çıkış yap</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size={"sm"}
                className="bg-transparent text-primary hover:bg-primary/20"
                disabled={isLoading}
              >
                {isLoading ? "İşleniyor..." : "Çıkış Yap"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90vw] max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg font-semibold">
                  Tüm Cihazlardan Çıkış Yapmak Üzeresiniz
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-muted-foreground">
                  Bu işlem, şu anda oturum açtığınız
                  <strong> tüm cihazlardaki</strong> hesap oturumlarınızı
                  sonlandırır. Sadece bu cihazda değil, telefon, tablet ve diğer
                  bilgisayarlarda da çıkış yapılacaktır. Devam etmek
                  istediğinize emin misiniz?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel className="w-full sm:w-auto">
                  Vazgeç
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSignOutAllAccount}
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                >
                  Evet, Çıkış Yap
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-base font-medium">Hesabını Sil</h1>
          <Button
            size={"sm"}
            className="bg-transparent text-primary hover:bg-primary/20"
            onClick={handleDeleteAccount}
            disabled={isLoading}
          >
            {isLoading ? "İşleniyor..." : "Hesabı Sil"}
          </Button>
        </div>
      </div>
    </div>
  );
}
