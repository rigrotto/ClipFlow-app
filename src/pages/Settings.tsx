import { useClipStore } from "../stores/ClipStore";

function Settings() {
  const {
  clips,
  clearClips,
  isMonitoring,
  toggleMonitoring,
  maxHistory,
  setMaxHistory,
  theme,
  setTheme,
} = useClipStore();

  return (
    <main className="content">
      <h1>Settings</h1>

      <div className="settings-card">
        <div>
          <h3>Clipboard Monitoring</h3>
          <p>{isMonitoring ? "ClipFlow is saving copied text." : "ClipFlow is paused."}</p>
        </div>

        <button onClick={toggleMonitoring}>
          {isMonitoring ? "Pause" : "Resume"}
        </button>
      </div>

      <div className="settings-card">
  <div>
    <h3>Theme</h3>
    <p>Choose how ClipFlow looks.</p>
  </div>

  <select
    value={theme}
    onChange={(e) =>
      setTheme(e.target.value as "system" | "light" | "dark")
    }
  >
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</div>

      <div className="settings-card">
  <div>
    <h3>Maximum History</h3>
    <p>Choose how many clipboard items ClipFlow keeps.</p>
  </div>

  <select
    value={maxHistory}
    onChange={(e) => setMaxHistory(Number(e.target.value))}
  >
    <option value={100}>100</option>
    <option value={250}>250</option>
    <option value={500}>500</option>
    <option value={1000}>1000</option>
    <option value={5000}>5000</option>
  </select>
</div>

<div className="settings-card">
  <div>
    <h3>Image History</h3>
    <p>Automatically delete saved images after this time.</p>
  </div>

  <select
    value="1-week"
    onChange={() => {}}
  >
    <option value="never">Never</option>
    <option value="1-day">1 Day</option>
    <option value="1-week">1 Week</option>
    <option value="1-month">1 Month</option>
  </select>
</div>



      <div className="settings-card">
        <div>
          <h3>Clear History</h3>
          <p>{clips.length} clips saved this session.</p>
        </div>

        <button onClick={clearClips}>Clear</button>
      </div>
    </main>
  );
}

export default Settings;