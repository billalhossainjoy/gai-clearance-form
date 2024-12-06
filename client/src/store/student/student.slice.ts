import { Student } from "@/components/studentColumns/allStudent";
import ApiClient from "@/lib/apiClient";
import { StudentSchemaType } from "@/schema/student.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IntitalState {
  isLoading: boolean;
  data: Student[];
  loader: boolean;
  student: Student | null;
  error: unknown;
}

const initialState: IntitalState = {
  isLoading: false,
  data: [],
  loader: false,
  student: null,
  error: null,
};

export const addNewStudent = createAsyncThunk(
  "/student/add",
  async (data: StudentSchemaType, { rejectWithValue }) => {
    try {
      const res = await ApiClient.post("student/add", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "/student/update",
  async (
    { id, data }: { id: string; data: StudentSchemaType },
    { rejectWithValue }
  ) => {
    try {
      console.log(data);
      const res = await ApiClient.put(`student/update/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "/student/remove",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ApiClient.delete(`student/remove/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptStudent = createAsyncThunk(
  "/student/accept",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ApiClient.put(`student/accept/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudent = createAsyncThunk(
  "/student",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get(`student/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllStudent = createAsyncThunk(
  "/student/all-active-students",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get(`student/all-active-students`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllBlockedStudent = createAsyncThunk(
  "/student/all-blocked-students",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get(`student/all-blocked-students`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllApplicentStudent = createAsyncThunk(
  "/student/all-applicant-students",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get(`student/all-applicant-students`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetStudent: (state) => {
      state.isLoading = false;
      state.data = [];
      state.error = null;
    },
    removeFetchedStudent: (state) => {
      state.student = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addNewStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addNewStudent.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((student) =>
          student.id === action.payload.id ? action.payload : student
        );
      })
      .addCase(updateStudent.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (student) => student.id !== action.payload.id
        );
      })
      .addCase(deleteStudent.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(acceptStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (student) => student.id !== action.payload.id
        );
      })
      .addCase(acceptStudent.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchStudent.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.loader = false;
        state.student = action.payload;
      })
      .addCase(fetchStudent.rejected, (state) => {
        state.loader = false;
      });
    builder
      .addCase(fetchAllStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllStudent.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchAllBlockedStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBlockedStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllBlockedStudent.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchAllApplicentStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllApplicentStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllApplicentStudent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetStudent } = studentSlice.actions;

export default studentSlice.reducer;
