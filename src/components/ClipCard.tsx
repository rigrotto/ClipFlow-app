import { useState } from "react";
import {
  FileText,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
  Pin,
  Trash2,
} from "lucide-react";

import { useClipStore } from "../stores/ClipStore";
import type { Clip } from "../types/clip";
import {
  copyToClipboard,
  copyImageToClipboard,
} from "../services/clipboard";

type ClipCardProps = {
  clip: Clip;
  selected: boolean;
  onSelect: () => void;
};

function ClipCard({
  clip,
  selected,
  onSelect,
}: ClipCardProps) {
  const [copied, setCopied] = useState(false);
  const { togglePin, deleteClip } = useClipStore();

  async function handleClick() {
    onSelect();

    if (clip.type === "image" && clip.imageDataUrl) {
      await copyImageToClipboard(clip.imageDataUrl);
    } else {
      await copyToClipboard(clip.content);
    }

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  const Icon =
    clip.type === "image"
      ? ImageIcon
      : clip.type === "link"
        ? LinkIcon
        : FileText;

  return (
    <div
      className={`clip ${selected ? "selected" : ""}`}
      onMouseEnter={onSelect}
      onClick={handleClick}
    >
      <div className="clip-icon">
        {copied ? <Check size={16} /> : <Icon size={16} />}
      </div>

      <div className="clip-body">
        {clip.type === "image" && clip.imageDataUrl ? (
          <img
            src={clip.imageDataUrl}
            alt="Clipboard preview"
            className="clip-image-preview"
          />
        ) : null}

        <p className="clip-content">
          {copied ? "Copied!" : clip.content}
        </p>

        <span className="clip-meta">
          {clip.pinned
            ? "Pinned"
            : clip.type === "image"
              ? "Image"
              : clip.type === "link"
                ? "Link"
                : "Text"}{" "}
          · Just now
        </span>
      </div>

      <div className="clip-actions">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
            void togglePin(clip.id);
          }}
          title={clip.pinned ? "Unpin" : "Pin"}
          aria-label={clip.pinned ? "Unpin clip" : "Pin clip"}
        >
          <Pin size={15} />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
            void deleteClip(clip.id);
          }}
          title="Delete"
          aria-label="Delete clip"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

export default ClipCard;