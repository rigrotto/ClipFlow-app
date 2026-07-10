import type { RefObject } from "react";
import ClipList from "../components/ClipList";
import type { Clip } from "../types/clip";

type HomeProps = {
  clips: Clip[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  searchRef: RefObject<HTMLInputElement | null>;
};

function Home({
  clips,
  searchQuery,
  setSearchQuery,
  selectedIndex,
  setSelectedIndex,
  searchRef,
}: HomeProps) {
  return (
    <main className="content">
      <input
        ref={searchRef}
        type="text"
        placeholder="Search clipboard..."
        className="search"
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
          setSelectedIndex(0);
        }}
      />

      <ClipList
        clips={clips}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </main>
  );
}

export default Home;