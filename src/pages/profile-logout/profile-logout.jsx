import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../services/user-slice";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../../utils/routes";

export default function ProfileLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate(URL_LOGIN, { replace: true });
  }, [dispatch, navigate]);

  return <p>Выход...</p>;
}
