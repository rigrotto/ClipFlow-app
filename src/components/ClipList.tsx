import ClipCard from "./ClipCard";
import type { Clip } from "../types/clip";

type ClipListProps = {
  clips: Clip[];
};

function ClipList({ clips }: ClipListProps) {
  return (
    <div className="clip-list">
      {clips.map((clip) => (
        <ClipCard key={clip.id} clip={clip} />
      ))}
    </div>
  );
}

export default ClipList;