import {
  ClipboardList,
  FileText,
  Link,
  Image,
  Palette,
  Pin,
  Settings,
} from "lucide-react";

type SidebarProps = {
  selected: string;
  onSelect: (page: string) => void;
};

function Sidebar({ selected, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">CLIPFLOW</div>

      <div className="sidebar-section">
        <div className="sidebar-label">Library</div>

        <button className={selected === "all" ? "active" : ""} onClick={() => onSelect("all")}>
          <ClipboardList size={16} />
          All Clips
        </button>

        <button>
          <FileText size={16} />
          Text
        </button>

        <button>
          <Link size={16} />
          Links
        </button>

        <button>
          <Image size={16} />
          Images
        </button>

        <button>
          <Palette size={16} />
          Colours
        </button>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">General</div>

        <button className={selected === "pinned" ? "active" : ""} onClick={() => onSelect("pinned")}>
          <Pin size={16} />
          Pinned
        </button>
      </div>

      <div className="bottom">
        <button className={selected === "settings" ? "active" : ""} onClick={() => onSelect("settings")}>
          <Settings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;