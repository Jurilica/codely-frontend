import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

function RequireAuth() {
    const isLoggedIn = useAppSelector(state => state.auth.isAuthenticated);
    const location = useLocation();

    return (
        isLoggedIn
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;