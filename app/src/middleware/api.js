const API_ROOT = process.env.API_ROOT;

const callApi = (endpoint, method = 'GET', data) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    const opts = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method
    };
    if (data) {
        opts.body = JSON.stringify(data);
    }
    return fetch(fullUrl, opts)
    .then(response =>
          response.json().then(json => {
              if (!response.ok) return Promise.reject(json);
              return json;
          }));
};

export const CALL_API = 'Call API';

export default (/*store*/) => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    const actionWith = data => {
        const finalAction = { ...action, ...data };
        delete finalAction[CALL_API];
        return finalAction;
    };

    const { endpoint, types, method, data} = callAPI;
    const [ requestType, successType, failureType ] = types;
    next(actionWith({ type: requestType }));
    return callApi(endpoint, method, data)
    .then(response => next(actionWith({ response, type: successType })))
    .catch(error => next(actionWith({ type: failureType, error: error.message || 'An error occurred' })));
};