import ClipList from "../components/ClipList";
import type { Clip } from "../types/clip";

type HomeProps = {
  clips: Clip[];
};

function Home({ clips }: HomeProps) {
  return (
    <main className="content">
      <input
        type="text"
        placeholder="Search clipboard..."
        className="search"
      />

      <ClipList clips={clips} />
    </main>
  );
}

export default Home;