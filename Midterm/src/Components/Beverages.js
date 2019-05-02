import React, { Component } from 'react';
import '../App.css';

export default class Beverages extends Component {
    constructor(props) {
        super(props);
        const img0 = require('./assets/drink.png');
        const img1 = require('./assets/drink1.png');
        const img2 = require('./assets/drink2.png');
        const img3 = require('./assets/drink4.png');
        const img4 = 'https://media.giphy.com/media/ZwF1ziDCvQ3Pnu0Gsl/giphy.gif';
        const img5 = 'https://media.giphy.com/media/XZMvoun34ALbh5uI4E/giphy.gif';
        const img6 = 'https://media.giphy.com/media/jKVuBOrr8FsSwmrD0O/giphy.gif';
        this.state = {
            index: 0,
            isDisabled: false,
            buttonName: 'CLICK FOR MORE',
            drinks: [img0,img2, img1, img3, img4, img4, img5, img6]
        }
        // this.onClickButton = this.onClickButton.bind(this);
    }

    onClickButton() {
        if(this.state.index + 1 === this.state.drinks.length) {
            this.setState({
                index: 4,
                
                buttonName: 'NO MORE DRINKS'
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
                <img id="smile" src={require('./assets/eat.gif')} alt="smile"></img>
                <h1 id="h1d">
                    After chewing on it, you feel thirsty right?
                </h1>

                <p id="p1d">
                    Do you want some drinks?<br/>
                    Just let me know.
                </p>

                <img id="plate" src={this.state.drinks[this.state.index]} alt="" />
                <button  id="btnsd" onClick={() => this.onClickButton()} disabled={this.state.isDisabled}>{this.state.buttonName}</button>
            </div>
        );
    }
}
