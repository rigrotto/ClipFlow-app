import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <Sidebar selected="all" />

      <main className="content">
        <input
          type="text"
          placeholder="Search clipboard..."
          className="search"
        />

        <div className="clip-list">
          <div className="clip">
            <p>Hello World</p>
          </div>

          <div className="clip">
            <p>https://clipflow.app</p>
          </div>

          <div className="clip">
            <p>npm run tauri dev</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;