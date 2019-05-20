import React from 'react';

import './style.css';
export default class VerticalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            isLoad: this.props.isLoad,

        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ data: newProps.data, isLoad: newProps.isLoad });
    }

    render_stars = (item) => {
        let count = item.user_count<0? 0: item.user_count;
        let checkedNum = item.rating === -1 ? 0 : parseInt(item.rating);
        let unCheckedNum = 5 - checkedNum;
        let stars = [];
        for (let i = 0; i < checkedNum; i++) {
            stars.push(<span class="fa fa-star checked"></span>);
        }
        for (let i = 0; i < unCheckedNum; i++) {
            stars.push(<span class="fa fa-star-o"></span>);
        }
        stars.push(<span>{'(' + count+ ')'}</span>);
        return stars;

    }

    render_list() {
        return (this.state.data.map((item, index) => {
            let iconClass = "vertical-item-icon";
            if (index % 2 === 1) {
                iconClass = "vertical-item-icon-circle"
            }
            return <div key={"vertical-item" + index} class="vertical-item-container">
                <div class="vertical-item-sub-container">
                    <div class="number">{index + 1}</div>
                    <img alt="icon" class={iconClass} src={item.app_icon} />
                </div>
                <div class="vertical-item-description">
                    <div class="vertical-item-name">{item.app_name}</div>
                    <div class="vertical-item-category">{item.category}</div>
                    <div class="vertical-item-category">
                        {this.render_stars(item)}
                    </div>
                </div>
            </div>
        }));

    }

    render() {
        return (<div class="vertical-list-container">
            {/* {this.state.isLoad && <div class="loader_container"><div class="loader"></div></div>} */}
            {this.render_list()}
        </div>);
    }


}