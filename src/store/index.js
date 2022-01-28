import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { taskManagerReducer } from './taskManagerReducer';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  taskManager: taskManagerReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
