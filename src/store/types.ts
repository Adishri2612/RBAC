type EmptyCreds = {
  email: null;
  authState: "logged-out";
  role: null
}

type FullCreds = {
  email: string;
  authState: "logged-in" | "logged-out" | "onboarding";
  role: "superadmin" | "admin" | "user"
}

type Creds = EmptyCreds | FullCreds

type IAuthStoreState = {
  creds: Creds;
};

type IAuthStoreActions = {
  updateCreds: (creds: FullCreds) => void;
  resetCreds: () => void;
  getIsLogin: () => boolean;
};

type IAuthStore = IAuthStoreState & IAuthStoreActions;

export type { IAuthStore };
