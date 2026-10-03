import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SETTINGS, DEMO_USER } from '../../constants/profile';
import { loadFromStorage } from '../../utils/storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: loadFromStorage('user_profile', null),
    settings: { ...DEFAULT_SETTINGS, ...loadFromStorage('user_settings', {}) },
  },
  reducers: {
    signIn: (state) => {
      state.profile = state.profile ?? DEMO_USER;
    },
    signOut: (state) => {
      state.profile = null;
    },
    updateProfile: (state, action) => {
      if (state.profile) state.profile = { ...state.profile, ...action.payload };
    },
    setAvatar: (state, action) => {
      if (state.profile) state.profile.avatar = action.payload;
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { signIn, signOut, updateProfile, setAvatar, updateSettings } = userSlice.actions;

export const selectProfile = (state) => state.user.profile;
export const selectSettings = (state) => state.user.settings;

export default userSlice.reducer;