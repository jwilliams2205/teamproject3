import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

    for(var i = 0; i < 20; i++){
      for(var j = 0; j < 20; j++){
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
    for(var i = 0; i < 20; i++){
      this.mapGrid.push(Array.from(Array(20), ()=> false));
    }
    this.state = {
      stateGrid: this.mapGrid
  }
}

  randomize = () =>{
    var randomTemp = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < 100; i++){
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

  selectCell = (i, j) =>{
    var temp = this.state.stateGrid.map(array => array.slice());
    temp[i][j] = !temp[i][j];
    console.log(temp[i][j]);
    this.setState({
      stateGrid: temp
    })
  }

  oneGen = () =>{
    var permutations = [
      [0,1], [0,-1], [1,0], [-1,0], [1,1], [-1,1], [-1,-1], [1,-1]
    ]
    var gameGrid = this.state.stateGrid.map(array => array.slice());
    for(var i = 0; i < 20; i++){
      for(var j = 0; j < 20; j++){
        var popCount = 0;
        //Rather than create a long list of if conditions, it seemed better to create an array of different neighbor permutations.
        permutations.forEach(([iBox, jBox]) =>{
          if(i+iBox >= 0 && i+iBox < 20 && j+jBox >= 0 && j+jBox < 20){
            if(gameGrid[i+iBox][j+jBox] === true){
              popCount++;
            }
          }
          if(popCount === 3 || popCount === 2){ //If popCount is in the inferval (2,3) => Set the box to true. 
            gameGrid[i][j] = true;
          }
        });
      }
    }
    this.setState({
      stateGrid: gameGrid
    });
  }

  playIterations = (numIterations, infiniteFlag) => {
    while(infiniteFlag){
      this.oneGen();
    }
    for(var i = numIterations; i > 0; i--){
      this.oneGen();
    }
  }

  componentDidMount(){
    this.randomize();
  }
  render(){
    return(
      <div><header>Conway's Game of Life</header>
      <Grid stateGrid = {this.state.stateGrid} selectCell = {this.selectCell}
      />
      </div>
    )
  }
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

