import React from "react";

export interface IRoute {
    path: string;
    element: React.ReactNode;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/'
}
