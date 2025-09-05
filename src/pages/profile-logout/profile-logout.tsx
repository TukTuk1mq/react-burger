import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../services/hooks";
import { logout } from "../../services/user-slice";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../../utils/routes";

const ProfileLogout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      dispatch(logout());
      navigate(URL_LOGIN, { replace: true });
    } catch (err) {
      setError("Ошибка при выходе из системы");
      console.error("Logout error:", err);
    }
  }, [dispatch, navigate]);

  return (
    <div className="page-container">
      <div className="page-container-inner">
        {error ? (
          <p className="text text_type_main-medium text_color_error">{error}</p>
        ) : (
          <p className="text text_type_main-medium">Выполняется выход...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileLogout;
