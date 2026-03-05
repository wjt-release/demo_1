import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useAuthStore } from "@/stores/authStore";

export default function Auth() {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      if (mode === "register" && password !== confirm) {
        setError("两次输入的密码不一致");
        return;
      }
      const res =
        mode === "login"
          ? await login({ email, password })
          : await register({ email, password });
      if (res.ok === false) setError(res.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" className="py-10">
      <div className="rounded-2xl border border-border bg-bg/70 p-8 shadow-soft backdrop-blur">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.32em] text-muted">ACCOUNT</div>
            <div className="mt-2 font-display text-3xl tracking-wide text-fg">注册 / 登录</div>
            <div className="mt-2 text-sm text-muted">使用邮箱注册或登录以保存订单与地址。</div>
          </div>
          {user ? (
            <div className="hidden text-right sm:block">
              <div className="text-xs tracking-wide text-muted">当前登录</div>
              <div className="mt-1 text-sm font-medium tracking-wide text-fg">{user.email}</div>
            </div>
          ) : null}
        </div>

        {user ? (
          <div className="mt-8 grid gap-3">
            <Link to="/orders">
              <Button size="lg" className="w-full">
                查看历史订单
              </Button>
            </Link>
            <Button size="lg" variant="secondary" onClick={logout}>
              退出登录
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-8 flex items-center gap-2 rounded-2xl border border-border bg-white/40 p-2">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`h-10 flex-1 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                  mode === "login" ? "bg-fg text-bg" : "text-fg/70 hover:bg-fg/5 hover:text-fg"
                }`}
              >
                登录
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`h-10 flex-1 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                  mode === "register"
                    ? "bg-fg text-bg"
                    : "text-fg/70 hover:bg-fg/5 hover:text-fg"
                }`}
              >
                注册
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <TextField
                label="邮箱"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="密码"
                type="password"
                placeholder="至少 6 位"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {mode === "register" ? (
                <TextField
                  label="确认密码"
                  type="password"
                  placeholder="再次输入密码"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              ) : null}
              {error ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              <Button size="lg" disabled={loading} onClick={onSubmit}>
                {mode === "login" ? "登录" : "注册并登录"}
              </Button>
            </div>
          </>
        )}

        <div className="mt-6 text-xs text-muted">
          现在可先浏览商品与体验下单流程（Mock）。{" "}
          <Link to="/products" className="text-fg underline underline-offset-4">
            去逛商品
          </Link>
        </div>
      </div>
    </Container>
  );
}
