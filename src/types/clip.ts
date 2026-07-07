export type ClipType = "text" | "link" | "image" | "file";

export interface Clip {
  id: string;
  type: ClipType;
  content: string;
  pinned: boolean;
  createdAt: Date;
}