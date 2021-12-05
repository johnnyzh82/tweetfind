import { createSlice } from '@reduxjs/toolkit';

import numberOfResultsSlice from '../numberOfResults/numberOfResultsSlice';
import { findTweets } from "./findTweets";

const initialState = { tweets: [], isLoading: false, error: numberOfResultsSlice };

export const fetchTweets = (searchValue, numberOfResults) => async (dispatch) => {
    // loading ...
    dispatch(isLoadingTweets());

    // perform actual data fetch 
    const tweets = await findTweets(searchValue, numberOfResults);

    // success 
    dispatch(loadingTweetsSuccess(tweets));
};

const finderSlice = createSlice({
    name: 'finder',
    initialState,
    reducers: {
        // note that the payload is deconstructed from the action object
        loadingTweetsSuccess(state, { payload }) {
            state.tweets = payload;
            state.isLoading = false;
            state.error = null;
        },
        isLoadingTweets(state) {
            state.isLoading = true;
        },
    },
});

export const { isLoadingTweets, loadingTweetsSuccess } = finderSlice.actions;
export default finderSlice.reducer;