import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

function RequireAuth() {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;