import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "hooks";
import { Auth, Home } from "pages";

function App() {
  const user = useAppSelector((state) => state.users);
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={user.isAuth ? <Home /> : <Auth />} />
          <Route path="auth" element={<Auth />} />
          <Route
            path="home"
            element={user.isAuth ? <Home /> : <Navigate to="/auth" replace />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
