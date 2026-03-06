import { useEffect, useMemo, useState } from "react";

import "./ui-clone.css";

type FormState = {
  email: string;
  password: string;
};

function useEphemeralMessage(durationMs: number) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const t = window.setTimeout(() => setMessage(null), durationMs);
    return () => window.clearTimeout(t);
  }, [durationMs, message]);

  return { message, setMessage };
}

export default function UiClone() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const { message, setMessage } = useEphemeralMessage(1800);

  const canSubmit = useMemo(() => {
    if (!form.email.trim()) return false;
    if (!form.password.trim()) return false;
    return true;
  }, [form.email, form.password]);

  return (
    <div className="ui-shell flex items-center justify-center px-6 py-12">
      <div className="ui-card relative grid w-full max-w-[980px] overflow-hidden rounded-[28px] bg-white/90">
        {message ? (
          <div className="pointer-events-none absolute right-6 top-6 z-20 rounded-[14px] px-4 py-3 text-[13px] font-medium text-white ui-toast">
            {message}
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr]">
          <section className="ui-left relative overflow-hidden px-10 py-12 text-white">
            <div className="ui-orb ui-orb--lg" />
            <div className="ui-orb ui-orb--sm" />
            <div className="ui-orb ui-orb--glow" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/12 ring-1 ring-white/18">
                <div className="h-[18px] w-[18px] rounded-[6px] bg-white/90" />
              </div>
              <div className="text-[14px] font-semibold tracking-wide">Cloudy</div>
            </div>

            <div className="relative z-10 mt-20 max-w-[280px]">
              <h1 className="text-[38px] font-semibold leading-[1.05] tracking-[-0.02em]">
                Welcome back
              </h1>
              <p className="mt-4 text-[14px] leading-6 text-white/75">
                Sign in to continue. Your next session is ready when you are.
              </p>
            </div>

            <div className="relative z-10 mt-auto pt-16">
              <div className="flex items-center gap-2 text-[12px] text-white/70">
                <span className="inline-flex h-[7px] w-[7px] rounded-full bg-white/65" />
                <span className="inline-flex h-[7px] w-[7px] rounded-full bg-white/35" />
                <span className="inline-flex h-[7px] w-[7px] rounded-full bg-white/25" />
              </div>
            </div>
          </section>

          <section className="relative px-10 py-12 md:px-14 md:py-14">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12px] font-medium tracking-[0.16em] text-slate-400">
                  SIGN IN
                </div>
                <h2 className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-slate-900">
                  Login to your account
                </h2>
              </div>
              <a
                className="mt-1 rounded-full px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMessage("Demo only");
                }}
              >
                Help
              </a>
            </div>

            <p className="mt-4 max-w-[420px] text-[14px] leading-6 text-slate-500">
              Enter your details below. This is a front-end only demo — no data is sent anywhere.
            </p>

            <form
              className="mt-9 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!canSubmit) {
                  setMessage("Please fill in email and password");
                  return;
                }
                setMessage("Signed in (mock)");
              }}
            >
              <label className="block">
                <div className="mb-2 text-[13px] font-medium text-slate-700">Email</div>
                <div className="ui-field flex items-center rounded-[14px] px-4 py-3">
                  <input
                    className="ui-input w-full bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400"
                    inputMode="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  />
                </div>
              </label>

              <label className="block">
                <div className="mb-2 text-[13px] font-medium text-slate-700">Password</div>
                <div className="ui-field flex items-center rounded-[14px] px-4 py-3">
                  <input
                    className="ui-input w-full bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400"
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                  />
                </div>
              </label>

              <div className="flex items-center justify-between pt-2">
                <label className="flex select-none items-center gap-2 text-[13px] text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                    defaultChecked
                  />
                  Remember me
                </label>
                <a
                  className="text-[13px] font-medium text-violet-700 hover:text-violet-900"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMessage("Password reset is not wired");
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <button
                className="ui-primary mt-2 w-full rounded-[14px] px-5 py-3.5 text-[14px] font-semibold tracking-[0.01em] text-white transition-transform"
                type="submit"
              >
                Sign in
              </button>

              <div className="pt-3 text-center text-[13px] text-slate-500">
                Don&apos;t have an account?{" "}
                <a
                  className="font-semibold text-slate-900 hover:text-violet-900"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMessage("Sign up is not wired");
                  }}
                >
                  Sign up
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

