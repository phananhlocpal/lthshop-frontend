'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers, login } from "../../store/actions/userActions";
import { selectCurrentUser, selectError, selectIsLoading, selectToken, setUser } from "../../store/reducers/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const getUsersHandler = async () => {
    await dispatch(getUsers());
  };

  const getUserHandler = async (userId) => {
    await dispatch(getUser(userId));
  };

  const loginHandler = async (loginData) => {
    const { payload: userId } = await dispatch(login(loginData));
    const { payload: user } = await dispatch(getUser(userId));
    if (user) {
      dispatch(setUser(user));
    }
    return user;
  };


  useEffect(() => {
    if (token ) {
    }
  }, [token]);

  return { 
    login: loginHandler, 
    getUsers: getUsersHandler,
    getUser: getUserHandler,
    token, 
    currentUser,
    isLoading,
    error,
    logout: () => dispatch(logout()) };
};
