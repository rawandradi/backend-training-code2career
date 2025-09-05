export const MODULES_NAMES = {
  auth: 'AUTH',
  user: 'USER',
  course:'COURSE',
  system:'SYSTEM'
} as const;

export type ModuleNameType = (typeof MODULES_NAMES)[keyof typeof MODULES_NAMES];

export const ROLES = {
  ADMIN: "ADMIN",
  COACH: "COACH",
  STUDENT: "STUDENT"
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

