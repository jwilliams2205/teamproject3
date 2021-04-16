import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ButtonRow extends React.Component{
  render(){
    return(
      <div className = "all">
        <button className = "btn" onClick = {this.props.randomize}>Randomize</button>
        <button className = "btn" onClick = {this.props.reset}>Reset</button>
        <button className = "btn" onClick = {this.props.startInfinite}>Start</button>
        <button className = "btn" onClick = {this.props.stopInfinite}>Stop</button>
        <button className = "btn" onClick = {this.props.oneIteration}>Iterate: 1</button>
        <button className = "btn" onClick = {this.props.twentyThreeIteration}>Iterate: 23</button>
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

    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 20; j++){
        var cellId =  i + "_" + j;

        if(this.props.stateGrid[i][j]){
          cellClass = "cell alive";
        }
        else{
          cellClass = "cell dead";
        }
        rowArray.push(
          <Cell
            cellClass = {cellClass}
            key = {cellId}
            cellId = {cellId}
            row = {i}
            col = {j}
            selectCell = {this.props.selectCell}
            />
        )
      }
    }

    return(
      <div className = "grid" style = {{width:440}}>
        {rowArray}
      </div>
    )
  }
}

class Game extends React.Component{

  constructor(){
    super();
    this.rows = 20;
    this.columns = 20;
    this.mapGrid = [];
    this.infiniteFlag = false;
    this.numIterations = 0;
    for(var i = 0; i < 20; i++){
      this.mapGrid.push(Array.from(Array(20), ()=> false));
    }
    this.state = {
      stateGrid: this.mapGrid
  }
}

  randomize = () =>{
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < 20; i++){
      for(var j = 0; j < 20; j++){
        randomTemp[i][j] = false;
      }
    }
    for( i = 0; i < 100; i++){
      var iRand = Math.floor(Math.random()*20); //Create random i and j index to turn on for creating the seed.
      var jRand = Math.floor(Math.random()*20);
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
    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 20; j++){
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
    console.log("Function Called");
    var gameGrid = this.state.stateGrid.map(array => array.slice());
    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 20; j++){
        let popCount = 0;
        //Let the ugliest code in history begin
        if( (j-1) >= 0 && (j-1) < 20){
          if(gameGrid[i][j-1]){
            popCount++;
        }
        }
        if( (j+1) >= 0 && (j+1) < 20){        
          if(gameGrid[i][j+1]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < 20){        
          if(gameGrid[i-1][j]){
          popCount++;
        }}
        if((i+1) >= 0 && (i+1) < 20){        
          if(gameGrid[i+1][j]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < 20 && (j-1) >= 0 && (j-1) < 20){
          if(gameGrid[i-1][j-1]){
            popCount++;
          }
        }
        if((i+1) >= 0 && (i+1) < 20 && (j+1) >= 0 && (j+1) < 20){
          if(gameGrid[i+1][j+1]){
            popCount++;
          }
        }
        if((i+1) >= 0 && (i+1) < 20 && (j-1) >= 0 && (j-1) < 20){        
          if(gameGrid[i+1][j-1]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < 20 && (j+1) >= 0 && (j+1) < 20){
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
    }, 500);
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

  render(){
    return(
      <div><header>Conway's Game of Life</header>
      <Grid stateGrid = {this.state.stateGrid} selectCell = {this.selectCell}
      />
      <ButtonRow
        randomize = {this.randomize}
        reset = {this.reset}
        startInfinite = {this.startInfinite}
        stopInfinite = {this.stopInfinite}
        oneIteration = {this.oneIteration}
        twentyThreeIteration = {this.twentyThreeIteration}
        
        />
      </div>
    )
  }
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

