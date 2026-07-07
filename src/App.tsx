import { useEffect, useState } from "react";
import { checkClipboard } from "./services/clipboard";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { useClipStore } from "./stores/ClipStore";
import { initDatabase, saveClip } from "./services/database";

function App() {
  const [selected, setSelected] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { clips, addClip } = useClipStore();
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
  initDatabase();
}, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newClip = await checkClipboard();

      if (newClip) {
  addClip(newClip);
  await saveClip(newClip);
}
    }, 500);
console.log("selected:", selected);
console.log("clips:", clips);
console.log("filtered:", filteredClips);

    return () => clearInterval(interval);
  }, [addClip]);

  return (
    <div className="app">
      <Sidebar selected={selected} onSelect={setSelected} />

      {selected === "settings" ? <Settings /> : <Home
  clips={filteredClips}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
/>}
    </div>
  );
}

export default App;