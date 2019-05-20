import React from 'react';
import './style.css';
export default class HorizontalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data

        };
    }

    componentWillReceiveProps(newProps){
        this.setState({data: newProps.data});
    }

    render_list() {
        return (this.state.data.map((item, index) => {
            return <div class="item-container">
                <img alt="icon" class="icon" src={item.app_icon} />
                <div class="name">{item.app_name}</div>
                <div class="category">{item.category}</div>
            </div>
        }));

    }

    render() {
        return (<div class="list-container">
            {this.render_list()}
        </div>);
    }


}