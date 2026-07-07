type SidebarProps = {
  selected: string;
  onSelect: (page: string) => void;
};

function Sidebar({ selected, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>ClipFlow</h2>

      <button
        className={selected === "all" ? "active" : ""}
        onClick={() => onSelect("all")}
      >
        📋 All
      </button>

      <button
        className={selected === "pinned" ? "active" : ""}
        onClick={() => onSelect("pinned")}
      >
        📌 Pinned
      </button>

      <div className="bottom">
        <button
          className={selected === "settings" ? "active" : ""}
          onClick={() => onSelect("settings")}
        >
          ⚙️ Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;