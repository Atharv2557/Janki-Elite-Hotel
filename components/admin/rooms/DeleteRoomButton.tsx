"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  LoaderCircle,
  Trash2,
  X,
} from "lucide-react";

import { deleteRoomAction } from "@/lib/actions/rooms";

type DeleteRoomButtonProps = {
  roomId: string;
  roomTitle: string;
};

export default function DeleteRoomButton({
  roomId,
  roomTitle,
}: DeleteRoomButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setErrorMessage("");

    startTransition(async () => {
      const result = await deleteRoomAction(roomId);

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setIsOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          inline-flex items-center justify-center gap-2
          rounded-xl
          border border-red-400/15
          px-4 py-2
          text-sm font-medium text-red-300/70
          transition
          hover:border-red-400/30
          hover:bg-red-400/[0.08]
          hover:text-red-300
        "
      >
        <Trash2 size={15} />
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/[0.08] text-red-300">
                <AlertTriangle size={22} />
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                aria-label="Close delete confirmation"
                className="text-white/30 transition hover:text-white disabled:opacity-40"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-white">
              Delete room?
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              You are about to permanently delete{" "}
              <span className="font-medium text-white/75">
                {roomTitle}
              </span>
              . This action cannot be undone.
            </p>

            {errorMessage && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm text-red-300"
              >
                {errorMessage}
              </p>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete room
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}