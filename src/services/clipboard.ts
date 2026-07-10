import {
  readText,
  writeText,
  readImage,
  writeImage,
} from "@tauri-apps/plugin-clipboard-manager";
import type { Clip } from "../types/clip";

let lastClipboardText = "";
let lastImageSignature = "";

async function imageToDataUrl(): Promise<{
  dataUrl: string;
  width: number;
  height: number;
} | null> {
  try {
    const image = await readImage();
    const size = await image.size();
    const MAX_IMAGE_PIXELS = 1_500_000;

if (size.width * size.height > MAX_IMAGE_PIXELS) {
  return null;
}
    const rgba = await image.rgba();

    const signature = `${size.width}x${size.height}-${rgba.length}-${rgba[0]}-${rgba[1]}-${rgba[2]}`;

    if (signature === lastImageSignature) {
      return null;
    }

    lastImageSignature = signature;

    const canvas = document.createElement("canvas");
    canvas.width = size.width;
    canvas.height = size.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const imageData = new ImageData(
      new Uint8ClampedArray(rgba),
      size.width,
      size.height
    );

    ctx.putImageData(imageData, 0, 0);

    return {
      dataUrl: canvas.toDataURL("image/png"),
      width: size.width,
      height: size.height,
    };
  } catch {
    return null;
  }
}

export async function checkClipboard(): Promise<Clip | null> {
  const imageClip = await imageToDataUrl();

  if (imageClip) {
    return {
      id: crypto.randomUUID(),
      type: "image",
      content: `Image ${imageClip.width}×${imageClip.height}`,
      pinned: false,
      createdAt: new Date(),
      imageDataUrl: imageClip.dataUrl,
    };
  }

  const text = await readText();

  if (!text || text === lastClipboardText) {
    return null;
  }

  lastClipboardText = text;

  return {
    id: crypto.randomUUID(),
    type: text.startsWith("http") ? "link" : "text",
    content: text,
    pinned: false,
    createdAt: new Date(),
  };
}

export async function copyToClipboard(text: string): Promise<void> {
  await writeText(text);
}

export async function copyImageToClipboard(dataUrl: string): Promise<void> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const buffer = await blob.arrayBuffer();

  await writeImage(buffer);
}