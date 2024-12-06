import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "./auth/auth.slice";
import adminReducer from "./admin/admin.slice";
import clientReducer from "./client/client.slice";
import studentReducer from "./student/student.slice";
import signetureRowReducer from "./sign/signetureRow.slice";
import signetureReducer from "./sign/signeture.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    client: clientReducer,
    student: studentReducer,
    signetureRow: signetureRowReducer,
    signeture: signetureReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector);

export default store;
