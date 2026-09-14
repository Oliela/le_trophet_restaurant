import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;

    const response = await handleUpload({
      request,
      body,

      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/avif",
        ],
        maximumSizeInBytes: MAX_IMAGE_SIZE,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({
          adminId: session.adminId,
        }),
      }),

      onUploadCompleted: async () => {
        // L’URL sera enregistrée avec l’événement.
      },
    });

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "L’image n’a pas pu être envoyée." },
      { status: 400 },
    );
  }
}