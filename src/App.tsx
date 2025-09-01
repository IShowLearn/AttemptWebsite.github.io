import { useState } from "react";
//import "./App.css"; Don't use! Scss on top
import "./AppExtra.css";

import { StartPage, StartPageTransition, WarFrameMarketApi, LyricsGeneration } from "./Modules";

function App() {
  const [ShowstartPage, SetInvisibleStartPage] = useState(true);

  return (
    <div id="App">
      {LyricsGeneration()}

      {ShowstartPage ? (
        <StartPage Onstart={() => SetInvisibleStartPage(false)} />
      ) : (
        <StartPageTransition />
      )}
    </div>
  );
}

export default App;
