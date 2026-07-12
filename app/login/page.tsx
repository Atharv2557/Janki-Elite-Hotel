import { Suspense } from "react";

import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808]">
      <div className="flex items-center gap-3 text-sm text-white/60">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#b9945a]" />
        Loading login page...
      </div>
    </main>
  );
}