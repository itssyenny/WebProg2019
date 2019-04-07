import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      displayValue: '0',
      pending: false,
      selectedOperator: null,
      savedValue: null,
      beforeIsOperator: false,
      equalNum: null,
      equalOperator: null,
      savedOperatorforNum: null
    };
  }

  resetState() {
    // TODO
    this.setState({
      displayValue: '0',
      pending: false,
      selectedOperator: null,
      savedValue: null,
      beforeIsOperator: false,
      equalNum: null,
      equalOperator: null,
      savedOperatorforNum: null
    });
  }

  inputDigit = digit => {
    if(this.state.pending === true) {
      this.setState({
        displayValue: String(digit),
        pending: false,
        beforeIsOperator:false,
        savedOperatorforNum: null
      });
    } 
    else {
      this.setState({
        displayValue: (this.state.displayValue === '0') ? String(digit) : (this.state.displayValue + String(digit)),
        beforeIsOperator:false,
        savedOperatorforNum: null
      });
    }
  }

  inputDot = dot => {
    /* if the user click dot for the 1st time */
    if(this.state.pending === true) {
      this.setState({
        displayValue: '0.',
        pending: false,
        beforeIsOperator: false,
        savedOperatorforNum: null
      });
    }
    else {
      if(this.state.displayValue.indexOf('.') === -1) {
        this.setState({
          displayValue: this.state.displayValue + dot,
          beforeIsOperator:false,
          savedOperatorforNum: null
        });
      }
    }
  }

  PlusMinus = () => {
    if(this.state.displayValue.charAt(0) !== '0' || ((this.state.displayValue.charAt(1) === '.' || (this.state.displayValue.charAt(1) >= '1' && this.state.displayValue.charAt(1) <= '9')))) {
      this.setState({
        displayValue: this.state.displayValue.charAt(0) === '-' ? this.state.displayValue.substr(1) : ('-' + this.state.displayValue)
      });
    }
  }

  inputPercent = () => {
    /* parse the string number into a float */
    const realvalue = parseFloat(this.state.displayValue);
    this.setState({
      displayValue: String(realvalue/100)
    });
  }

  CalculateResult = (op, a, b) => {
    switch(op) {
      case '/':
        return (a/b);
      case '*':
        return (a*b);
      case '+':
        return (a+b);
      case '-':
        return (a-b);
      case '=':
        return (b);
      default: break;
    }
  }

  Operation = operator => {
    this.setState({
      pending : true,
      selectedOperator: operator,
      beforeIsOperator: true
    }); 

    if(this.state.selectedOperator === '=' && operator === '=') {
      // console.log("Masuk = =");
      // console.log(this.state.equalOperator + " " + this.state.savedValue + " " + this.state.equalNum);
      let resultValue = this.CalculateResult(this.state.equalOperator, this.state.savedValue, this.state.equalNum);
      this.setState({
        savedValue: resultValue,
        equalNum: this.state.equalNum,
        displayValue: String(resultValue)
      });
    }
    else {
      if(this.state.beforeIsOperator) {
        this.setState({
          savedOperatorforNum: operator
        })
      }
      else {
        var inputValue = parseFloat(this.state.displayValue);
        if(this.state.savedOperatorforNum !== null) inputValue = this.state.savedOperatorforNum + inputValue;

        if(this.state.savedValue === null) { //if it is the 1st time coming here
          this.setState({
            savedValue: inputValue
          });
        } 
        else if(this.state.selectedOperator) { //if it has come here before
          const prevValue = this.state.savedValue || 0;
          let resultValue = this.CalculateResult(this.state.selectedOperator, prevValue, inputValue);
          this.setState({
            savedValue: resultValue,
            equalNum: inputValue,
            equalOperator: this.state.selectedOperator,
            displayValue: String(resultValue)
          });
        } 
      }
    }
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.displayValue}</div>
          </div>       
          <div className="calc-row">
            <CalcButton onClick={() => this.resetState()}>AC</CalcButton>
            <CalcButton onClick={() => this.PlusMinus()}>+/-</CalcButton>
            <CalcButton onClick={() => this.inputPercent()}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.Operation('/')}>÷</CalcButton>
          </div>

          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.inputDigit(7)}>7</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.inputDigit(8)}>8</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.inputDigit(9)}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.Operation('*')}>x</CalcButton>
          </div>

          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.inputDigit(4)}>4</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.inputDigit(5)}>5</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.inputDigit(6)}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.Operation('-')}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.inputDigit(1)}>1</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.inputDigit(2)}>2</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.inputDigit(3)}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.Operation('+')}>+</CalcButton>
          </div>
          
          <div className="calc-row">
            <CalcButton className="calc-number bigger-btn" onClick={() => this.inputDigit(0)}>0</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.inputDot('.')}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.Operation('=')}>=</CalcButton>  
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
