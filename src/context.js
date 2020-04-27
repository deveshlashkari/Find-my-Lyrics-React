import React, { Component } from "react";
import axios from "axios";

import { MUSIXMATCH_BASE_URL, CORS_URL } from "./constants/Constant";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        trackList: action.payload,
        heading: "Search Results",
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "Top 10 Tracks",
      trackList: [],
      dispatch: (action) => this.setState((state) => reducer(state, action)),
    };
  }

  componentDidMount = () => {
    axios
      .get(
        `${CORS_URL}${MUSIXMATCH_BASE_URL}chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((data) => {
        this.setState({ trackList: data.data.message.body.track_list });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
