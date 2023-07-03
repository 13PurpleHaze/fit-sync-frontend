import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from "./components/NavBar";
import reportWebVitals from './reportWebVitals';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import NewUserModal from "./components/NewUserModal";
import Exercises from "./pages/Exercises";
import EditExercise from "./pages/EditExercise";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import History from "./pages/History/inedx";
import Workout from "./pages/Workout";
import Error404 from "./pages/404";

const routes = [
    {
        id: 0,
        path: '/exercises',
        element: <Exercises/>
    },
    {
        id: 1,
        path: '/exercises/:id',
        element: <EditExercise/>
    },
    {
        id: 2,
        path: '/users',
        element: <Users/>
    },
    {
        id: 3,
        path: '/history',
        element: <History/>
    },
    {
        id: 4,
        path: '/workout',
        element: <Workout/>
    },
    {
        id: 5,
        path: '*',
        element: <Error404/>
    }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {routes.map(route =>
                    <Route path={route.path} element={
                        <>
                            <NavBar/>
                            {route.element}
                        </>
                    }/>
                )}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
