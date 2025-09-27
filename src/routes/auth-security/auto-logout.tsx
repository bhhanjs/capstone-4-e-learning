import { type ReactNode } from "react";
import { useEffect, useCallback, useRef } from "react";
import { useAppDispatch } from "@/hooks/hook";
import { setLogOut } from "@/store/slices/user";
import PATH from "../path";
import { useNavigate } from "react-router-dom";

interface MyComponentProps {
  children?: ReactNode;
}

export default function InactiveAutoLogout({ children }: MyComponentProps) {
  const navigate = useNavigate();
  const timerIdRef = useRef<number | null>(null);
  const logoutTimer = 1000 * 60 * 30;
  const dispatch = useAppDispatch();

  const handleLogOut = useCallback(
    function () {
      dispatch(setLogOut());
      alert("You were logged out due to inactivity");
      navigate(PATH.DANG_KY);
    },
    [dispatch, navigate]
  );

  const resetTimer = useCallback(
    function () {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      timerIdRef.current = window.setTimeout(handleLogOut, logoutTimer);
    },
    [logoutTimer, handleLogOut]
  );
  useEffect(() => {
    resetTimer();

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer]);

  return children;
}
