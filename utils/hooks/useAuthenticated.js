"use client";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/reducers/userSlice';

export const useIsAuthenticated = () => {
  const currentUser = useSelector(selectCurrentUser);
  return currentUser !== null;
};
