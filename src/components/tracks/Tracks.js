import React, { Component } from "react";

import { Consumer } from "../../context";
import Track from "../tracks/Track";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Tracks extends Component {
  state = {
    renderText: false,
  };
  render() {
    return (
      <Consumer>
        {(value) => {
          if (value.trackList === undefined || value.trackList.length === 0) {
            setTimeout(
              function () {
                this.setState({ renderText: true });
              }.bind(this),
              5000
            );
            return (
              <div className="text-center">
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
                {this.state.renderText ? (
                  <h1 className="display-4">No track found !!!</h1>
                ) : (
                  ""
                )}
              </div>
            );
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{value.heading}</h3>
                <div className="row">
                  {value.trackList.map((item) => (
                    <Track key={item.track.track_id} track={item.track} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
