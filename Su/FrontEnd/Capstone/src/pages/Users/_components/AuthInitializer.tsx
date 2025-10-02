import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../LoginPage/slice";
import sessionManager from "../../utils/session";
import type { AppDispatch } from "../../store";

type Props = {
    children: React.ReactNode;
};

export default function AuthInitializer({ children }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Rehydrate auth from localStorage
        try {
            const isAuth = localStorage.getItem('auth_isAuthenticated') === 'true';
            const userRaw = localStorage.getItem('auth_user');
            const token = localStorage.getItem('accessToken');
            let user: any = null;
            if (userRaw) {
                user = JSON.parse(userRaw);
                if (token && !user.token) user.token = token;
            }
            if (isAuth && user) {
                dispatch(setAuthenticated(user));
            }
        } catch { }

        // Initialize session manager
        try {
            // provide store via global set in store/index.tsx
            sessionManager.setStore(window.__REDUX_STORE__ as any);
            sessionManager.initSession();
        } catch { }
    }, [dispatch]);

    return <>{children}</>;
}






