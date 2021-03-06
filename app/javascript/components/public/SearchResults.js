import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class SearchResults extends PureComponent {
  render() {
    return (
      <div className={`c-search-results ${this.props.className}`}>
        <div className="wrapper">
          {!this.props.hideSearchBar && (
            <form method="get">
              <input
                name="search"
                type="search"
                placeholder="Search for"
                defaultValue={this.props.search}
                aria-label="Search in the site"
              />
              <input type="hidden" name="page" value={this.props.page} />
              <button type="submit" className="c-button">
                Search
              </button>
            </form>
          )}
          <ul className="results">
            {this.props.results.map(result => (
              <li className="item" key={result.url}>
                <a href={result.url}>
                  <div
                    className="thumbnail"
                    style={result.thumbnail_url ? { backgroundImage: `url(${result.thumbnail_url})` } : {}}
                  />
                  <h2>{result.name}</h2>
                  <p>{result.description}</p>
                  <p className="tags">{result.tags.map(t => t.value).join(' ')}</p>
                </a>
              </li>
            ))}
          </ul>
          {!this.props.results.length && (
            <div className="no-result">No result</div>
          )}
          <div className="pagination">
            <a
              href={`${location.origin}${
                location.pathname
                }?search=${encodeURIComponent(this.props.search)}&page=${+this
                  .props.page - 1}`}
              className={classnames({
                "c-button": true,
                "-mini": true,
                "-arrow-left": true,
                "-disabled": this.props.page === 1
              })}
              disabled={this.props.page === 1}
              aria-label="Previous page"
              onClick={() => offsetPage(pagination.page - 1)}
            />
            {this.props.page} of {this.props.totalPages}
            <a
              href={`${location.origin}${
                location.pathname
                }?search=${encodeURIComponent(this.props.search)}&page=${+this
                  .props.page + 1}`}
              className={classnames({
                "c-button": true,
                "-mini": true,
                "-arrow-right": true,
                "-disabled": this.props.page === this.props.totalPages
              })}
              aria-label="Next page"
              disabled={this.props.page === this.props.totalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  results: PropTypes.array,
  search: PropTypes.string,
  hideSearchBar: PropTypes.bool,
  className: PropTypes.string
};

SearchResults.defaultProps = {
  results: [],
  page: 1,
  totalPages: 1,
  search: "",
  hideSearchBar: false,
  className: ''
};

export default SearchResults;
