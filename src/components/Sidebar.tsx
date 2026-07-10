import logo from "../assets/logo.png";
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
      <div className="sidebar-header">
        <img src={logo} alt="ClipFlow" className="sidebar-logo" />
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Library</div>

        <button className={selected === "all" ? "active" : ""} onClick={() => onSelect("all")}>
          <ClipboardList size={16} />
          All Clips
        </button>

        <button className={selected === "text" ? "active" : ""} onClick={() => onSelect("text")}>
  <FileText size={16} />
  Text
</button>

        <button className={selected === "link" ? "active" : ""} onClick={() => onSelect("link")}>
  <Link size={16} />
  Links
</button>

        <button className={selected === "image" ? "active" : ""} onClick={() => onSelect("image")}>
  <Image size={16} />
  Images
</button>

        <button className={selected === "colour" ? "active" : ""} onClick={() => onSelect("colour")}>
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