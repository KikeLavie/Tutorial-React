
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

    function Square(props) {
  /*  constructor(props) { // agregamos el constructor para inicializar el estado, que es el que recuerda las cosas.
        super(props); // necesitas siempre llamar a super cuando defines el constructor de un subclase.
        //Todas las clases de componentes de React que tienen un constructor deben empezar con una llamada a super(props)
        this.state = {
            value: null,
        };
        // se elimina el constructor de Square porque el componente ya no hace mas seguimiento del estado del juego.
    }*/

         // cambiamos el metodo render para mostrar el valor del estado actual cuando es clickeado.
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
    }
  
  
  class Board extends React.Component {
      constructor(props) {
          super(props);
          this.state = { //el estado inicial de Board que contenga un arreglo con 9 valores null.
              squares: Array(9).fill(null),
              xIsNext: true, // cada vez que el jugador haga un movimiento, xIsNext(un booleano) será invertido para determinar que jugador sigue y el estado del juego será guardado.
          };
      }

      handleClick(i) { //Actualizamos la función handleclick para invertir el valor de xIsNext.
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
      }

    renderSquare(i) {
        //Necesitamos crear una forma para que el cuadrado actualice el estado del componente Board.
      return (
       <Square
       value={this.state.squares[i]} //instruir cada Square acerca de su valor actual
        onClick={() => this.handleClick(i)}
       />
      );
      //Ahora estamos pasando dos props desde Board a Square: value y onClick.
      //la prop onClick es una función que Square puede llamar cuando sea clickeado.
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  