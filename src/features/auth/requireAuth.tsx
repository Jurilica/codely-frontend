import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../utils/storageHelpers';

function RequireAuth() {
    const token = getToken() !== undefined;
    const location = useLocation();

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;