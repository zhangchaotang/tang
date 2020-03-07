import React, { Component } from 'react'

export default class Player extends Component {

  componentDidMount() {
    // eslint-disable-next-line
    let player = new Aliplayer({
      "id": "player-con",
      "source": this.props.source,
      "width": "100%",
      "height": this.props.height,
      "autoplay": false,
      "isLive": false,
      "rePlay": false,
      "showBuffer": true,
      "snapshot": false,
      "showBarTime": 5000,
      "useFlashPrism": true,
      "skinLayout": [
        {
          "name": "bigPlayButton",
          "align": "blabs",
          "x": 30,
          "y": 80
        },
        {
          "name": "errorDisplay",
          "align": "tlabs",
          "x": 0,
          "y": 0
        },
        {
          "name": "infoDisplay"
        },
        {
          "name": "controlBar",
          "align": "blabs",
          "x": 0,
          "y": 0,
          "children": [
            {
              "name": "liveDisplay",
              "align": "tlabs",
              "x": 15,
              "y": 25
            },
            {
              "name": "fullScreenButton",
              "align": "tr",
              "x": 10,
              "y": 25
            },
            {
              "name": "volume",
              "align": "tr",
              "x": 10,
              "y": 25
            }
          ]
        }
      ]
    }
    );
  }

  render() {
    return (
      <div className="prism-player" id="player-con"></div>
    )
  }
}
