import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Clip } from "../types/clip";

const MAX_HISTORY = 500;

type ClipStore = {
  clips: Clip[];
  addClip: (clip: Clip) => void;
  clearClips: () => void;
};

const ClipStoreContext = createContext<ClipStore | null>(null);

export function ClipStoreProvider({ children }: { children: ReactNode }) {
  const [clips, setClips] = useState<Clip[]>([]);

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

  return (
    <ClipStoreContext.Provider value={{ clips, addClip, clearClips }}>
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