import { ROLE_PERMISSIONS, Role, PermissionLevel } from './roles';

export const hasActionPermission = (role: string | undefined, action: 'canEdit' | 'canDelete' | 'canCreate') => {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role as Role];
  return permissions ? permissions[action] : false;
};

export const hasMinLevel = (role: string | undefined, minLevel: PermissionLevel) => {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role as Role];
  return permissions ? permissions.level <= minLevel : false;
};

export const canSeeFinancials = (role: string | undefined) => {
  if (!role) return false;
  // فقط لول ۱ تا ۴ می‌توانند اطلاعات مالی را ببینند
  return hasMinLevel(role, PermissionLevel.LEVEL_4);
};