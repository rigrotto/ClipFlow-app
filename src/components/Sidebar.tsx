type SidebarProps = {
  selected: string;
};

function Sidebar({ selected }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>ClipFlow</h2>

      <button className={selected === "all" ? "active" : ""}>
        📋 All
      </button>

      <button className={selected === "pinned" ? "active" : ""}>
        📌 Pinned
      </button>

      <div className="bottom">
        <button>
          ⚙️ Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;