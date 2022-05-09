import { useEffect, useState } from "react";
import "./App.css";
import Animation from "./components/Animation";

function App() {
  const [sprites, setSprites] = useState();

  useEffect(() => {
    loadSprites();
  }, []);

  async function loadSprites() {
    const response = await fetch("/5f");
    const data = new Uint8Array(await response.arrayBuffer());
    setSprites(data);
  }

  return (
    <div className="App">
      <Animation sprites={sprites} />
    </div>
  );
}

export default App;
