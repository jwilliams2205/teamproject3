import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from './Button.jsx';


class ButtonRow extends React.Component{
  render(){
    return(
      <div className = "all">
        <Button variant = "contained" m={0.5} size = "small" color = "primary" className = "btn" onClick = {this.props.randomize}>Randomize</Button>
        <Button variant = "contained" m={0.5} size = "small"  color = "primary"  onClick = {this.props.reset}>Reset</Button>
        <Button variant = "contained" m={0.5} size = "small"  color = "primary" onClick = {this.props.startInfinite}>Start</Button>
        <Button variant = "contained" m={0.5} size = "small"  color = "primary" onClick = {this.props.stopInfinite}>Stop</Button>
        <Button variant = "contained" m={0.5} size = "small"  color = "primary" onClick = {this.props.oneIteration}>Iterate: 1</Button>
        <Button variant = "contained" m={0.5} size = "small"  color = "primary" onClick = {this.props.twentyThreeIteration}>Iterate: 23</Button>
        <div className = "dropdown">
          <Button variant = "contained" m={0.5} size = "small" color = "primary">Presets</Button>
          <div className = "dropdownSelects">
            <Button onClick = {this.props.theBlock}>The Block</Button>
            <Button onClick = {this.props.theBlinker}>The Blinker</Button>
            <Button onClick = {this.props.theBeacon}>The Beacon</Button>
          </div>
        </div>
      </div>
    )
  }
}

class Cell extends React.Component{
  selectCell = () =>{
    this.props.selectCell(this.props.row, this.props.col);
  }

  render(){
    return(
      <div className = {this.props.cellClass} id = {this.props.cellId}
      onClick = {this.selectCell} />
    )
  }
}

class Grid extends React.Component{
  render(){

    var rowArray = [];

    var cellClass = "";

    for(let i = 0; i < 30; i++){
      for(let j = 0; j < 30; j++){

        if(this.props.stateGrid[i][j]){
          cellClass = "cell alive";
        }
        else{
          cellClass = "cell dead";
        }
        rowArray.push(
          <Cell
            cellClass = {cellClass}
            row = {i}
            col = {j}
            key = {'row' + i + 'col' + j}
            selectCell = {this.props.selectCell}
            />
        )
      }
    }

    return(
      <div className = "grid" style = {{width:510}}>
        {rowArray}
      </div>
    )
  }
}

class Game extends React.Component{

  constructor(){
    super();
    this.rows = 30;
    this.columns = 30;
    this.mapGrid = [];
    this.infiniteFlag = false;
    this.numIterations = 0;
    for(var i = 0; i < 30; i++){
      this.mapGrid.push(Array.from(Array(30), ()=> false));
    }
    this.state = {
      stateGrid: this.mapGrid
  }
}

