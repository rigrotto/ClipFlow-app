import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ClipList from "./components/ClipList";
import Settings from "./pages/Settings";
import type { Clip } from "./types/clip";

function App() {
  const [selected, setSelected] = useState("all");

  const clips: Clip[] = [
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
  ];

  return (
    <div className="app">
      <Sidebar selected={selected} onSelect={setSelected} />

      {selected === "settings" ? (
        <Settings />
      ) : (
        <main className="content">
          <input
            type="text"
            placeholder="Search clipboard..."
            className="search"
          />

          <ClipList clips={clips} />
        </main>
      )}
    </div>
  );
}

export default App;