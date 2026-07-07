import { readText, writeText } from "@tauri-apps/plugin-clipboard-manager";
import type { Clip } from "../types/clip";

let lastClipboardText = "";

export async function checkClipboard(): Promise<Clip | null> {
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