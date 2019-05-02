import React, { Component } from 'react';
import '../App.css';

export default class Foods extends Component {
    constructor(props) {
        super(props);
        const img0 = require('./assets/plate.png');
        const img1 = require('./assets/plate1.png');
        const img2 = require('./assets/plate2.png');
        const img3 = require('./assets/plate3.png');
        const img4 = require('./assets/plate4.png');
        const img5 = require('./assets/fruit.png');
        const img6 = require('./assets/loading.gif');
        this.state = {
            index: 0,
            isDisabled: false,
            buttonName: 'CLICK FOR MORE',
            foods: [img0, img1, img2, img3, img4, img5, img6]
        }
        // this.onClickButton = this.onClickButton.bind(this);
    }

    onClickButton() {
        if(this.state.index + 1 === this.state.foods.length) {
            this.setState({
                index: 6,
                isDisabled: true,
                buttonName: 'NO MORE FOODS'
            })
        } else {
            this.setState({
                index: this.state.index + 1
            })
        }
    }

    render () {
        return (
           <div className="home-bg">
               {/* <h1>Home</h1> */}
               <img id="smile" src={require('./assets/happy.gif')} alt="smile"></img>
               <h1 id="h1d">
                   You are the greatest person ever ! <br /> Snippy Pipzy Lovin' You
               </h1>

               <p id="p1d">
                   Hi, I am Snippy Pipzy. I know you must be so busy with the upcoming midterm exams.<br />
                   However, I have some foods for you. <b>Don't forget to eat !</b>
               </p>
                <img id="plate" src={this.state.foods[this.state.index]} alt="" />
                <button  id="btnsd" onClick={() => this.onClickButton()} disabled={this.state.isDisabled}>{this.state.buttonName}</button>
               
            </div>
        );
    }
}

