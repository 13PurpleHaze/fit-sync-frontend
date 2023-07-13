import Exercises from "./pages/Exercises";
import EditExercise from "./pages/EditExercise";
import Users from "./pages/Users";
import Error404 from "./pages/404";
import React, {useContext, useEffect} from "react";
import {BrowserRouter, Navigate, Route, Router, Routes, useNavigate} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import {StoreContext} from "./store";
import Register from "./pages/Register";
import Workout from "./pages/Workout";
import CreateWorkout from "./pages/CreateWorkout";
import SecondStep from "./pages/CreateWorkout/SecondStep";
import {observer} from "mobx-react";
import Session from "./pages/Session";

function App() {
    const adminRoutes = [
        {
            id: 1,
            path: "/users",
            element: <Users/>
        },
        {
            id: 2,
            path: "/exercises",
            element: <Exercises/>
        },
        {
            id: 3,
            path: '/exercises/:id',
            element: <EditExercise/>
        },
    ];
    const authRoutes = [
        {
            id: 1,
            path: "/workout",
            element: <Workout/>
        },
        {
            id: 19,
            path: "/workouts/create",
            element: <CreateWorkout/>
        },
        {
            id: 21,
            path: "/workouts/create/step2",
            element: <SecondStep/>
        },
        {
            id: 33,
            path: "*",
            element: <Error404/>
        }
    ];
    const guestRoutes = [
        {
            id: 1,
            path: "/login",
            element: <Login/>
        },
        {
            id: 2,
            path: "/register",
            element: <Register/>
        }
    ];
    const ctx = useContext(StoreContext);
    const currentRoutes = ctx.AuthStore.isLoggedIn
        ? ctx.AuthStore.isAdmin
            ? [
                {
                    id: 1,
                    path: '/users',
                    element: <Users/>,
                },
                {
                    id: 2,
                    path: '/exercises',
                    element: <Exercises/>,
                },
                {
                    id: 3,
                    path: '/exercises/:id',
                    element: <EditExercise/>,
                },
                {
                    id: 4,
                    path: '/workout',
                    element: <Workout/>,
                },
                {
                    id: 5,
                    path: '/workouts/create',
                    element: <CreateWorkout/>,
                },
                {
                    id: 6,
                    path: '/workouts/create/step2',
                    element: <SecondStep/>,
                },
                {
                    id: 7,
                    path: '/session/:id',
                    element: <Session/>,
                }
            ]
            : [
                {
                    id: 1,
                    path: '/workout',
                    element: <Workout/>,
                },
                {
                    id: 2,
                    path: '/workouts/create',
                    element: <CreateWorkout/>,
                },
                {
                    id: 3,
                    path: '/workouts/create/step2',
                    element: <SecondStep/>,
                },
                // ...authRoutes
            ]
        : [
            {
                id: 1,
                path: '/login',
                element: <Login/>,
            },
            {
                id: 2,
                path: '/register',
                element: <Register/>,
            },
        ];

    return (
        <Router location={ctx.RouterStore.location} navigator={ctx.RouterStore.history}>
            <Routes>
                <Route index element={<Navigate to="/workout" replace/>}/>
                {currentRoutes.map((route) => (
                    <Route
                        key={route.id}
                        path={route.path}
                        element={
                            ctx.AuthStore.isLoggedIn ?
                                <>
                                    <NavBar/>
                                    {route.element}
                                </> :
                                route.element
                        }
                    />
                ))}
                {/* Перенаправление пользователя на соответствующую страницу */}
                <Route key="catch-all" path="*"
                       element={<Navigate to={ctx.AuthStore.isLoggedIn ? '/workout' : '/login'}/>}/>
            </Routes>
        </Router>
    );
}

export default observer(App);
