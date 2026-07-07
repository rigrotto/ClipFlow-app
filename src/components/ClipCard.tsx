import type { Clip } from "../types/clip";

type ClipCardProps = {
  clip: Clip;
};

function ClipCard({ clip }: ClipCardProps) {
  return (
    <div className="clip">
      <p>{clip.content}</p>
    </div>
  );
}

export default ClipCard;