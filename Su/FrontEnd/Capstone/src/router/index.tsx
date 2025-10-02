import React from "react";
import { Route } from "react-router-dom";
import HomeTemplate from "../Users/Home";
import HomePage from "../Users/HomePage/Home";
import AdminTemplate from "../Admin/Admin";
import Login from "../Users/LoginPage/Login";
import Register from "../Users/RegisterPage/Register";
import Listings from "../Users/Listings/Listings";
import RoomDetail from "../Users/RoomDetail/RoomDetail";
import BookingSuccess from "../Users/BookingSuccess/BookingSuccess";
import Profile from "../Users/Profile/Profile";

export type AppRoute = {
    path: string;
    element: React.ReactElement;
    nested?: AppRoute[];
};

export const routes: AppRoute[] = [
    {
        path: "",
        element: <HomeTemplate />,
        nested: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "listings",
                element: <Listings />,
            },
            {
                path: "chi-tiet-phong/:id",
                element: <RoomDetail />,
            },
            {
                path: "dat-phong-thanh-cong",
                element: <BookingSuccess />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
    // Standalone routes without header/footer
    {
        path: "dangnhap",
        element: <Login />,
        nested: [],
    },
    {
        path: "dangky",
        element: <Register />,
        nested: [],
    },
    {
        path: "admin",
        element: <AdminTemplate />,
        nested: [],
    },
];

export const generateRoutes = (routes: AppRoute[]) => {
    return routes.map((route) => {
        if (route.nested && route.nested.length > 0) {
            return (
                <Route path={route.path} element={route.element} key={route.path}>
                    {route.nested.map((nestedRoute) => (
                        <Route
                            path={nestedRoute.path}
                            element={nestedRoute.element}
                            key={nestedRoute.path}
                        />
                    ))}
                </Route>
            );
        }
        return <Route path={route.path} element={route.element} key={route.path} />;
    });
};