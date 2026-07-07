import { useEffect, useState } from "react";
import { checkClipboard } from "./services/clipboard";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import type { Clip } from "./types/clip";

function App() {
  const [selected, setSelected] = useState("all");

  const [clips, setClips] = useState<Clip[]>([
    {
      id: "1",
      type: "text",
      content: "Hello World",
      pinned: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      type: "link",
      content: "https://clipflow.app",
      pinned: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      type: "text",
      content: "npm run tauri dev",
      pinned: true,
      createdAt: new Date(),
    },
  ]);

  useEffect(() => {
  const interval = setInterval(async () => {
    const newClip = await checkClipboard();

    if (newClip) {
      setClips((currentClips) => [newClip, ...currentClips]);
    }
  }, 500);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="app">
      <Sidebar selected={selected} onSelect={setSelected} />

      {selected === "settings" ? (
        <Settings />
      ) : (
        <Home clips={clips} />
      )}
    </div>
  );
}

export default App;