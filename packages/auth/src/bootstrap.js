import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, { onNavigate, onSignIn, defaultHistory, initialPath }={}) => {
    let history
    if(defaultHistory) history = defaultHistory
    else history = createMemoryHistory({
        initialEntries: [initialPath]
    });
    onNavigate && history.listen(onNavigate)
    ReactDOM.render(
        <App history={history} onSignIn={onSignIn} />,
        el
    )
    return {
        onParentNavigate: ({pathname: nextPathName}) => {
            if(history.location.pathname !== nextPathName) {
                history.push(nextPathName);
            }
        }
    }
}

// If we are development and in isolation, call mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root')
    if(devRoot) {
        mount(devRoot, {defaultHistory: createBrowserHistory()});
    }
}

// We are running through container, we should export the mount function
export { mount };