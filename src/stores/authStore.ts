import { create } from "zustand";
import { readJson, writeJson } from "@/utils/storage";
import { sha256Hex } from "@/utils/crypto";
import type { User } from "@/types/commerce";

type StoredUser = {
  email: string;
  passwordHash: string;
  createdAt: string;
};

type AuthState = {
  user?: User;
  register: (input: { email: string; password: string }) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (input: { email: string; password: string }) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
};

const USERS_KEY = "noir_users_v1";
const SESSION_KEY = "noir_session_v1";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const useAuthStore = create<AuthState>((set, get) => {
  const sessionEmail = readJson<string | undefined>(SESSION_KEY, undefined);
  const initialUser = sessionEmail ? ({ email: sessionEmail } satisfies User) : undefined;

  return {
    user: initialUser,

    register: async ({ email, password }) => {
      const norm = normalizeEmail(email);
      if (!/^\S+@\S+\.\S+$/.test(norm)) return { ok: false, error: "请输入正确的邮箱地址" };
      if (password.length < 6) return { ok: false, error: "密码至少 6 位" };

      const users = readJson<StoredUser[]>(USERS_KEY, []);
      if (users.some((u) => u.email === norm)) return { ok: false, error: "该邮箱已注册" };

      const passwordHash = await sha256Hex(password);
      const next = [{ email: norm, passwordHash, createdAt: new Date().toISOString() }, ...users];
      writeJson(USERS_KEY, next);
      writeJson(SESSION_KEY, norm);
      set({ user: { email: norm } });
      return { ok: true };
    },

    login: async ({ email, password }) => {
      const norm = normalizeEmail(email);
      if (!/^\S+@\S+\.\S+$/.test(norm)) return { ok: false, error: "请输入正确的邮箱地址" };

      const users = readJson<StoredUser[]>(USERS_KEY, []);
      const existed = users.find((u) => u.email === norm);
      if (!existed) return { ok: false, error: "该邮箱尚未注册" };

      const passwordHash = await sha256Hex(password);
      if (passwordHash !== existed.passwordHash) return { ok: false, error: "邮箱或密码错误" };

      writeJson(SESSION_KEY, norm);
      set({ user: { email: norm } });
      return { ok: true };
    },

    logout: () => {
      writeJson(SESSION_KEY, undefined);
      set({ user: undefined });
    },
  };
});

