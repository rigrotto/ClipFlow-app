import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Clip } from "../types/clip";

const MAX_HISTORY = 500;

type ClipStore = {
  clips: Clip[];
  isMonitoring: boolean;
  addClip: (clip: Clip) => void;
  clearClips: () => void;
  toggleMonitoring: () => void;
  togglePin: (id: string) => void;
  deleteClip: (id: string) => void;
};

const ClipStoreContext = createContext<ClipStore | null>(null);

export function ClipStoreProvider({ children }: { children: ReactNode }) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  function addClip(clip: Clip) {
    setClips((currentClips) => {
      const withoutDuplicate = currentClips.filter(
        (item) => item.content !== clip.content
      );

      return [clip, ...withoutDuplicate].slice(0, MAX_HISTORY);
    });
  }

  function clearClips() {
    setClips([]);
  }

  function toggleMonitoring() {
    setIsMonitoring((current) => !current);
  }

  function togglePin(id: string) {
  setClips((currentClips) =>
    currentClips
      .map((clip) =>
        clip.id === id ? { ...clip, pinned: !clip.pinned } : clip
      )
      .sort((a, b) => Number(b.pinned) - Number(a.pinned))
  );
}

function deleteClip(id: string) {
  setClips((currentClips) =>
    currentClips.filter((clip) => clip.id !== id)
  );
}

  return (
    <ClipStoreContext.Provider
      value={{
        clips,
        isMonitoring,
        addClip,
        clearClips,
        toggleMonitoring,
        togglePin,
        deleteClip,
      }}
    >
      {children}
    </ClipStoreContext.Provider>
  );
}

export function useClipStore() {
  const context = useContext(ClipStoreContext);

  if (!context) {
    throw new Error("useClipStore must be used inside ClipStoreProvider");
  }

  return context;
}