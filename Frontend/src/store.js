import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { loginReducer, registerReducer } from './Reducer/userReducer'
import { getDoubtReducer } from './Reducer/doubtReducer'

const reducer = combineReducers({
  userRegister: registerReducer,
  userLogin: loginReducer,
  doubts: getDoubtReducer,
})

const middleware = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
