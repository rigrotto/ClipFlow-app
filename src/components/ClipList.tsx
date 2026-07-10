import ClipCard from "./ClipCard";
import type { Clip } from "../types/clip";

type ClipListProps = {
  clips: Clip[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

function ClipList({
  clips,
  selectedIndex,
  setSelectedIndex,
}: ClipListProps) {
  return (
    <div className="clip-list">
      {clips.map((clip, index) => (
        <ClipCard
          key={clip.id}
          clip={clip}
          selected={index === selectedIndex}
          onSelect={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
}

export default ClipList;