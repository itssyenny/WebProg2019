import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import 'typeface-roboto';
import {Grid, Cell, Card, CardText, CardTitle, CardActions, Button} from 'react-mdl';

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
        <Layout>
            <Header className="header-color" title="Revive" scroll>
                <Navigation>
                    <a href="#home">Home</a>
                    <a href="#list">Top List</a>
                </Navigation>
            </Header>
            <Content>
                <section className="home" id="home" style={{width:'100%', margin: 'auto'}}>
                  <Grid className="about-grid">
                  {/* <h1>About</h1> */}
                    <Cell col={12}>
                      <img 
                        src="https://purepng.com/public/uploads/large/purepng.com-play-music-icon-android-kitkatsymbolsiconsapp-iconsandroid-kitkatandroid-44-721522597670k5zh5.png"
                        alt="music"
                        className="music-img"
                      />
                      <div className="title-text" id="title-text">
                        <h1>I Am Flyin' In the Sky</h1>
                        <hr />
                        
                       <div className="music-icon">
                          <img  
                            src="https://image.flaticon.com/icons/svg/189/189889.svg"
                            alt="pause"
                          />
                          <img
                            src="https://image.flaticon.com/icons/svg/189/189888.svg"
                            alt="next"
                          />
                          <img 
                          src="https://image.flaticon.com/icons/svg/189/189890.svg"
                          alt="play"
                          />
                        </div>
                      </div>
                    </Cell>
                  </Grid>
                </section>

                <section className="namelist" id="list" style={{width:'100%', margin: 'auto'}}>
                  <h1>Top 3 Recommended Songs in 2019</h1>
                  <ol>{this.props.music_title.map(e => <h2>{e.id}.{e.name}</h2>)}</ol>
                </section>

                <section className="list-grid">
                  <Grid>
                    <Cell col={4} className="swing">
                      <Card shadow={0} style={{width: '380px', height: '380px', margin: 'auto'}}>
                        <CardTitle expand style={{color: '#fff', background: 'url(https://66.media.tumblr.com/5fe9b66b89194d8a4029d45f4cec4790/tumblr_miw5o6S8st1s4rmigo1_500.gif) center'}}>Tell Me That You Love Me</CardTitle>
                        <CardText>
                            <b>Tell Me That You Love Me</b> is so recommeneded. This song was composed by James TW
                        </CardText>
                        <CardActions border>
                            <Button colored><a href="https://youtu.be/cdG-VkY9XmA">Play</a></Button>
                        </CardActions>
                    </Card>
                    </Cell>
                    <Cell col={4} className="swing">
                      <Card shadow={0} style={{width: '380px', height: '380px', margin: 'auto'}}>
                        <CardTitle expand style={{color: '#fff', background: 'url(https://wx2.sinaimg.cn/mw690/0077ubI4ly1frmp227ugtg30b40824ns.gif)'}}>Proof of my heartbeat 心跳的證明</CardTitle>
                        <CardText>
                          <b>心跳的證明</b> is the OST of a new Taiwanese film 【吻定情】 , composed by Reyi 劉人語
                        </CardText>
                        <CardActions border>
                            <Button colored><a href="https://youtu.be/fk5FEaSV7fo">Play</a></Button>
                        </CardActions>
                    </Card>
                    </Cell>
                    <Cell col={4} className="swing">
                      <Card shadow={0} style={{width: '380px', height: '380px', margin: 'auto'}}>
                        <CardTitle expand style={{color: '#fff', background: 'url(https://thumbs.gfycat.com/IgnorantTameGordonsetter-max-1mb.gif)'}}>Still In Love</CardTitle>
                        <CardText>
                          <b>Still In love</b> is a popular song created by Jason Chen   
                        </CardText>
                        <CardActions border>
                            <Button colored><a href="https://youtu.be/NRHHNPuEn5Y">Play</a></Button>
                        </CardActions>
                    </Card>
                    </Cell>  
                  </Grid>
                </section>
            </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
