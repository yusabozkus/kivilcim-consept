import { NextResponse } from "next/server";
import { getAnnouncement } from "@/lib/actions/announcements.actions";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const announcement = await getAnnouncement(id);
    
    if (!announcement?.coverImage) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Base64 string'i kontrol et
    if (!announcement.coverImage.startsWith('data:image')) {
      // Eğer zaten URL ise, redirect yap
      return NextResponse.redirect(announcement.coverImage);
    }

    // Base64'ten image type'ı çıkar (jpeg, png, etc.)
    const matches = announcement.coverImage.match(/^data:image\/(\w+);base64,/);
    const imageType = matches ? matches[1] : 'jpeg';
    
    // Base64 data kısmını al
    const base64Data = announcement.coverImage.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    
    // Content-Type'ı belirle
    const contentType = `image/${imageType}`;
    
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}