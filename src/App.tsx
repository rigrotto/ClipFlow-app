import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

import { checkClipboard } from "./services/clipboard";
import {
  initDatabase,
  loadClips,
  saveClip,
} from "./services/database";

import { useClipStore } from "./stores/ClipStore";

function App() {
  const [selected, setSelected] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    clips,
    addClip,
    setClipsFromDatabase,
    isMonitoring,
    theme,
  } = useClipStore();

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("theme-light", "theme-dark");

    if (theme === "light") {
      root.classList.add("theme-light");
    } else if (theme === "dark") {
      root.classList.add("theme-dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.classList.add(
        prefersDark ? "theme-dark" : "theme-light"
      );
    }
  }, [theme]);

  // Load database
  useEffect(() => {
    async function setupDatabase() {
      await initDatabase();
      const savedClips = await loadClips();
      setClipsFromDatabase(savedClips);
    }

    setupDatabase();
  }, [setClipsFromDatabase]);

  // Clipboard monitor
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isMonitoring) return;

      const newClip = await checkClipboard();

      if (newClip) {
        addClip(newClip);
        await saveClip(newClip);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [addClip, isMonitoring]);

  const filteredClips = clips.filter((clip) => {
    const matchesSearch = clip.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      selected === "all" ||
      selected === clip.type ||
      (selected === "pinned" && clip.pinned);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <Sidebar
        selected={selected}
        onSelect={setSelected}
      />

      {selected === "settings" ? (
        <Settings />
      ) : (
        <Home
          clips={filteredClips}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );
}

export default App;