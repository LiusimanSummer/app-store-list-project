const home = (state = [], action) => {
    switch (action.type) {
        case 'GET_TOP_100_APP_LIST':
            return { ...state, oringinalListOfTop100: action.oringinalListOfTop100 };
        case 'GET_POP_10_APP_LIST':
            let { oringinalListOfPopular10 } = action;
            // console.log("Action" + JSON.stringify(action.oringinalListOfPopular10));
            return { ...state, oringinalListOfPopular10 };
        case 'GET_APP_INFO':
            return { ...state, appInfo: action.appInfo };
        default:
            return state
    }
}

export default home