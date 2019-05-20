import React from 'react';
import SearchBar from '../../Component/SearchBar';
import HorizontalList from '../../Component/HorizontalList';
import VerticalList from '../../Component/VerticalList';
import { getTop100AppList, getPopular10, getAppInfo, clearState } from '../../actions/home';
import { connect } from 'react-redux';
import './style.css';

const mapStateToProps = (state, ownProps) => ({
    oringinalListOfTop100: state.home.oringinalListOfTop100,
    oringinalListOfPopular10: state.home.oringinalListOfPopular10
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTop100AppList: () => dispatch(getTop100AppList()),
    getPopular10: () => dispatch(getPopular10()),
    getAppInfo: (array) => dispatch(getAppInfo(array)),
    clearState: ()=> dispatch(clearState())

})
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfTop100: [],
            listOfPopular10: [],
            oringinalListOfTop100: [],
            oringinalListOfPopular10: [],
            verticalListHeight: window.innerHeight - 200,
            isVerticalLoad: true,
        };
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.oringinalListOfTop100) {
            this.setState({ listOfTop100: newProps.oringinalListOfTop100, oringinalListOfTop100: newProps.oringinalListOfTop100 });
        } else if (newProps.oringinalListOfPopular10) {
            this.setState({ listOfPopular10: newProps.oringinalListOfPopular10, oringinalListOfPopular10: newProps.oringinalListOfPopular10 });
            this.updateDimensions();
        }
    }

    componentWillMount = async () => {

        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions = () => {
        let fixedElementHeight = document.getElementById("container-fixed").offsetHeight;
        this.setState({ verticalListHeight: window.innerHeight - fixedElementHeight });
    }

    search = async () => {
        let s = document.getElementById('search');
        let val = s.value;
        let top100 = this.state.oringinalListOfTop100;
        let pop10 = this.state.oringinalListOfPopular10;
        if (val === '') {
            this.setState({ listOfTop100: top100, listOfPopular10: pop10 });
        } else {

            let searchResult100 = [];
            let searchResult10 = [];
            for (let i = 0; i < top100.length; i++) {
                let app = top100[i];
                let str = app.app_name + app.summary + app.category + app.author;
                if (str.toLowerCase().includes(val.toLowerCase())) {
                    searchResult100.push(app);
                }
            }

            for (let i = 0; i < pop10.length; i++) {
                let app = pop10[i];
                let str = app.app_name + app.summary + app.category + app.author;
                if (str.toLowerCase().includes(val.toLowerCase())) {
                    searchResult10.push(app);
                }
            }
            await this.setState({ listOfPopular10: searchResult10 });
            this.updateDimensions();
            this.setState({ listOfTop100: searchResult100, });
        }

    }

    componentDidMount = async () => {

        await this.props.getPopular10();
        this.setState({ listOfPopular10: this.props.oringinalListOfPopular10 });

        this.updateDimensions();

        await this.props.getTop100AppList();
        this.setState({ listOfTop100: this.props.oringinalListOfTop100 });
        await this.props.getAppInfo(this.state.listOfTop100);
        this.setState({ listOfTop100: this.props.oringinalListOfTop100 });

    }

    render() {
        let verticalListStyle = {
            width: '100%',
            height: this.state.verticalListHeight,
            overflowY: 'auto'
        }
        return (<div class="container" >

            <div id="container-fixed" class="container-fixed">
                <SearchBar onChange={this.search.bind(this)} />
                <div class="line" />
                <div class="recommend">推介</div>
                <HorizontalList data={this.state.listOfPopular10} />
                <div class="line" />
            </div>

            <div id="container-scroll" style={verticalListStyle}>
                <VerticalList isLoad={this.state.isVerticalLoad} data={this.state.listOfTop100} />
            </div>

        </div>);
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
