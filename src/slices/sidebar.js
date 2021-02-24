import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    active: false,
    id: 1,
    title: 'Two Sum',
    topics: ['Array', 'Hash Table'],
    difficulty: 1,
    upvotes: 321,
    downvotes: 123,
    url: 'https://leetcode.com/problems/two-sum/',
  },

  // REDUCERS
  reducers: {
    toggleSidebarActive: state => {
      state.active = !state.active;
    },
    setProblemId: (state, action) => {
      state.id = action.payload;
    },
    setProblemTitle: (state, action) => {
      state.title = action.payload;
    },
    setProblemTopics: (state, action) => {
      state.topics = action.payload;
    },
    setProblemDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setProblemUpvotes: (state, action) => {
      state.upvotes = action.payload;
    },
    setProblemDownvotes: (state, action) => {
      state.downvotes = action.payload;
    },
    setProblemUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

// ACTIONS
export const { 
  toggleSidebarActive,
  setProblemId,
  setProblemTitle,
  setProblemTopics,
  setProblemDifficulty,
  setProblemUpvotes,
  setProblemDownvotes,
  setProblemUrl
} = sidebarSlice.actions;

// SELECTORS
export const getSidebarState = state => state.sidebar.active;
export const getProblemId = state => state.sidebar.id;
export const getProblemTitle = state => state.sidebar.title;
export const getProblemTopics = state => state.sidebar.topics;
export const getProblemDifficulty = state => state.sidebar.difficulty;
export const getProblemUpvotes = state => state.sidebar.upvotes;
export const getProblemDownvotes = state => state.sidebar.downvotes;
export const getProblemUrl = state => state.sidebar.url;

export default sidebarSlice.reducer;
