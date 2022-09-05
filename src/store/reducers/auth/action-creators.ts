import axios from "axios";
import UserService from "../../../api/UserService";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import {AuthActionEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from "./type";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setLoading: (payload: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_LOADING, payload: payload}),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    login: (username: string, password: string) => async (dispatch: any) => {
        try {
            dispatch(AuthActionCreators.setLoading(true));
            setTimeout(async () => {
                const response = await UserService.getUsers();
                const mockUsers = response.data.find(user => user.username === username && user.password === password);
                if (mockUsers) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUsers.username);
                    dispatch(AuthActionCreators.setUser(mockUsers));
                    dispatch(AuthActionCreators.setAuth(true));
                } else {
                    dispatch(AuthActionCreators.setError('Incorrect login or password'));
                }
                dispatch(AuthActionCreators.setLoading(false));
            }, 1000);
        } catch (e) {
            dispatch(AuthActionCreators.setError('Error during login!'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setAuth(false))
    }
}
