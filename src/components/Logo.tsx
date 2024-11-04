import React from 'react';

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 15c-11 0-20 9-20 20v10c0 11 9 20 20 20s20-9 20-20V35c0-11-9-20-20-20z"
        fill="#4B5563"
      />
      <path
        d="M35 40c0-8.3 6.7-15 15-15s15 6.7 15 15v5c0 8.3-6.7 15-15 15s-15-6.7-15-15v-5z"
        fill="#374151"
      />
      <path
        d="M42 38c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"
        fill="#60A5FA"
      />
      <path
        d="M45 65c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5zM65 65c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5z"
        fill="#4B5563"
      />
      <path
        d="M50 75c8.3 0 15-6.7 15-15H35c0 8.3 6.7 15 15 15z"
        fill="#374151"
      />
      <path
        d="M45 38c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"
        fill="#2563EB"
      />
    </svg>
  );
}