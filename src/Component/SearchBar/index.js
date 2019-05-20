import React from 'react';
import './style.css';
export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (<div class="searchContainer">
            <input id='search' class="search" placeholder="搜索" onChange={this.props.onChange}/>
        </div>);
    }


}