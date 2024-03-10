import { Navigate } from 'react-router-dom';
import AuthorizationStatus from '../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.VALID
      ? children
      : <Navigate to={'/login'} />
  );
}

export default PrivateRoute;
