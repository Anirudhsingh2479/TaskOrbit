import { useAuthContext } from '../context/auth-provider';
import useWorkspaceId from '../hooks/use-workspace-id';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withPermission = (WrappedComponent, requiredPermission) => {
  const WithPermission = (props) => {
    const { user, hasPermission, isLoading } = useAuthContext();
    const navigate = useNavigate();
    const workspaceId = useWorkspaceId();

    useEffect(() => {
      if (!user || !hasPermission(requiredPermission)) {
        navigate(`/workspace/${workspaceId}`);
      }
    }, [user, hasPermission, navigate, workspaceId, requiredPermission]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Check if user has the required permission
    if (!user || !hasPermission(requiredPermission)) {
      return null;
    }
    // If the user has permission, render the wrapped component
    return <WrappedComponent {...props} />;
  };
  return WithPermission;
};

export default withPermission;
