import React, { Component } from 'react'
import Repos from './Repos';
import { makeRequest } from '../utils/index'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searched: [],
            currentRepo: {
                id: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const repo = {}
        const slug = this.state.value;
        const response = makeRequest(slug);

        response.then(function(res) {
            console.log(res);
        })

        this.searched(slug);
        event.preventDefault();
    }

    searched(repo) {
        var newArray = this.state.searched.slice();
        newArray.push(repo);
        this.setState({searched:newArray})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Repository:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {this.state.searched.length > 0 ? <Repos repos={this.state.searched}/> : null}
            </div>
        )
    }
}

export default Search;