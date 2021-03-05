import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
    }

    getSortByClass(sortByOption) {
        if (sortByOption === this.state.sortBy) {
            return 'active';
        } else {
            return '';
        };
    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }

    handleTermChange(e) {
        this.setState({
            term: e.target.value
        });
    }

    handleLocationChange(e) {
        this.setState({
            location: e.target.value
        });
    }

    renderSortByOptions() {
         return Object.keys(this.sortByOptions).map(option => {
            let optionValue = this.sortByOptions[option];
            return (
                <li
                    onClick={this.handleSortByChange.bind(this, optionValue)}
                    className={this.getSortByClass(optionValue)}
                    key={optionValue}>
                    {option}
                </li>
            );
        });
    };

    handleSearch(e) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        e.preventDefault()
    }
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            e.preventDefault()
        }
      }
    render() {
        return (
            <div className="SearchBar" onKeyPress={this.handleKeyPress}>
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        )
    }
};

export default SearchBar;