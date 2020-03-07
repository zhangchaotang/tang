import React, { Component } from 'react'

import { Carousel } from 'antd';
import '../css/slideshow.css'
import slider1 from '../images/slider-1.jpg'
import slider2 from '../images/slider-2.jpg'
import slider3 from '../images/slider-3.jpg'
import slider4 from '../images/slider-4.jpg'
import leftBun from '../images/leftBtn.png'
import rightBtn from '../images/rightBtn.png'

export default class Slideshow extends Component {

  handleNext = () => {
    this.refs.slideshow.next();
  }

  handlePrev = () => {
    this.refs.slideshow.prev();
  }
  render() {
    return (
      <div className="slideshow">
        <div className="leftBun">
          <img className="leftBun-icon" onClick={this.handlePrev} src={leftBun} alt="" />
        </div>
        {/* 轮播图 */}
        <Carousel autoplay effect="fade" ref='slideshow'>
          <div >
            <img src={slider1} alt="" />
          </div>
          <div >
            <img src={slider2} alt="" />
          </div>
          <div >
            <img src={slider3} alt="" />
          </div>
          <div >
            <img src={slider4} alt="" />
          </div>
        </Carousel>
        <div className="rightBtn">
          <img className="rightBtn-icon" onClick={this.handleNext} src={rightBtn} alt="" />
        </div>
      </div>
    )
  }
}




// export default function Slideshow(props) {
//   // const xx = ()=>{
//   //   this.refs.slideshow.next()
//   // }
//   return (

//   )
// }
