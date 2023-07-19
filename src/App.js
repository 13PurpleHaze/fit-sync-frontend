import Exercises from "./pages/Exercises";
import EditExercise from "./pages/EditExercise";
import Users from "./pages/Users";
import Error404 from "./pages/404";
import React, {useContext, useEffect} from "react";
import {BrowserRouter, Link, Navigate, Route, Router, Routes, useNavigate} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import {StoreContext} from "./store";
import Register from "./pages/Register";
import Workout from "./pages/Workout";
import CreateWorkout from "./pages/CreateWorkout";
import SecondStep from "./pages/CreateWorkout/CreateSecondStep";
import {observer} from "mobx-react";
import Session from "./pages/Session";
import EditWorkout from "./pages/EditWorkout";
import EditSecondStep from "./pages/EditWorkout/EditSecondStep";
import CreateSecondStep from "./pages/CreateWorkout/CreateSecondStep";
import Modal from "./components/Modal";
import PrimaryBtn from "./components/PrimaryBtn";
import History from "./pages/History";

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
            path: "/workouts",
            element: <Workout/>
        },
        {
            id: 12,
            path: "/workouts/:id/edit",
            element: <EditWorkout/>
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
        },
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
                    path: '/workouts',
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
                    element: <CreateSecondStep/>
                },
                {
                    id: 7,
                    path: '/session/:id',
                    element: ctx.SessionStore?.session ? <Session/> : <Navigate to="/workouts"/>
                },
                {
                    id: 8,
                    path: "/workouts/:id/edit",
                    element: <EditWorkout/>
                },
                {
                    id: 9,
                    path: "/workouts/:id/edit/step2",
                    element: <EditSecondStep/>
                },
                {
                    id: 10,
                    path: "/history",
                    element: <History/>
                }
            ]
            : [
                {
                    id: 1,
                    path: '/workouts',
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
                {
                    id: 4,
                    path: "/workouts/:id/edit",
                    element: <EditWorkout/>
                },
                {
                    id: 6,
                    path: '/session/:id',
                    element: ctx.SessionStore?.session ? <Session/> : <Navigate to="/workouts"/>
                },
                {
                    id: 7,
                    path: "/history",
                    element: <History/>
                }
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
        <>
            <Router location={ctx.RouterStore.location} navigator={ctx.RouterStore.history}>
                <Routes>
                    <Route index element={<Navigate to="/workouts" replace/>}/>
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
                    <Route key="catch-all" path="*"
                           element={<Navigate to={ctx.AuthStore.isLoggedIn ? '/workouts' : '/login'}/>}/>
                </Routes>
            </Router>
            {
                ctx.ActiveUsersStore.invitation &&
                <Modal setShowModal={ctx.ActiveUsersStore.setInvitation} title="Приглашение">
                    <div className="card__header">
                        <h3 className="text text-white">Пользователь {ctx.ActiveUsersStore.invitation.from.login} приглошает вас</h3>
                    </div>
                    <div className="card__content">
                        <PrimaryBtn onClick={() => {
                            ctx.ActiveUsersStore.accept()
                        }}>Принять</PrimaryBtn>
                        <PrimaryBtn onClick={() => {
                            ctx.ActiveUsersStore.reject()
                        }}>Послать</PrimaryBtn>
                    </div>
                </Modal>
            }
            {
                ctx.ErrorStore?.error &&
                <Modal setShowModal={ctx.ErrorStore.resetError} title="Ошибка">
                    <div className="card__header">
                        {console.log(ctx.ErrorStore.error)}
                        <div className="text text-white">Ошибка: {ctx.ErrorStore.error.code}</div>
                    </div>
                    <div className="card__content">
                        <div className="text text-white">Подробности: {ctx.ErrorStore.error?.response?.data?.error || 'нет'}</div>
                    </div>
                </Modal>
            }
        </>
    );
}

export default observer(App);
