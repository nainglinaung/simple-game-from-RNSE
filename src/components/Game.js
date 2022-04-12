import React,{useState,useEffect} from 'react';
import { Text, View,StyleSheet,Button } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#ddd",
    flex:1,
  },
  target: {
    fontSize:50,

    margin:50,
    textAlign:"center"
  },

  STATUS_PLAYING: {
    backgroundColor:"#bbb",
  },

  STATUS_WON: {
    backgroundColor:"green",
  },

  STATUS_LOST: {
    backgroundColor:"red",
  },
  randomContainer: {
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:"space-around"
},

})

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}



function Game({randomNumberCount,initalSeconds,ResetGameFunc,gameId}) {

    const [target,setTarget] = useState(0);
    const [guesses,setGuesses] = useState([]);
    const [remainingSeconds,setRemainingSeconds] = useState(initalSeconds);
    const [selectedIds, setSelectedIds] = useState([]);
    const [gameStatus,setGameStatus] = useState("PLAYING");
    // const [sumOfSelectedNumber,setSumOfSelectedNumber] = useState(0);
    const IsselectedIds = (index) => {
        return selectedIds.indexOf(index) >= 0;
    }

    // console.log(selectedIds)
    useEffect(() => {

        let randomNumbers = Array.from({length:randomNumberCount},() => 1 + Math.floor(Math.random() *10));
        setTarget(randomNumbers.slice(0,randomNumbers.length - 2   ) .reduce((sum,n) => sum + n))   
        randomNumbers = shuffleArray(randomNumbers);
    
        setGuesses(randomNumbers)
        setRemainingSeconds(initalSeconds);
        setGameStatus("PLAYING")
        setSelectedIds([])

       

    },[gameId])


    useEffect(() => {

      if (!remainingSeconds) {
        setGameStatus("LOST")
        return;
      }
  

      if (gameStatus == "PLAYING") {
        const timer = setTimeout(() => {
          setRemainingSeconds(remainingSeconds - 1);
        },1000)
        return () => clearTimeout(timer);
      }
 
    },[remainingSeconds])

    useEffect(() => {
      const sumResult = selectedIds.reduce((acc,curr) => {
        return acc + guesses[curr]
     },0);

     if (sumResult < target) {
      setGameStatus("PLAYING")
     }

     if (sumResult == target) {
      setGameStatus("WON")
     }
     
     if (sumResult > target) {
      setGameStatus("LOST")
     }
     
    },[selectedIds])
 
    

    const selectNumber = (index) => {
        setSelectedIds([...selectedIds,index])
    }





  return (<View style={styles.container}>
      <Text style={[styles.target,styles[`STATUS_${gameStatus}`]]}>{target}</Text>
   
      <View style={styles.randomContainer}>
        {guesses.map((guess,index) =>    
            <RandomNumber id={index} isDisabled={IsselectedIds(index) || gameStatus != "PLAYING"}  key={index} guess={guess} onPress={selectNumber} />
        )}
      </View>
      <Text>{remainingSeconds}</Text>
     {gameStatus != "PLAYING" && <Button title="Play Again" onPress={ResetGameFunc}/>}
    </View>
  )
}

Game.propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initalSeconds: PropTypes.number.isRequired,
    ResetGameFunc:PropTypes.func.isRequired,
    gameId:PropTypes.number.isRequired
}

export default Game