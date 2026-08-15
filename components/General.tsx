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
      toast.error("User information not found");
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
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // if (!session?.user?.id) {
    //   toast.error("User information could not be found");
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
            General settings
          </h3>
          <p className="text-sm text-black/50">
            Manage general preferences for your account
          </p>
        </div>

        <div className="flex flex-row items-center justify-between mt-10">
          <h1 className="text-base font-medium">Sign out from all devices</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size={"sm"}
                className="bg-transparent text-primary hover:bg-primary/20"
                disabled={isLoading}
              >
                {isLoading ? "Working..." : "Sign out"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90vw] max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg font-semibold">
                  Sign out from every device?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-muted-foreground">
                  This will end your account sessions on
                  <strong> every device</strong>, including phones, tablets,
                  and other computers. Are you sure you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel className="w-full sm:w-auto">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSignOutAllAccount}
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                >
                  Yes, sign out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-base font-medium">Delete account</h1>
          <Button
            size={"sm"}
            className="bg-transparent text-primary hover:bg-primary/20"
            onClick={handleDeleteAccount}
            disabled={isLoading}
          >
            {isLoading ? "Working..." : "Delete account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
