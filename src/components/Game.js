import { useState, useRef } from 'react';
import './Game.css';

export const Game = ({nextStep, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
    const [letter, setLetter] = useState();
    const letterInputRef = useRef(null);

    const handleSubmit = (e) =>{
        e.preventDefault();
        nextStep(letter);
        setLetter("");
        letterInputRef.current.focus();
    }

    return(
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className="tip">Dica da palavra: <span>{pickedCategory}</span></h3>
            <p>você ainda tem {guesses} tentativa(s)</p>

            <div className="wordContainer">
                {letters.map((letters, i) => (
                    guessedLetters.includes(letters) ? (
                        <span key={i} className="letter">{letters}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
            </div>

            <div className="letterContainer">
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name="letter" 
                    maxLength="1" 
                    require 
                    focus
                    onChange={(e) => setLetter(e.target.value)} 
                    value={letter}
                    ref={letterInputRef}
                    />
                    <button>Jogar</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras erradas utilizadas:</p>
                {wrongLetters.map((letters, i) => (
                    <span key={i}>{letters},</span>
                ))}
            </div>
            
        </div>
    )
}