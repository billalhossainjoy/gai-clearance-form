import ApiClient from "@/lib/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Data {
  id: string;
  labelId: string;
  serial: string;
  depertment: string;
  depertmentId: string;
  sign1: string;
  sign2: string;
  sign3: string;
  sign4: string;
  sign5: string;
  sign6: string;
}

interface InitialState {
  isLoading: boolean;
  data: null | Data;
}

const initialState: InitialState = {
  isLoading: false,
  data: null,
};

export const createSign = createAsyncThunk(
  "/clearance/add-sign/:id",
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const res = await ApiClient.put("/clearance/add-sign/" + id, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSign = createAsyncThunk(
  "/clearance/row/:id",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get("/clearance/row/" + id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSign = createAsyncThunk(
  "/clearance/remove/:id",
  async ({ id, index }: { id: string; index: string }, { rejectWithValue }) => {
    try {
      const res = await ApiClient.put(`/clearance/remove/${id}?index=${index}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signetureSlice = createSlice({
  name: "signeture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createSign.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchSign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSign.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteSign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteSign.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default signetureSlice.reducer;
