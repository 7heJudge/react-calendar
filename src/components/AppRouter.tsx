import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Event from "../pages/Event";

const AppRouter = () => {
    const auth = false;
    
    return (
        auth ?
            <Routes>
                <Route path="/" element={<Event/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes> :
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/login" replace/>}
                />
            </Routes>

    );
};

export default AppRouter;
