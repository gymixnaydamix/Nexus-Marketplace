
import React from 'react';
import { useApp } from '../../AppContext';
import { PermissionAction, Role } from '../../types';

interface PermissionGateProps {
  action?: PermissionAction;
  roles?: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A security gate that only renders children if the current user has 
 * the required permission action or belongs to one of the required roles.
 */
export const PermissionGate: React.FC<PermissionGateProps> = ({ 
  action, 
  roles, 
  children, 
  fallback = null 
}) => {
  const { hasPermission, currentUser } = useApp();

  let hasAccess = true;

  if (action && !hasPermission(action)) {
    hasAccess = false;
  }

  if (roles && !roles.includes(currentUser.role)) {
    hasAccess = false;
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
