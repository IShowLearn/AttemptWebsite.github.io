import { useState, useEffect } from "react";
import LRCFILE from "./assets/LRCFILESWEATERWEATHER.txt" 

type StartPageProposition = {
  Onstart: () => void;
};

export function Timer({ maxTimeAllotted }: { maxTimeAllotted: number }) {
  const [time, setTime] = useState(0);
  const [visible, setVisible] = useState(true);
  <audio controls autoPlay>
    <source src="https://soundcloud.com/theneighbourhood/sweater-weather-1?utm_source=clipboard&utm_campaign=wtshare&utm_medium=widget&utm_content=https%253A%252F%252Fsoundcloud.com%252Ftheneighbourhood%252Fsweater-weather-1" type="audio/mpeg"/>
  </audio>
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev + 1 >= maxTimeAllotted) {
          clearInterval(interval);
          setVisible(false); // Hide timer when time is up
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, maxTimeAllotted]);

  if (!visible) return null; // Removes the timer from the DOM

  return <h5>{FormatTime(time)}</h5>;
}

export function FormatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedSecs = secs.toString().padStart(2, "0");
  return `${mins}:${paddedSecs}`;
}

export function StartPage({ Onstart }: StartPageProposition) {
  return (
    <div>
      <h1>Welcome to the page!</h1>
      <button onClick={Onstart}>Start!</button>
    </div>
  );
}

export function StartPageTransition() {
  return (
    <div>
      <Timer maxTimeAllotted={1000} />
      <img
        id="logo"
        src="https://preview.redd.it/logo-meaning-v0-87joitmv20mc1.jpeg?auto=webp&s=1364d081e9802fbb48319817af0321a6481543d9"
      />
      <audio src="https://archive.org/embed/TheNeighbourhoodSweaterWeather"></audio>
    </div>
  );
}

export function LyricsGeneration() {

  const [CurrentLyrics, SetLyrics] = useState(String);

  useEffect(
    () => {
      fetch(LRCFILE,{method:"GET"})
      .then(TxtFromDocument => TxtFromDocument.json())
      .then(data => {console.log(data)
          SetLyrics(data)

      })
    },
[]
  )

  return (
    <div>{CurrentLyrics}</div>
  )

}

// example on apis

export function WarFrameMarketApi() {
  const token = "hi1231123123";
  //data = value, settingdata = func to update that value, initstate = init
  const [Data, SettingData] = useState(null);
  useEffect(
    () => {
      //code here
      fetch("https://api.warframe.market/v1/items/lex_prime_blueprint/orders", {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((DataGrabbed) => DataGrabbed.json())
        .then((datafound) => {
          console.log(datafound);
          SettingData(datafound);
        });

      return () => {
        // not necessary atm tho to clean
      };
    },
    [] // to run once only);
  );
  return (
    <div>
      <h1>The Data Grabbed is as Follows:</h1>
      <pre>{JSON.stringify(Data, null, "  |")}</pre>
    </div>
  );
}
