import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';

// There’s also an app directory. This holds the application store setup. 
// Global application setups/logic will go in this directory. We’ll keep this directory, i.e., do not delete.
export const store = configureStore({
  reducer: rootReducer,
  devTools: {
    name: "TweetFind",
  }
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => store.replaceReducer(rootReducer));
}