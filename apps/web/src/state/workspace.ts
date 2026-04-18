import { create } from "zustand";

export type WorkspaceId = "flare" | "macro";

export const WORKSPACES: Array<{ id: WorkspaceId; name: string }> = [
  { id: "flare", name: "Flare Fitness" },
  { id: "macro", name: "Macro" },
];

type State = {
  active: WorkspaceId;
  setActive: (id: WorkspaceId) => void;
};

const STORAGE_KEY = "brain.workspace";

function load(): WorkspaceId {
  if (typeof window === "undefined") return "flare";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "macro" ? "macro" : "flare";
}

export const useWorkspace = create<State>((set) => ({
  active: load(),
  setActive: (id) => {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, id);
    set({ active: id });
  },
}));
