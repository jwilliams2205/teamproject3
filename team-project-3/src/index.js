import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component{
  selectBox = () =>{
    this.props.selectBox(this.props.row, this.props.col);
  }

  render(){
    return(
      <div className = {this.props.boxClass} id = {this.props.boxId}
      onClick = {this.selectBox} />
    )
  }
}

class Grid extends React.Component{
  render(){

    var rowArray = [];

    var boxClass = "";

    for(var i = 0; i < 20; i++){
      for(var j = 0; j < 20; j++){
        var boxId =  i + "_" + j;

        boxClass = this.props.stateGrid[i][j] ? "box alive" : "box dead";
        rowArray.push(
          <Box
            boxClass = {boxClass}
            key = {boxId}
            boxId = {boxId}
            row = {i}
            col = {j}
            selectBox = {this.props.selectBox}
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

  selectBox = (i, j) =>{
    var temp = this.state.stateGrid.map(array => array.slice());
    temp[i][j] = !temp[i][j];
    console.log(temp[i][j]);
    this.setState({
      stateGrid: temp
    })
  }


  render(){
    return(
      <div><header>Conway's Game of Life</header>
      <Grid stateGrid = {this.state.stateGrid} selectBox = {this.selectBox}
      />
      </div>
    )
  }
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

