import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { URL_LOGIN, URL_ROOT } from "../utils/routes";
import { getCookie } from "../utils/cookie";
import { fetchUser, setUserChecked } from "../services/user-slice";
import Preloader from "./preloader/preloader";

export const ProtectedRouteElement = ({ onlyUnAuth = false, children }) => {
  const { isAuth, isUserChecked } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (getCookie("accessToken") && !isUserChecked) {
      dispatch(fetchUser());
    } else if (!getCookie("accessToken") && !isUserChecked) {
      dispatch(setUserChecked());
    }
  }, [dispatch, isUserChecked]);

  if (!isUserChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to={URL_ROOT} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to={URL_LOGIN} replace state={{ from: location }} />;
  }

  return children;
};
