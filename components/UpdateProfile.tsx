import { auth } from "@/lib/auth";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "./ui/button";
import {
  Check,
  ChevronsUpDown,
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Upload,
} from "lucide-react";
import { provinces } from "@/constants";
import { cn } from "@/lib/utils";
import { updateProfile, updateProfileImage } from "@/lib/actions/auth-actions";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session;
};

export default function UpdateProfile({ session }: Props) {
  const { user } = session;
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profession: user.profession,
    department: user.department,
    city: user.city,
  });
  const [profileImage, setProfileImage] = useState(user.image || "");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        updateProfileImage(user.id, base64String).then((res) => {
          if (res.success) {
            toast.success(res.message);
            router.refresh();
          } else {
            toast.error(res.message);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const result = await updateProfile(user.id, {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        profession: form.profession,
        department: form.department,
        city: form.city,
      });

      if (result.success) {
        toast.success("Profile updated successfully!");
        router.refresh();
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Unable to update profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-black mb-2">
            Profile details
          </h3>
          <p className="text-sm text-black/50">
            View and edit your personal information
          </p>
        </div>

        <div className="my-10">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <div
                className="relative group cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  className="size-16 rounded-full ring-4 ring-white shadow-lg"
                  src={profileImage}
                  alt={session.user.name}
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Upload size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 size-4 rounded-full ring-2 ring-white"></div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {session.user.name}
                </h1>
                <p className="text-sm text-gray-600">{session.user.email}</p>
              </div>
            </div>
            <div className="capitalize bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
              {session.user.role}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <User size={16} className="text-gray-400" />
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 h-11 transition-all"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <Mail size={16} className="text-gray-400" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 h-11 transition-all"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <Phone size={16} className="text-gray-400" />
              Phone number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 h-11 transition-all"
              value={form.phoneNumber || ""}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="birthDate"
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <Calendar size={16} className="text-gray-400" />
              Birth year
            </Label>
            <Input
              id="birthDate"
              name="birthDate"
              className="bg-gray-50 border-gray-200 h-11 cursor-not-allowed"
              value={
                user.birthDate
                  ? format(new Date(user.birthDate), "d MMMM yyyy", {
                      locale: enUS,
                    })
                  : ""
              }
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="profession"
                className="text-sm text-gray-600 flex items-center gap-2"
              >
                <Briefcase size={16} className="text-gray-400" />
                Profession
              </Label>
              <Input
                id="profession"
                name="profession"
                className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 h-11 transition-all"
                value={form.profession || ""}
                onChange={(e) =>
                  setForm({ ...form, profession: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="department"
                className="text-sm text-gray-600 flex items-center gap-2"
              >
                <GraduationCap size={16} className="text-gray-400" />
                Field of study
              </Label>
              <Input
                id="department"
                name="department"
                className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 h-11 transition-all"
                value={form.department || ""}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="city"
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <MapPin size={16} className="text-gray-400" />
              City
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full h-11 text-left flex flex-row items-center justify-between bg-white border-gray-200 hover:bg-gray-50 focus:border-primary focus:ring-primary/20 transition-all"
                >
                  <span className="text-gray-900">
                    {form.city || "Select a city"}
                  </span>
                  <ChevronsUpDown size={16} className="text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search cities..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup>
                      {Object.entries(provinces).map(([key, name]) => (
                        <CommandItem
                          key={key}
                          value={name}
                          onSelect={(currentValue) => {
                            setForm({ ...form, city: currentValue });
                            setOpen(false);
                          }}
                        >
                          {name}
                          <Check
                            className={cn(
                              "ml-auto",
                              form.city === name ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="bg-[#ffffff94] rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-gray-400" />
            <span className="text-gray-600">Member since:</span>
            <span className="text-gray-900 font-medium">
              {format(new Date(user.createdAt), "d MMMM yyyy, HH:mm", {
                locale: enUS,
              })}
            </span>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full h-11 bg-primary/80 hover:bg-primary text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && <Spinner />}
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
