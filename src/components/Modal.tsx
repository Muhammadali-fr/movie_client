"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    // Close on Escape + lock body scroll
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    // Basic focus management: focus modal container on open
    useEffect(() => {
        if (open) dialogRef.current?.focus();
    }, [open]);

    if (!open) return null;

    return (
        <div
            aria-hidden={!open}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/5"
        >
            {/* Overlay */}
            <button
                aria-label="Close modal"
                onClick={onClose}
                className="absolute inset-0 bg-black/10"
            />

            {/* Dialog */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title ?? "Modal"}
                tabIndex={-1}
                ref={dialogRef}
                className="relative z-10 w-75 rounded-4xl bg-white/93 p-5 outline-none"
            >
                {children}
            </div>
        </div>
    );
}
