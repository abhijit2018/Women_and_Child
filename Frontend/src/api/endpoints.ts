const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    VERIFY_TOKEN: "/auth/verify-token",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  // Website
  HOME: "/home",
  ABOUT: "/about",
  SERVICES: "/services",
  CONTACT: "/contact",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Users
  USERS: {
    LIST: "/users",
    DETAILS: (id: string) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Roles
  ROLES: {
    LIST: "/roles",
    CREATE: "/roles",
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`,
  },

  // Profile
  PROFILE: "/profile",

  // Settings
  SETTINGS: "/settings",
};

export default ENDPOINTS;