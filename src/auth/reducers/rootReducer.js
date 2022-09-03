import { combineReducers } from 'redux';

//sesión
import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
    session: sessionReducer
});

export default rootReducer;