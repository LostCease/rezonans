import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/tracks").then((res) => {
      setTracks(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🎵 Музяка</h1>
      <ul>
        {tracks.map((track, i) => (
          <li key={i} style={{ marginBottom: 10 }}>
            <button onClick={() => setCurrent(track.url)}>{track.name}</button>
          </li>
        ))}
      </ul>
      {current && (
        <audio controls autoPlay style={{ marginTop: 20, width: "100%" }}>
          <source src={current} type="audio/mpeg" />
          Ваш браузер не поддерживает аудио.
        </audio>
      )}
    </div>
  );
}

export default App;
