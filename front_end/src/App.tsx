import { useState } from "react";
import { Header, Home, Player } from "./components";
import { Routes, Route } from "react-router-dom";

function App() {
  const host = window.location.href.includes('localhost')? "http://localhost/":'/';
  const [url, setUrl] = useState<string>("Pr_0Gi780tc");
  
  console.log("App rendered");
  console.log(host)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home setUrl={setUrl} host={host} />} />
        <Route path="/watch" element={<Player url={url} />} />
      </Routes>
    </>
  );
}

export default App;
