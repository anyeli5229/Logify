import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-12" }: LogoProps) {
  return (
    <Link to="/" className="inline-block">
      <img
        src="/Logo.png"
        alt="Logotipo Logify"
        className={`w-auto object-contain hover:opacity-90 transition-opacity ${className}`}
      />
    </Link>
  )
}