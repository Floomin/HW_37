import React from "react";
import PropTypes from "prop-types";
import styles from "./NoteList.module.css";

class NoteList extends React.Component {
  #title = "";

  get title() {
    return `***${this.#title}***`;
  }

  set title(title) {
    this.#title = title.replace(/[0-9\s]/g, "");
  }

  componentDidMount() {
    this.title = this.props.title;
  }

  render() {
    return (
      <div className={styles.noteList}>
        <h2>{this.title}</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

NoteList.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NoteList;
