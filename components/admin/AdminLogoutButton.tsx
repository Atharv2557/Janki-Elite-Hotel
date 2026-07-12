"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function AdminLogoutButton() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      setLogoutError("");

      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        setLogoutError("Unable to logout. Please try again.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Admin logout error:", error);

      setLogoutError("Unable to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="
          flex w-full items-center justify-center gap-2
          rounded-xl
          border border-white/10
          bg-white/[0.04]
          px-4 py-3
          text-sm font-medium text-white/65
          transition-all duration-300
          hover:border-red-400/25
          hover:bg-red-400/[0.08]
          hover:text-red-300
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isLoggingOut ? (
          <>
            <LoaderCircle
              size={17}
              className="animate-spin"
            />
            Signing out...
          </>
        ) : (
          <>
            <LogOut size={17} />
            Logout
          </>
        )}
      </button>

      {logoutError && (
        <p
          role="alert"
          className="mt-2 text-center text-xs text-red-400"
        >
          {logoutError}
        </p>
      )}
    </div>
  );
} 