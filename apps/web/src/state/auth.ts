import { create } from "zustand";

type State = {
  token: string | null;
  user: { id: string; name: string; role: string; walkthroughCompleted?: boolean } | null;
  tenant: { id: string; slug: string; name: string } | null;
  setAuth: (payload: { token: string; user: State["user"]; tenant: State["tenant"] }) => void;
  signOut: () => void;
};

const STORAGE_KEY = "brain.auth";

function load(): Partial<State> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export const useAuth = create<State>((set) => ({
  token: (load().token as string) ?? null,
  user: (load().user as State["user"]) ?? null,
  tenant: (load().tenant as State["tenant"]) ?? null,
  setAuth: ({ token, user, tenant }) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user, tenant }));
    set({ token, user, tenant });
  },
  signOut: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ token: null, user: null, tenant: null });
  },
}));
