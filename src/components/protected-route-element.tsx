import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { URL_LOGIN, URL_ROOT } from "../utils/routes";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { getCookie } from "../utils/cookie";
import { fetchUser, setUserChecked } from "../services/user-slice";
import Preloader from "./preloader/preloader";

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuth, isUserChecked } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (getCookie("accessToken") && !isUserChecked) {
      dispatch(fetchUser());
    } else if (!getCookie("accessToken") && !isUserChecked) {
      dispatch(setUserChecked());
    }
  }, [dispatch, isUserChecked]);

  const from = location.state?.from?.pathname || URL_ROOT;

  if (!isUserChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to={URL_LOGIN} replace state={{ from: location }} />;
  }

  return children;
};
