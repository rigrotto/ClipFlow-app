import { useState } from "react";
import { FileText, Link as LinkIcon, Check, Pin, Trash2 } from "lucide-react";
import { copyToClipboard } from "../services/clipboard";
import { useClipStore } from "../stores/ClipStore";
import type { Clip } from "../types/clip";

type ClipCardProps = {
  clip: Clip;
};

function ClipCard({ clip }: ClipCardProps) {
  const [copied, setCopied] = useState(false);
  const { togglePin, deleteClip } = useClipStore();

  async function handleClick() {
    await copyToClipboard(clip.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  const Icon = clip.type === "link" ? LinkIcon : FileText;

  return (
    <div className="clip" onClick={handleClick}>
      <div className="clip-icon">
        {copied ? <Check size={16} /> : <Icon size={16} />}
      </div>

      <div className="clip-body">
        <p className="clip-content">{copied ? "Copied!" : clip.content}</p>
        <span className="clip-meta">
          {clip.pinned ? "Pinned" : clip.type === "link" ? "Link" : "Text"} · Just now
        </span>
      </div>

      <div className="clip-actions">
        <button
          onClick={(event) => {
            event.stopPropagation();
            togglePin(clip.id);
          }}
          title="Pin"
        >
          <Pin size={15} />
        </button>

        <button
          onClick={(event) => {
            event.stopPropagation();
            deleteClip(clip.id);
          }}
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

export default ClipCard;