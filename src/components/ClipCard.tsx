import { useState } from "react";
import { FileText, Link as LinkIcon, Check } from "lucide-react";
import { copyToClipboard } from "../services/clipboard";
import type { Clip } from "../types/clip";

type ClipCardProps = {
  clip: Clip;
};

function ClipCard({ clip }: ClipCardProps) {
  const [copied, setCopied] = useState(false);

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
          {clip.type === "link" ? "Link" : "Text"} · Just now
        </span>
      </div>
    </div>
  );
}

export default ClipCard;