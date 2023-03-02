import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getComment } from '../api';
import { Comment, InitialStateForComments } from '../types/comment';

const initialState: InitialStateForComments = {
  comments: [],
  loading: false,
  error: '',
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    take: (state, action: PayloadAction<number>) => {
     state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    clear: (state) => {
      state.comments = [];
    },
  }, 

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      console.log('Loading Comments');
     });
    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Error Comments';
      console.log('Rejected Comments');
    });
  },
});

export const { actions } = commentSlice;
export const { add, take, clear } = commentSlice.actions;

export default commentSlice.reducer;

export const init = createAsyncThunk('comments/get', async (phoneId: number) => {

  return getComment(phoneId);
});