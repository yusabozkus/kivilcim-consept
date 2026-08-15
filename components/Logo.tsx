import React from "react";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <svg
      className={`w-8 h-8 sm:w-9 sm:h-9 text-primary ${className || ""}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kıvılcım"
    >
      <rect x="2" y="2" width="44" height="44" rx="14" fill="currentColor" />
      <path
        d="M27.2 8.5 12.8 27.1h10.1L20.8 40l14.4-19.1H25.1l2.1-12.4Z"
        fill="white"
      />
      <circle cx="36.5" cy="10.5" r="3.5" fill="#B8A9FF" />
    </svg>
  );
};

export default Logo;
