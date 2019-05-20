import Config from '../config';
const axios = require('axios');

export const clearState = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "CLEAR", oringinalListOfTop100: [], oringinalListOfPopular10: [] });
    }
}


export const getTop100AppList = () => {
    return async (dispatch, getState) => {
        var options = {
            method: 'GET',
            url: Config.get100
        };
        await axios(options)
            .then(async res => {
                let data = res["data"]["feed"]["entry"];
                if (data) {
                    let results = [];
                    for (let i = 0; i < data.length; i++) {
                        let app = data[i];
                        let appObject = { app_name: app["im:name"]["label"], app_icon: app["im:image"][1]["label"], category: app["category"]["attributes"]["label"], id: app["id"]["attributes"]["im:id"], summary: app["summary"]["label"], author: app["im:artist"]["label"], rating: -1, user_count: -1 };

                        results.push(appObject);
                    }
                    dispatch({ type: "GET_TOP_100_APP_LIST", oringinalListOfTop100: results });
                }

            }).catch((e) => {
                console.log("ERROR::getTop100List::" + e);

            });
    }
}

export const getPopular10 = () => {
    return async (dispatch, getState) => {
        var options = {
            method: 'GET',
            url: Config.get10
        };

        await axios(options)
            .then(async res => {
                let data = res["data"]["feed"]["entry"];
                if (data) {
                    let results = [];
                    for (let i = 0; i < data.length; i++) {
                        let app = data[i];
                        let appObject = { app_name: app["im:name"]["label"], app_icon: app["im:image"][1]["label"], category: app["category"]["attributes"]["label"], id: app["id"]["attributes"]["im:id"], summary: app["summary"]["label"], author: app["im:artist"]["label"] };
                        results.push(appObject);
                    }
                    dispatch({ type: "GET_POP_10_APP_LIST", oringinalListOfPopular10: results });

                }

            }).catch((e) => {
                console.log("ERROR::getPopular10::" + e);

            });
    }
}

export const getAppInfo = (array) => {
    return async (dispatch, getState) => {
        var options = {
            method: 'GET',
            url: ""
        };
        let arrayResult = [];
        for (let i = 0; i < array.length; i++) {
            let app = array[i];
            if (app.rating === -1 || app.user_count === -1) {
                options.url = Config.getAppById + app.id;
                await axios(options).then(async appRes => {
                    app.rating = appRes["data"]["results"][0]["averageUserRating"] ? appRes["data"]["results"][0]["averageUserRating"] : -1;
                    app.user_count = appRes["data"]["results"][0]["userRatingCount"] ? appRes["data"]["results"][0]["userRatingCount"] : -1;
                }).catch((e) => {
                    console.log("ERROR::getAppById::" + e);
                });
            }
            arrayResult.push(app);
        }
        dispatch({ type: "GET_TOP_100_APP_LIST", oringinalListOfTop100: arrayResult });

    }
}


