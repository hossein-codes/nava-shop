"use client";

/** صفحه ثبت‌نام */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/store/auth-context";
import { isValidEmail } from "@/lib/utils";
import { EyeIcon, UserIcon } from "@/components/Icons";

export default function RegisterPage() {
  const router = useRouter();
  const { register, user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) router.replace("/account");
  }, [user, router]);

  if (user) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 3) return setError("نام و نام خانوادگی را کامل وارد کنید.");
    if (!isValidEmail(email)) return setError("ایمیل معتبر وارد کنید.");
    if (password.length < 6) return setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
    if (password !== confirm) return setError("تکرار رمز عبور مطابقت ندارد.");

    const err = register(name, email, password);
    if (err) return setError(err);
    router.push("/account");
  };

  return (
    <div className="container-x flex justify-center py-14">
      <div className="w-full max-w-md rounded-3xl border border-sand/60 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-ivory">
            <UserIcon width={26} height={26} />
          </span>
          <h1 className="text-2xl font-semibold">ساخت حساب کاربری</h1>
          <p className="mt-2 text-sm text-ink-soft">
            در کمتر از یک دقیقه عضو نوا شوید.
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label-base">نام و نام خانوادگی</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً: علی محمدی"
              className="input-base"
            />
          </div>
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
                placeholder="حداقل ۶ کاراکتر"
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
          <div>
            <label className="label-base">تکرار رمز عبور</label>
            <input
              type={showPass ? "text" : "password"}
              dir="ltr"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="input-base text-start"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            ثبت‌نام
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-ink-soft">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="font-bold text-clay transition hover:text-clay-dark">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}
