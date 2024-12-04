const roles = ["superadmin", "admin", "user"] as const;

export type Role = typeof roles[number]

const fullAccess = ["create", "read", "update", "delete"] as const
const readOnlyAccess = ["read"] as const


const ROLES = {
  superadmin: {
    history: fullAccess,
    settings: fullAccess,
  },
  admin: {
    explorer: fullAccess
  }
}
