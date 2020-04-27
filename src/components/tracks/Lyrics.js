import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import moment from "moment";

import { MUSIXMATCH_BASE_URL, CORS_URL } from "../../constants/Constant";
class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount = () => {
    axios
      .get(
        `${CORS_URL}${MUSIXMATCH_BASE_URL}track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((data) => {
        this.setState({ lyrics: data.data.message.body.lyrics });

        return axios
          .get(
            `${CORS_URL}${MUSIXMATCH_BASE_URL}track.get?track_id=
          ${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
          )
          .then((data) => {
            this.setState({ track: data.data.message.body.track });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { track, lyrics } = this.state;
    console.log(track);
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return (
        <div className="text-center">
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            //timeout={3000} //3 secs
          />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-primary btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Explicit</strong>: {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Lyrics updated at</strong>:{" "}
              {moment(track.updated_time).format("DD-MMMM-YYYY")}
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}
export default Lyrics;
