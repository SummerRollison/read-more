import React from "react";
import { connect } from "react-redux";
import BookSearchForm from "./BookSearchForm";
import { bookSearch } from "../actions";

class BookSearch extends React.Component {
  fetchSearch = searchParams => {
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchParams}&key=AIzaSyAzEyWhxzmYAGXzsDwcJmVGhF5IMpfnGuc`;
    return fetch(URL)
      .then(response => response.json())
      .then(json => json.items.map(book => book.volumeInfo))
      .then(mappedResults => this.props.bookSearch(mappedResults));
  };

  formatSearchParams = formValues => {
    if (formValues.author && formValues.title) {
      return this.fetchSearch(
        `inauthor:${formValues.author}+intitle:${formValues.title}`
      );
    } else if (formValues.author && !formValues.title) {
      return this.fetchSearch(`inauthor:${formValues.author}`);
    } else if (!formValues.author && formValues.title) {
      return this.fetchSearch(`intitle:${formValues.title}`);
    }
  };

  render() {
    return (
      <div className="component">
        <h2>Add A Book</h2>
        <BookSearchForm handleSubmit={this.formatSearchParams} />
      </div>
    );
  }
}

export default connect(null, { bookSearch })(BookSearch);