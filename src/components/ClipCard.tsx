import { useState } from "react";
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

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div className="clip" onClick={handleClick}>
      <p>{copied ? "✓ Copied!" : clip.content}</p>
    </div>
  );
}

export default ClipCard;