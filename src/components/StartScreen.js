import './StartScreen.css'

export const StartScreen = ({startGame}) => {

    return(
        <div className="start" >
            <h1>ADIVINHE AS PALAVRAS</h1>
            <p>Jogue <b>ADIVINHE AS PALAVRAS</b> e teste seus conhecimentos em Biossistemas e Processos Biológicos</p>
            <button onClick={startGame}>Começar Jogo</button>
        </div>
    )
}