interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export default function Spinner({ size = "md", label }: SpinnerProps) {
  // Mapeo de tamaños 
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-2">
      <div className="relative flex items-center justify-center">
        {/* Anillo de fondo difuminado */}
        <div
          className={`${sizeClasses[size]} border-purple-100 rounded-full`}
        />
        {/* Anillo giratorio */}
        <div
          className={`${sizeClasses[size]} border-transparent border-t-purple-600 border-r-indigo-600 rounded-full animate-spin absolute top-0 left-0`}
        />
      </div>

      {label && (
        <p className="text-xs font-semibold text-slate-500 tracking-wide animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}