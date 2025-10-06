"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  User,
  Calendar,
  Phone,
  Briefcase,
  Building2,
  Lightbulb,
  FileText,
  Shield,
  MapPin,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export type User = {
  id: string;
  image: string;
  name: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  profession: string;
  department: string;
  skills: string;
  reason: string;
  role: string;
  city: string;
  createdAt: string;
  updatedAt: string;
};

const getRoleBadgeVariant = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "destructive";
    case "editor":
      return "default";
    case "user":
      return "secondary";
    default:
      return "outline";
  }
};
const getRoleLabel = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "Yönetici";
    case "editor":
      return "Editör";
    case "user":
      return "Kullanıcı";
    default:
      return role;
  }
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <User className="h-4 w-4 text-blue-600" />
        <span>İsim</span>
      </div>
    ),
    cell: ({ row }) => {
      const user = row.original;
      const avatarUrl = user.image
        ? user.image
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=3b82f6&color=fff&bold=true`;
      return (
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{user.name}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <Phone className="h-4 w-4 text-green-600" />
        <span>Telefon</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-gray-700">
          {row.getValue("phoneNumber")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <Shield className="h-4 w-4 text-indigo-600" />
        <span>Rol</span>
      </div>
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge 
          variant={getRoleBadgeVariant(role)}
          className="font-medium px-3 py-1"
        >
          {getRoleLabel(role)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "profession",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <Briefcase className="h-4 w-4 text-orange-600" />
        <span>Meslek</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 px-3 py-1 bg-orange-50 rounded-full">
          {row.getValue("profession")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <Building2 className="h-4 w-4 text-cyan-600" />
        <span>Bölüm</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 px-3 py-1 bg-cyan-50 rounded-full">
          {row.getValue("department")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <MapPin className="h-4 w-4 text-red-600" />
        <span>Şehir</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-red-500" />
        <span className="text-sm text-gray-700 font-medium">
          {row.getValue("city")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "skills",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <Lightbulb className="h-4 w-4 text-yellow-600" />
        <span>Yetenekler</span>
      </div>
    ),
    cell: ({ row }) => {
      const skills = row.getValue("skills") as string;
      const skillList = skills?.split(",").slice(0, 2) || [];
      return (
        <div className="flex flex-wrap gap-1.5 max-w-[250px]">
          {skillList.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md border border-yellow-200 font-medium"
            >
              {skill.trim()}
            </span>
          ))}
          {skills?.split(",").length > 2 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
              +{skills.split(",").length - 2}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <FileText className="h-4 w-4 text-slate-600" />
        <span>Sebep</span>
      </div>
    ),
    cell: ({ row }) => {
      const reason = row.getValue("reason") as string;
      return (
        <div className="max-w-[300px]">
          <p className="text-sm text-gray-600 line-clamp-2">
            {reason}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <Calendar className="h-4 w-4 text-pink-600" />
        <span>Doğum Tarihi</span>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("birthDate"));
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            {date.toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <Clock className="h-4 w-4 text-blue-500" />
        <span>Oluşturulma</span>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-gray-700 font-medium">
            {date.toLocaleDateString("tr-TR")}
          </span>
          <span className="text-xs text-gray-500">
            {date.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <div className="flex items-center gap-2 font-semibold">
        <Clock className="h-4 w-4 text-emerald-500" />
        <span>Güncellenme</span>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let timeAgo = "";
      if (diffMins < 60) {
        timeAgo = `${diffMins} dakika önce`;
      } else if (diffHours < 24) {
        timeAgo = `${diffHours} saat önce`;
      } else if (diffDays < 7) {
        timeAgo = `${diffDays} gün önce`;
      } else {
        timeAgo = date.toLocaleDateString("tr-TR");
      }

      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-gray-700 font-medium">
            {date.toLocaleDateString("tr-TR")}
          </span>
          <span className="text-xs text-emerald-600">{timeAgo}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right font-semibold">İşlemler</div>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <span className="sr-only">Menüyü aç</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel className="font-semibold">
                İşlemler
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
                className="cursor-pointer"
              >
                <FileText className="mr-2 h-4 w-4" />
                ID'yi kopyala
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Kullanıcıyı görüntüle
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Detayları görüntüle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];