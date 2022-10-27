import { createSlice } from '@reduxjs/toolkit';
import { IAd } from '../Types/ad.types';

interface IAdsState {
  allAds: IAd[] | [];
}

const adsInitialState: IAdsState = {
  allAds: [],
};

const adsSlice = createSlice({
  name: 'ads',
  initialState: adsInitialState,
  reducers: {
    setAllAds(state, action) {
      state.allAds = action.payload;
    },
  },
});

export const adsActions = adsSlice.actions;
export default adsSlice;
