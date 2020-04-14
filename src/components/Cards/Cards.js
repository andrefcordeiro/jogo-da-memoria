import React from "react";
import { Howl, Howler } from 'howler'
import "./Cards.css";
import Functions from "./Functions"

class Cards extends React.Component {

  state = {
    //id é usado como key no .map
    Cards: [
      { img: "", isFlipped: false, id: 0 }, //isFlipped == done, representam cartas com pares já formados
      { img: "", isFlipped: false, id: 1 },
      { img: "", isFlipped: false, id: 2 },
      { img: "", isFlipped: false, id: 3 },
      { img: "", isFlipped: false, id: 4 },
      { img: "", isFlipped: false, id: 5 },
      { img: "", isFlipped: false, id: 6 },
      { img: "", isFlipped: false, id: 7 },
      { img: "", isFlipped: false, id: 8 },
      { img: "", isFlipped: false, id: 9 },
      { img: "", isFlipped: false, id: 10 },
      { img: "", isFlipped: false, id: 11 },
    ],
    callInitImage: true,
    qtdFlipped: 0,  //quantidade de cartas "flippadas" (máx 2)
    score: 0, //máx = metade da qtd de cartas
    backGroundSong: "off",
    attempts: 1,
  };

  componentDidMount() {

    if (this.state.callInitImage === true) {
      var Cards_copy = Functions.initImages(this.state.Cards);
      this.setState({ Cards: Cards_copy })
      this.setState({ callInitImage: false })
    }
  }

  //função para lidar com click nos Botões  
  handleOnClick(item) {

    var Cards_copy = Functions.flippImage(this.state.Cards, this.state.qtdFlipped, this.state.Cards.indexOf(item))

    this.setState({ Cards: Cards_copy.Cards });
    this.setState({ qtdFlipped: Cards_copy.qtdFlipped });

    if (this.state.qtdFlipped === 1) {
      Cards_copy = Functions.handleFlipped(this.state.Cards, this.state.qtdFlipped, this.state.score)
      this.setState({ Cards: Cards_copy.Cards })
      this.setState({ score: Cards_copy.score })
      this.setState({ qtdFlipped: 0 })
      let attempts = this.state.attempts + 1
      this.setState({ attempts: attempts })
      this.handlePropsFunction()
    }

  }

  //função que lida em qual imagem renderizar (em preto ou a verdadeira) dependendo do estado
  handleImageRender(item) {
    if (item.isFlipped === false) {
      return (
        <img src={require("../../images/carta-preto.jpg")} id="image" alt="icon"></img>
      );
    }
    else {
      return <img src={item.img} id="image" alt="icon"></img>;
    }
  }

  handlePropsFunction() {
    this.props.setAttemptsFunction(this.state.attempts)
  }

  render() {
    //primeira linha
    const Cards1 = this.state.Cards.slice(0, 4).map((item) => (
      <button key={item.id} id="card" onClick={() => this.handleOnClick(item)}>
        {this.handleImageRender(item)}
      </button>
    ));
    //segunda linha
    const Cards2 = this.state.Cards.slice(4, 8).map((item) => (
      <button key={item.id} id="card" onClick={() => this.handleOnClick(item)}>
        {this.handleImageRender(item)}
      </button>
    ));
    //terceira linha
    const Cards3 = this.state.Cards.slice(8, 12).map((item) => (
      <button key={item.id} id="card" onClick={() => this.handleOnClick(item)}>
        {this.handleImageRender(item)}
      </button>
    ));

    //roda a música de fundo
    if (this.state.backGroundSong === "off") {

      var sound = new Howl({ src: require('../../sounds/Jou beats-brazil.mp3'), volume: 0.3, loop: true })
      sound.play()
      this.setState({ backGroundSong: "on" })
    }

    //mensagem de fim de jogo
    if (this.state.score >= (this.state.Cards.length / 2) && this.state.qtdFlipped >= Cards.length) {

      alert("Parabéns, você terminou o jogo. Aperte F5 para jogar novamente")
    }

    return (
      <div>
        <div id="line">{Cards1}</div>
        <div id="line">{Cards2}</div>
        <div id="line">{Cards3}</div>
      </div>
    );
  }
}

export default Cards;
