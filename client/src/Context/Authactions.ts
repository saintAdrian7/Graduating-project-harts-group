// authActions.ts
import axios from 'axios';
import {  LoginUserPayload, RegisterUserPayload } from '../Models/User';
import { Action} from './Authconstants';


export const loginUser = async (dispatch: React.Dispatch<Action>, user: LoginUserPayload) => {
  dispatch({ type: 'LOGIN REQUEST' });
  try {
    const response = await axios.post('http://localhost:4000/users/login', user);
    const currentLoggedInUser = response.data.user;
    const userId = currentLoggedInUser.id;
    if (currentLoggedInUser && currentLoggedInUser.id) {
      sessionStorage.setItem("userId", userId.toString());
    } else {
      console.error("User ID not found in response");
    }

    dispatch({ type: 'LOGIN SUCCESS', payload: currentLoggedInUser });
  } catch (error) {
    console.error("Error during login:", error);
    dispatch({ type: 'LOGIN FAILURE' });
    throw error;
  }
};

export const registerUser = async (dispatch: React.Dispatch<Action>, user: RegisterUserPayload) => {
  dispatch({ type: 'REGISTER REQUEST' });
  try {
    await axios.post('http://localhost:4000/users/register', user);
    dispatch({ type: 'REGISTER SUCCESS' });
  } catch (error) {
    dispatch({ type: 'REGISTER FAILURE' });
    throw error;
  }
};

export const fetchUser = async (dispatch: React.Dispatch<Action>, id: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    dispatch({ type: 'LOGIN SUCCESS', payload: response.data.user });
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

