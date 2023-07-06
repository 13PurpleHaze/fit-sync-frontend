import Exercises from "./pages/Exercises";
import EditExercise from "./pages/EditExercise";
import Users from "./pages/Users";
import History from "./pages/History/inedx";
import Workout from "./pages/Workout";
import Error404 from "./pages/404";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";

function App() {
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
      element: <Login/>
    },
    {
      id: 5,
      path: '*',
      element: <Error404/>
    }
  ];
  return (
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
  );
}

export default App;
