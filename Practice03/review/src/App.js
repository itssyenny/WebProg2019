import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css';

let headerUrl = './img/banner2.jpg'
let footerUrl = './img/footer.jpg'

class App extends Component {
  Newpost(i) {
      return (
          <div class="article">
              <h2>{this.props.Post.Title[i]}</h2>
              <h5>{this.props.Post.Description[i]}, {this.props.Post.Postdate[i]}</h5>
              <div class="imgblock"><img src={this.props.Post.BlogImage[i]} style={{height:'500px',}}/>
              </div>
              <p>{this.props.Post.Content[i]}</p>
          </div>
      );
  }
  render() {
    return (
        <div>
            <div class="header" style={{backgroundImage: 'url(' + headerUrl + ')'}}>
                <h3 style={{'padding-top': '160px', 'font-family': 'Baloo Chettan', 'text-shadow': '0.1em 0.1em #fff'}}>
                    Drift in Taiwan
                </h3>
            </div>
            <div class="row">
                <div class="leftcolumn">
                    {this.Newpost(1)}
                    {this.Newpost(0)}
                </div>
                <div class="rightcolumn">
                    <div class="sidebar">
                        <h2>About Me</h2>
                        <div class="imgblock" style={{width: '85%'}}>
                            <img src={"./img/profile.jpg"} style={{height:'200px', 'border-radius': '100px',}}/>
                        </div>
                        <p>Yi-Yen Hsieh, based in Taipei currently.</p>
                    </div>
                    <div class="sidebar">
                        <h2>Popular Post</h2>
                        <div class="imgblock" style={{width: '85%',}}>Post1</div>
                        <div class="imgblock" style={{width: '85%',}}>Post2</div>
                    </div>
                    <div class="sidebar">
                        <h2>Contact Me</h2>
                        <p>E-Mail: D06943001@ntu.edu.tw</p>
                    </div>
                </div>
            </div>
            <div class="footer" style={{backgroundImage: 'url(' + footerUrl + ')'}}>
            </div>
        </div>
    );  
  } 
}

export default App;
