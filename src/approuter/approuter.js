import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRout, privateRout } from '../router/router';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
    return (
        <Routes>
            {/* Публичные маршруты */}
            {publicRout.map((route, index) => (
                <Route path={route.path} element={route.component} exact={route.exact} key={index} />
            ))}

            {/* Приватные маршруты */}
            {privateRout.map((route, index) => (
                <Route
                    path={route.path}
                    element={<PrivateRoute component={() => route.component} />}
                    exact={route.exact}
                    key={index}
                />
            ))}
        </Routes>
    );
};

export default AppRouter;
