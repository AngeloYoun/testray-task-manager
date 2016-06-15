import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';

import api from '../middleware/api';

const middleware = applyMiddleware(api, thunk);

export default middleware;