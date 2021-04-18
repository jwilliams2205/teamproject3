import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from './Button.jsx';


class ButtonRow extends React.Component{
  render(){
    return(
      <div className = "all">
        <Button variant = "contained" m={0.5} size = "small" color = "primary" onClick = {this.props.randomize}>Randomize</Button>
        <Button variant = "contained" m={0.5} size = "small"  color = "primary" onClick = {this.props.reset}>Reset</Button>
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
        </div><br/>
        <Button variant = "contained" m={0.5} size = "small" color = "primary" onClick = {this.props.changeSize}>Change Size</Button>
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
      <div className = {this.props.cellClass} onClick = {this.selectCell} />
    )
  }
}

class Grid extends React.Component{
  render(){

    var rowArray = [];
    var cellSize = 17;
    var cellClass = "";

    for(let i = 0; i < this.props.rows; i++){
      for(let j = 0; j < this.props.columns; j++){

        if(this.props.stateGrid[i][j]){
          cellClass = "cell alive";
        }
        else{
          cellClass = "cell dead";
        }
        rowArray.push(
          <Cell
            cellClass = {cellClass}
            key = {'row' + i + 'col' + j}
            selectCell = {this.props.selectCell}
            />
        )
      }
    }

    return(
      <div className = "grid" style = {{width:this.props.rows*cellSize}}>
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
    //this.infiniteFlag = false;
    this.numIterations = 0;
    for(var i = 0; i < this.rows; i++){
      this.mapGrid.push(Array.from(Array(this.columns), ()=> false));
    }
    this.state = {
      stateGrid: this.mapGrid
  }
}

  randomize = () =>{
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.columns; j++){
        randomTemp[i][j] = false;
      }
    }
    for( i = 0; i < (this.rows*this.columns)/3; i++){ //30% of cells randomly become alive
      var iRand = Math.floor(Math.random()*this.rows); //Create random i and j index to turn on for creating the seed.
      var jRand = Math.floor(Math.random()*this.columns);
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
    // var randomTemp = this.state.stateGrid.map(array => array.slice());
    // for(let i = 0; i < this.rows; i++){
    //   for(let j = 0; j < this.columns; j++){
    //     randomTemp[i][j] = false;
    //   }
    // }
    var tempGrid = []
    for(var i = 0; i < this.rows; i++){
      tempGrid.push(Array.from(Array(this.columns), ()=> false));
    }
    this.setState({
      stateGrid: tempGrid
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
    /*
    Tried this with one copy of the array and altering it from there, but that seemed to break it because of updates in the active generation
    would cause errors in iterations further down the loop.
    ie, if Array[i-1][j] was dead at the beginning of the generation but alive because of a conditional, Array[i][j] should not see that update
    until after the generation completes.
    */
    let tempGrid = this.state.stateGrid.map(array => array.slice()); 
    let gameGrid = this.state.stateGrid.map(array => array.slice()); 
    console.log(gameGrid);
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.columns; j++){
        let popCount = 0;
        /*Let the ugliest code in history begin
          -> The biggest thing to note is that we don't want to reference undefined array indices.
          -> Therefore, we have to add double conditionals to each game-defined case. One to check for bounds, and another to check the game rules.
        */
        if( (j-1) >= 0 && (j-1) < this.rows){
          if(gameGrid[i][j-1]){
            popCount++;
        }
        }
        if( (j+1) >= 0 && (j+1) < this.columns){        
          if(gameGrid[i][j+1]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < this.rows){        
          if(gameGrid[i-1][j]){
          popCount++;
        }}
        if((i+1) >= 0 && (i+1) < this.rows){        
          if(gameGrid[i+1][j]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < this.rows && (j-1) >= 0 && (j-1) < this.columns){
          if(gameGrid[i-1][j-1]){
            popCount++;
          }
        }
        if((i+1) >= 0 && (i+1) < this.rows && (j+1) >= 0 && (j+1) < this.columns){
          if(gameGrid[i+1][j+1]){
            popCount++;
          }
        }
        if((i+1) >= 0 && (i+1) < this.rows && (j-1) >= 0 && (j-1) < this.columns){        
          if(gameGrid[i+1][j-1]){
          popCount++;
        }}
        if((i-1) >= 0 && (i-1) < this.rows && (j+1) >= 0 && (j+1) < this.columns){
          if(gameGrid[i-1][j+1]){
            popCount++;
          }
        }
        if(popCount < 2 || popCount > 3){
          tempGrid[i][j] = false;
        }
        else if(popCount === 3 && !gameGrid[i][j]){
          console.log("popCount is " + popCount + " and gameGrid" + i + " " + j + " is " + gameGrid[i][j]);
          tempGrid[i][j] = true;
        }
      }
      }
    this.setState({
      stateGrid: tempGrid
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
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.columns; j++){
        randomTemp[i][j] = false;
      }
    }
    var baseCell = Math.floor(this.rows/2);
    randomTemp[baseCell][baseCell] = true;
    randomTemp[baseCell+1][baseCell] = true;
    randomTemp[baseCell][baseCell+1] = true;
    randomTemp[baseCell+1][baseCell+1] = true;
    this.setState({
      stateGrid: randomTemp
    });
  }

  theBlinker = () => {
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.columns; j++){
        randomTemp[i][j] = false;
      }
    }
    var baseCell = Math.floor(this.rows/2);
    randomTemp[baseCell][baseCell] = true;
    randomTemp[baseCell+1][baseCell] = true;
    randomTemp[baseCell-1][baseCell] = true;
    this.setState({
      stateGrid: randomTemp
    });
  }

  theBeacon = () => {
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.columns; j++){
        randomTemp[i][j] = false;
      }
    }
    var baseCell = Math.floor(this.rows/2);
    randomTemp[baseCell][baseCell] = true;
    randomTemp[baseCell+1][baseCell] = true;
    randomTemp[baseCell][baseCell+1] = true;
    randomTemp[baseCell+1][baseCell+1] = true;
    randomTemp[baseCell+2][baseCell+2] = true;
    randomTemp[baseCell+2][baseCell+3] = true;
    randomTemp[baseCell+3][baseCell+2] = true;
    randomTemp[baseCell+3][baseCell+3] = true;
    this.setState({
      stateGrid: randomTemp
    });
  }

  changeSize = () => {
    this.rows = prompt("Select a new size of square less than or equal to 50 and greater than or equal to 10: ");
    while(this.rows > 50 || this.rows <10){
      this.rows = prompt("Invalid selection -- Select a new size of square less than or equal to 50 and greater than or equal to 10: ")
    }
    this.columns = this.rows;
    this.reset();
  }

  render(){
    return(
      <div className = "all"><header><h1>Conway's Game of Life</h1></header>
      <Grid stateGrid = {this.state.stateGrid} selectCell = {this.selectCell} rows = {this.rows} columns = {this.columns}
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
        changeSize = {this.changeSize}
        />
      </div>
    )
  }
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);