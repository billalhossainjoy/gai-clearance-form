import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layout/client";
import AuthLayout from "./layout/auth";
import DashboardLayout from "./layout/dashboard";
import NewStudentPage from "./pages/Dashboard/newStudent";
import AllStudentsPage from "./pages/Dashboard/allStudents";
import AccountPage from "./pages/Dashboard/account";
import SettingsPage from "./pages/Dashboard/settings";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { getCurrentAdmin } from "./store/auth/auth.slice";
import { Loader } from "lucide-react";
import Protected from "./components/auth/protected";
import BlockLists from "./pages/Dashboard/blockedList";
import ApplicantsPage from "./pages/Dashboard/applicants";
import SigneturesPage from "./pages/Dashboard/signetures";
import MainLayout from "@/layout/mainLayout.tsx";

const App: React.FC = () => {
  const { isLoading, authData, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentAdmin());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 text-primary-500">
            <Loader className="animate-spin text-primary w-10 h-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
          <Route index element={<ClientLayout />} />
          <Route path={"/home"} element={<MainLayout />} />
        <Route
          path="auth"
          element={
            <Protected isAuthenticated={isAuthenticated} authData={authData}>
              <AuthLayout />
            </Protected>
          }
        />
        <Route
          path="admin"
          element={
            <Protected isAuthenticated={isAuthenticated} authData={authData}>
              <DashboardLayout />
            </Protected>
          }
        >
          <Route index element={<NewStudentPage />} />
          <Route path="/admin/all-student" element={<AllStudentsPage />} />
          <Route path="/admin/account" element={<AccountPage />} />
          <Route path="/admin/blocked" element={<BlockLists />} />
          <Route path="/admin/applicants" element={<ApplicantsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/signetures" element={<SigneturesPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
