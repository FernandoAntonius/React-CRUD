import { useState } from "react";
import "./App.css";
import Header from "./components/Header"; // Import Component Header
import Mahasiswa from "./components/Mahasiswa";
import Visi from "./components/Visi";
import Misi from "./components/Misi";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  function handleVote() {
    setCount(count + 1); // Menambahkan nilai count 1
  }

  // const handlevote2 = () => setCount2(count2 + 1)

  function handleVote2() {
    setCount2(count2 + 1); // Menambahkan nilai count 1
  }

  function resetVote() {
    setCount(0);
    setCount2(0);
  }

  return (
    <>
      {/* Panggil component */}
      <Header></Header>
      <button onClick={resetVote}>RESET VOTE</button>
      <hr />
      <Mahasiswa nama="Fernando" skill="Mobile Programming"></Mahasiswa>
      <Visi visi="visi1"></Visi>
      <Misi misi="misi1"></Misi>
      <button onClick={handleVote}>Vote : {count}</button>

      <hr />
      <Mahasiswa nama="Adit"></Mahasiswa>
      <Visi visi="visi2"></Visi>
      <Misi misi="misi2"></Misi>
      <button onClick={handleVote2}>Vote : {count2}</button>
    </>
  );
}

export default App;
