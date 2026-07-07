import ClipList from "../components/ClipList";
import type { Clip } from "../types/clip";

type HomeProps = {
  clips: Clip[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

function Home({ clips, searchQuery, setSearchQuery }: HomeProps) {
  return (
    <main className="content">
      <input
        type="text"
        placeholder="Search clipboard..."
        className="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      <ClipList clips={clips} />
    </main>
  );
}

export default Home;