  randomize = () =>{
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < 30; i++){
      for(var j = 0; j < 30; j++){
        randomTemp[i][j] = false;
      }
    }
    for( i = 0; i < 300; i++){
      var iRand = Math.floor(Math.random()*30); //Create random i and j index to turn on for creating the seed.
      var jRand = Math.floor(Math.random()*30);
      if(randomTemp[iRand][jRand]){
        i--;
      }
      else{
        randomTemp[iRand][jRand] = true;
      }
    }
    this.setState({
      stateGrid: randomTemp
    })
  }

  reset = () =>{
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(let i = 0; i < 30; i++){
      for(let j = 0; j < 30; j++){
        randomTemp[i][j] = false;
      }
    }
    this.setState({
      stateGrid: randomTemp
    })
  }

  selectCell = (i, j) =>{
    var temp = this.state.stateGrid.map(array => array.slice());
    temp[i][j] = !temp[i][j];
    console.log(temp[i][j]);
    this.setState({
      stateGrid: temp
    })
  }

  oneGen = () =>{
    var gameGrid = this.state.stateGrid.map(array => array.slice());
    for(let i = 0; i < 30; i++){
      for(let j = 0; j < 30; j++){
        let popCount = 0;
        /*Let the ugliest code in history begin
          -> The biggest thing to note is that we don't want to reference undefined array indices.
          -> Therefore, we have to add double conditionals to each game-defined case. One to check for bounds, and another to check the game rules.
        */
        if( (j-1) >= 0 && (j-1) < 30){
          if(gameGrid[i][j-1]){
            popCount++;
        }
        }
        if( (j+1) >= 0 && (j+1) < 30){        
          if(gameGrid[i][j+1]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < 30){        
          if(gameGrid[i-1][j]){
          popCount++;
        }}
        if((i+1) >= 0 && (i+1) < 30){        
          if(gameGrid[i+1][j]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < 30 && (j-1) >= 0 && (j-1) < 30){
          if(gameGrid[i-1][j-1]){
            popCount++;
          }
        }
        if((i+1) >= 0 && (i+1) < 30 && (j+1) >= 0 && (j+1) < 30){
          if(gameGrid[i+1][j+1]){
            popCount++;
          }
        }
        if((i+1) >= 0 && (i+1) < 30 && (j-1) >= 0 && (j-1) < 30){        
          if(gameGrid[i+1][j-1]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < 30 && (j+1) >= 0 && (j+1) < 30){
          if(gameGrid[i-1][j+1]){
            popCount++;
          }
        }
        if(popCount < 2 || popCount > 3){
          gameGrid[i][j] = false;
        }
        else if(popCount === 3 && !gameGrid[i][j]){
          console.log("popCount is " + popCount + " and gameGrid" + i + " " + j + " is " + gameGrid[i][j]);
          gameGrid[i][j] = true;
        }
      }
      }
    this.setState({
      stateGrid: gameGrid
    });
  }

  playIterations = () => {
    clearInterval(this.intervals);
    var count = 0;
    this.intervals = setInterval(() => {
      this.oneGen();
      if(++count === this.numIterations){
        clearInterval(this.intervals);
      }
    }, 250);
  }

  oneIteration = () => {
    this.numIterations = 1;
    this.playIterations();
  }

  twentyThreeIteration = () => {
    this.numIterations = 23;
    this.playIterations();
  }

  startInfinite = () => {
    this.numIterations = Infinity;
    this.playIterations();
  }

  stopInfinite = () => {
    clearInterval(this.intervals);
  }

  theBlock = () => {
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < 30; i++){
      for(var j = 0; j < 30; j++){
        randomTemp[i][j] = false;
      }
    }
    randomTemp[15][15] = true;
    randomTemp[16][15] = true;
    randomTemp[15][16] = true;
    randomTemp[16][16] = true;
    this.setState({
      stateGrid: randomTemp
    });
  }

  theBlinker = () => {
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < 30; i++){
      for(var j = 0; j < 30; j++){
        randomTemp[i][j] = false;
      }
    }
    randomTemp[15][15] = true;
    randomTemp[16][15] = true;
    randomTemp[17][15] = true;
    this.setState({
      stateGrid: randomTemp
    });
  }

  theBeacon = () => {
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < 30; i++){
      for(var j = 0; j < 30; j++){
        randomTemp[i][j] = false;
      }
    }
    randomTemp[15][15] = true;
    randomTemp[16][15] = true;
    randomTemp[15][16] = true;
    randomTemp[16][16] = true;
    randomTemp[17][17] = true;
    randomTemp[17][18] = true;
    randomTemp[18][17] = true;
    randomTemp[18][18] = true;
    this.setState({
      stateGrid: randomTemp
    });
  }



  render(){
    return(
      <div className = "all"><header>Conway's Game of Life</header>
      <Grid stateGrid = {this.state.stateGrid} selectCell = {this.selectCell}
      />
      <ButtonRow
        randomize = {this.randomize}
        reset = {this.reset}
        startInfinite = {this.startInfinite}
        stopInfinite = {this.stopInfinite}
        oneIteration = {this.oneIteration}
        twentyThreeIteration = {this.twentyThreeIteration}
        theBlock = {this.theBlock}
        theBlinker = {this.theBlinker}
        theBeacon = {this.theBeacon}
        />
      </div>
    )
  }
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

