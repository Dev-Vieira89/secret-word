import './App.css';
import {useCallback, useEffect, useState} from 'react';
import { WordList } from './data/Word';

import { StartScreen } from './components/StartScreen';
import { Game } from './components/Game';
import { GameOver } from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

function App() {
  const [gamestage, setGamestage] = useState(stages[0].name);
  const [words] = useState(WordList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] =  useState('');
  const [letters, setPickedLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickedWordCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];
   
    return{word, category};
  };
  
  const startGame = () => {
    const {word, category} = pickedWordCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

   console.log(word, category);
   console.log(wordLetters);

    setPickedWord(word);
    setPickedCategory(category);
    setPickedLetters(wordLetters)



    setGamestage(stages[1].name);
  }
  const nextStep = (letter) => {
    const normalizeLetter = letter.toLowerCase();
    if(guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)){
      return;
    }

    if(letters.includes(normalizeLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter
      ])
    }else{
      setWrongLetters((actualsetWrongLetters) => [
        ...actualsetWrongLetters,
        normalizeLetter
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
    
  };

  useEffect(() => {
    if(guesses <= 0){
      setGamestage(stages[2].name);
    }
  }, [guesses])

  const retry = () => {
    setGamestage(stages[0].name);
  }

  return (
    <div className="App">
      {gamestage === 'start' && <StartScreen startGame={startGame}/>}
      {gamestage === 'game' && <Game 
        nextStep={nextStep} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gamestage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
