import { Navigate, useLocation } from "react-router-dom";
import { AccountUsers } from "../Account/column";

interface Props {
  authData: AccountUsers | null;
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const Protected: React.FC<Props> = ({
  authData,
  isAuthenticated,
  children,
}) => {
  const { pathname } = useLocation();

  if (isAuthenticated && authData && pathname.includes("/auth"))
    return <Navigate to={"/admin"} />;

  if (!isAuthenticated && !pathname.includes("/auth"))
    return <Navigate to={"/auth"} />;

  return <>{children}</>;
};
export default Protected;
