import React, { Component } from "react";
import axios from "axios";

import { Consumer } from "../../context";
import { MUSIXMATCH_BASE_URL, CORS_URL } from "../../constants/Constant";

class Search extends Component {
  state = {
    trackTitle: "",
  };

  handleTrackTitle = (e) => {
    this.setState({ trackTitle: e.target.value });
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `${CORS_URL}${MUSIXMATCH_BASE_URL}track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((data) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: data.data.message.body.track_list,
        });
        this.setState({ trackTitle: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-headphones"></i> Search your favourite song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.handleTrackTitle}
                  ></input>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Search;
