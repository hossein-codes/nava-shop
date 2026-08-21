"use client";

/** صفحه ورود */
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/store/auth-context";
import { isValidEmail } from "@/lib/utils";
import { EyeIcon, UserIcon } from "@/components/Icons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  // اگر قبلاً وارد شده، برو به حساب
  useEffect(() => {
    if (user) router.replace("/account");
  }, [user, router]);

  if (user) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValidEmail(email)) return setError("ایمیل معتبر وارد کنید.");
    if (!password) return setError("رمز عبور را وارد کنید.");
    const ok = login(email, password);
    if (!ok) return setError("ایمیل یا رمز عبور اشتباه است.");
    const redirect = searchParams.get("redirect");
    router.push(redirect || "/account");
  };

  return (
    <div className="container-x flex justify-center py-14">
      <div className="w-full max-w-md rounded-3xl border border-sand/60 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-ivory">
            <UserIcon width={26} height={26} />
          </span>
          <h1 className="text-2xl font-semibold">ورود به حساب کاربری</h1>
          <p className="mt-2 text-sm text-ink-soft">
            خوش برگشتید! برای ادامه وارد شوید.
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label-base">ایمیل</label>
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-base text-start"
            />
          </div>
          <div>
            <label className="label-base">رمز عبور</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-base text-start pe-11"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                aria-label="نمایش رمز"
                className="absolute end-3 top-1/2 -translate-y-1/2 text-ink-soft"
              >
                <EyeIcon width={18} height={18} />
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            ورود
          </button>
        </form>

        <div className="mt-5 rounded-2xl bg-cream/70 p-4 text-xs leading-6 text-ink-soft">
          <p className="font-bold text-ink">💡 نکته برای تست نمونه‌کار:</p>
          ابتدا در صفحه‌ی «ثبت‌نام» یک حساب بسازید یا از دکمه‌ی زیر استفاده کنید.
        </div>

        <p className="mt-5 text-center text-sm text-ink-soft">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="font-bold text-clay transition hover:text-clay-dark">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
