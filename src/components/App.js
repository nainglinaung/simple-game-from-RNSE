import React,{useState} from 'react';
import Game from './Game';


function App() {

  const [gameId,setGameId] = useState(1);
  console.log(gameId);
  const ResetGameFunc = () => {
    console.log("hi")
      setGameId(gameId + 1);
  }

  return (
    <Game randomNumberCount={6} initalSeconds={10} gameId={gameId} ResetGameFunc={ResetGameFunc}/>
  )
}

export default App