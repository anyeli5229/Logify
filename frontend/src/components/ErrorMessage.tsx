import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
        <div className="flex items-center justify-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl shadow-sm text-sm font-semibold my-4 transition-all">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.8" 
                stroke="currentColor" 
                className="w-5 h-5 text-rose-600"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" 
                />
            </svg>

            <span className="text-center">{children}</span>
        </div>
    )
}