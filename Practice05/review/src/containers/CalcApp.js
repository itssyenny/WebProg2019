import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.prevResult = 0;
    this.resultBuf = 0;
    this.prevOp = "+";
    this.New = true;
    this.state = {
      display: 0,
      operators: undefined
    };
  }
  // Reset states after AC button pressed
  resetState = () => {
    this.prevResult = 0;
    this.prevOp = "+";
    this.New = true
    this.setState({
      display: 0,
      operators: undefined
    })
  }
  // function called when a number is pressed
  pressNum = (digit) => {
    let newDigits = this.state.display
  
    if(newDigits == "0" || this.New){
      this.prevResult = parseInt(this.state.display)
      newDigits = digit.toString()
      this.New = false
    }
    else{
      newDigits = newDigits + digit.toString()
    }
    this.setState({display: newDigits})
  }
  // function called when a operator is pressed
  doOperation = (op) => {
    console.log(op)
    if(op !== "="){
      if(this.state.operators === undefined || this.New){
        this.setState({operators: op})
        this.New = true
      }
      else{
        this.equal(this.state.operators)
        this.setState({operators: op})
      }
    }
    else if(op == "=" && this.state.operators !== undefined){
      this.equal(this.state.operators)
      this.prevOp = this.state.operators
      this.setState({operators: undefined})
    }
    else if(op == "=" && this.state.operators === undefined){
      console.log(this.prevResult)
      console.log(this.prevOp)
      let currentResult = parseInt(this.state.display)
      if(this.prevOp == "-"){
        this.setState({display: -(this.resultBuf - currentResult).toString()})
      }
      else{
        this.calculate(this.prevOp,this.resultBuf,currentResult)
      }
      this.New = true
    }
  }

  equal = (op) => {
    let currentResult = (this.New) ? 0 : parseInt(this.state.display)  
    this.calculate(op,this.prevResult,currentResult)
    this.prevResult = currentResult
    this.resultBuf = currentResult
    this.prevOp = this.state.operators
    this.setState({operators: undefined})
    this.New = true
  }

  calculate = (op,prevResult,currentResult) => {
    if(op == "+"){ 
      this.setState({display: (prevResult + currentResult).toString()})
    }
    else if(op == "-"){
      this.setState({display: (prevResult - currentResult).toString()})
    }
    else if(op == "x"){
      this.setState({display: (prevResult * currentResult).toString()})
    }
    else if(op =="/"){
      this.setState({display: Math.round(prevResult / currentResult).toString()})
    }
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton onClick={this.doOperation} className="calc-operator" num={"/"}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.pressNum} className="calc-number" num={7}>7</CalcButton>
            <CalcButton onClick={this.pressNum}  className="calc-number" num={8}>8</CalcButton>
            <CalcButton onClick={this.pressNum}  className="calc-number" num={9}>9</CalcButton>
            <CalcButton onClick={this.doOperation}  className="calc-operator" num={"x"}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.pressNum}  className="calc-number" num={4}>4</CalcButton>
            <CalcButton onClick={this.pressNum}  className="calc-number" num={5}>5</CalcButton>
            <CalcButton onClick={this.pressNum}  className="calc-number" num={6}>6</CalcButton>
            <CalcButton onClick={this.doOperation} className="calc-operator" num={"-"}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.pressNum}  className="calc-number" num={1}>1</CalcButton>
            <CalcButton onClick={this.pressNum}  className="calc-number" num={2}>2</CalcButton>
            <CalcButton onClick={this.pressNum}  className="calc-number" num={3}>3</CalcButton>
            <CalcButton onClick={this.doOperation} className="calc-operator" num={"+"}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.pressNum}  className="bigger-btn" num={0}>0</CalcButton>
            <CalcButton className="calc-number" >.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.doOperation} num={"="}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
