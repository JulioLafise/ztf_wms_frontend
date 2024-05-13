import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@wms/hooks';
import { SpinnerDoom } from '../';

interface Props {
  children: React.ReactElement | React.ReactElement[],
  isPublic?: boolean
}

const ProtectedRouter = ({ children, isPublic }: Props) => {
  const { isAuthenticated, isChecking, token, isChangePassword } = useAuth();

  return (
    <React.Fragment>
      {
        !isChecking
          ? isPublic
            ? (isAuthenticated && !isChangePassword)
              ? <Navigate to="/" replace />
              : children
            : !isAuthenticated
              ? <Navigate to="/auth" replace />
              : children
          : token ? <SpinnerDoom /> : children
      }
    </React.Fragment>
  );
};

export default ProtectedRouter;