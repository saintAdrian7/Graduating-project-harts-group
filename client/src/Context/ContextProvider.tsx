import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { LoginUserPayload, RegisterUserPayload, User } from '../Models/User';
import axios from 'axios'



interface AuthenticationState {
    loggedInUser : User | undefined;
    ProfileUser : User | undefined;
    displayLogin : boolean;
    loading: boolean;
    error: boolean;
    registerSuccess : boolean;
}

type Action = 
| {type: 'REGISTER REQUEST'}
| {type: 'REGISTER SUCCESS'}
| {type: 'REGISTER FAILURE'}
| {type: 'LOGIN REQUEST'}
| {type: 'LOGIN SUCCESS', payload: User}
| {type: 'LOGIN FAILURE'}
| {type: 'LOGOUT'}
| {type: 'HIDE MODAL'}
| {type: 'RESET REGISTER SUCCESS'}
| {type: 'SHOW MODAL'}



const initialState: AuthenticationState = {
    loggedInUser: undefined,
    ProfileUser: undefined,
    displayLogin: false,
    loading: false,
    error: false,
    registerSuccess: false,
  };


  const AuthContext =  createContext<{
    state: AuthenticationState;
    dispatch: React.Dispatch<Action>;
  }>({state:initialState,  dispatch: () => null})



  const AuthReducer = (state: AuthenticationState, action: Action ): AuthenticationState => {
    switch (action.type) {
        case 'REGISTER REQUEST':
            return {...state, loading: true, error: false, registerSuccess: false}
        case 'REGISTER SUCCESS':
            return {...state, loading: false, error: false, registerSuccess: true}
        case 'REGISTER FAILURE':
            return {...state, loading: false, error: true, registerSuccess: false}
        case 'LOGIN REQUEST':
                return {...state, loading: true, error: false, registerSuccess: false}
        case 'LOGIN SUCCESS':
            return {...state, loading: false, error: false, registerSuccess: false, loggedInUser:action.payload }
        case 'LOGIN FAILURE':
                return {...state, loading: false, error: true, registerSuccess: false}
        case 'LOGOUT':
             return {...state, loggedInUser: undefined, ProfileUser:undefined}
        case 'HIDE MODAL':
            return{...state, displayLogin:false}
        case 'SHOW MODAL':
            return{...state, displayLogin: true}
        default:
            return state;  
    }

  }


  export const AuthProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    return (
    <AuthContext.Provider value={{state, dispatch}}>
        {children}
    </AuthContext.Provider>
    )
  }

  export const useAuth = () => useContext(AuthContext);


  export const loginUser = async (dispatch: React.Dispatch<Action>, user: LoginUserPayload) => {
    dispatch({ type: 'LOGIN REQUEST' });
    try {
      const response = await axios.post('http://localhost:4000/users/login', user);
      dispatch({ type: 'LOGIN SUCCESS', payload: response.data.user });
      localStorage.setItem("userId", response.data.user._id);
      console.log(response.data.user);
    } catch (error) {
      dispatch({ type: 'LOGIN FAILURE' });
      throw error;
    }
  };

  export const registerUser = async (dispatch: React.Dispatch<Action>, user: RegisterUserPayload) => {
    dispatch({ type: 'REGISTER REQUEST' });
    try {
      const response = await axios.post('http://localhost:4000/users/register', user);
      dispatch({ type: 'REGISTER SUCCESS' });
    } catch (error) {
      dispatch({ type: 'REGISTER FAILURE' });
      throw error;
    }
  };