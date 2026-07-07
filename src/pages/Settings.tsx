import { useClipStore } from "../stores/ClipStore";

function Settings() {
  const { clips, clearClips, isMonitoring, toggleMonitoring } = useClipStore();

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
          <h3>Clear History</h3>
          <p>{clips.length} clips saved this session.</p>
        </div>

        <button onClick={clearClips}>Clear</button>
      </div>
    </main>
  );
}

export default Settings;