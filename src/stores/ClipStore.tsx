import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Clip } from "../types/clip";
import { loadSettings, saveSettings } from "../services/settings";
import {
  updateClipPinned,
  deleteClipFromDatabase,
  clearClipsFromDatabase,
} from "../services/database";

type ThemeMode = "system" | "light" | "dark";

type ClipStore = {
  clips: Clip[];
  isMonitoring: boolean;
  maxHistory: number;
  theme: ThemeMode;

  addClip: (clip: Clip) => void;
  clearClips: () => void;
  toggleMonitoring: () => void;
  togglePin: (id: string) => void;
  deleteClip: (id: string) => void;
  setClipsFromDatabase: (clips: Clip[]) => void;
  setMaxHistory: (value: number) => void;
  setTheme: (theme: ThemeMode) => void;
};

const ClipStoreContext = createContext<ClipStore | null>(null);

export function ClipStoreProvider({ children }: { children: ReactNode }) {
  const initialSettings = loadSettings();

  const [clips, setClips] = useState<Clip[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(
    initialSettings.monitoringEnabled
  );
  const [maxHistory, setMaxHistoryState] = useState(
    initialSettings.maxHistory
  );
  const [theme, setThemeState] = useState<ThemeMode>(initialSettings.theme);

  function addClip(clip: Clip) {
    setClips((currentClips) => {
      const withoutDuplicate = currentClips.filter(
        (item) => item.content !== clip.content
      );

      return [clip, ...withoutDuplicate].slice(0, maxHistory);
    });
  }

  function setClipsFromDatabase(clipsFromDatabase: Clip[]) {
    setClips(clipsFromDatabase.slice(0, maxHistory));
  }

  async function clearClips() {
    setClips([]);
    await clearClipsFromDatabase();
  }

  function toggleMonitoring() {
    setIsMonitoring((current) => {
      const updated = !current;

      saveSettings({
        ...loadSettings(),
        monitoringEnabled: updated,
        maxHistory,
        theme,
      });

      return updated;
    });
  }

  function setMaxHistory(value: number) {
    setMaxHistoryState(value);
    setClips((currentClips) => currentClips.slice(0, value));

    saveSettings({
      ...loadSettings(),
      monitoringEnabled: isMonitoring,
      maxHistory: value,
      theme,
    });
  }

  function setTheme(themeValue: ThemeMode) {
    setThemeState(themeValue);

    saveSettings({
      ...loadSettings(),
      theme: themeValue,
      maxHistory,
      monitoringEnabled: isMonitoring,
    });
  }

  async function togglePin(id: string) {
    let updatedPinned = false;

    setClips((currentClips) => {
      const updatedClips = currentClips
        .map((clip) => {
          if (clip.id === id) {
            updatedPinned = !clip.pinned;
            return { ...clip, pinned: updatedPinned };
          }

          return clip;
        })
        .sort((a, b) => Number(b.pinned) - Number(a.pinned));

      return updatedClips;
    });

    await updateClipPinned(id, updatedPinned);
  }

  async function deleteClip(id: string) {
    setClips((currentClips) =>
      currentClips.filter((clip) => clip.id !== id)
    );

    await deleteClipFromDatabase(id);
  }

  return (
    <ClipStoreContext.Provider
      value={{
        clips,
        isMonitoring,
        maxHistory,
        theme,
        addClip,
        clearClips,
        toggleMonitoring,
        togglePin,
        deleteClip,
        setClipsFromDatabase,
        setMaxHistory,
        setTheme,
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