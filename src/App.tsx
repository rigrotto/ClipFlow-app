import { useEffect, useRef, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

import {
  checkClipboard,
  copyImageToClipboard,
  copyToClipboard,
} from "./services/clipboard";

import {
  initDatabase,
  loadClips,
  saveClip,
} from "./services/database";

import { useClipStore } from "./stores/ClipStore";

function App() {
  const [selected, setSelected] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchRef = useRef<HTMLInputElement>(null);

  const {
    clips,
    addClip,
    setClipsFromDatabase,
    isMonitoring,
    theme,
    togglePin,
    deleteClip,
  } = useClipStore();

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

  useEffect(() => {
    if (selectedIndex >= filteredClips.length) {
      setSelectedIndex(Math.max(filteredClips.length - 1, 0));
    }
  }, [filteredClips.length, selectedIndex]);

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

  useEffect(() => {
    async function setupDatabase() {
      await initDatabase();
      const savedClips = await loadClips();
      setClipsFromDatabase(savedClips);
    }

    setupDatabase();
  }, [setClipsFromDatabase]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isMonitoring) return;

      const newClip = await checkClipboard();

      if (newClip) {
        addClip(newClip);
        await saveClip(newClip);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [addClip, isMonitoring]);

  useEffect(() => {
    async function handleKeyDown(event: KeyboardEvent) {
      if (selected === "settings") return;

      const currentClip = filteredClips[selectedIndex];
      const searchIsFocused =
        document.activeElement === searchRef.current;

      if (event.key === "ArrowDown") {
        event.preventDefault();

        setSelectedIndex((current) =>
          Math.min(current + 1, filteredClips.length - 1)
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => Math.max(current - 1, 0));
        return;
      }

      if (event.key === "Enter" && currentClip && !searchIsFocused) {
        event.preventDefault();

        if (currentClip.type === "image" && currentClip.imageDataUrl) {
          await copyImageToClipboard(currentClip.imageDataUrl);
        } else {
          await copyToClipboard(currentClip.content);
        }

        return;
      }

      if (
        event.key.toLowerCase() === "p" &&
        currentClip &&
        !searchIsFocused
      ) {
        event.preventDefault();
        await togglePin(currentClip.id);
        return;
      }

      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        currentClip &&
        !searchIsFocused
      ) {
        event.preventDefault();
        await deleteClip(currentClip.id);
        return;
      }

      if (event.key === "/" && !searchIsFocused) {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setSearchQuery("");
        searchRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    deleteClip,
    filteredClips,
    selected,
    selectedIndex,
    togglePin,
  ]);

  return (
    <div className="app">
      <Sidebar
        selected={selected}
        onSelect={(page) => {
          setSelected(page);
          setSelectedIndex(0);
        }}
      />

      {selected === "settings" ? (
        <Settings />
      ) : (
        <Home
          clips={filteredClips}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          searchRef={searchRef}
        />
      )}
    </div>
  );
}

export default App;