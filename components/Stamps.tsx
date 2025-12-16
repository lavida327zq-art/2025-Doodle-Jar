import React from 'react';
import { StampType } from '../types';

interface StampProps {
  type: StampType;
  className?: string;
}

export const Stamp: React.FC<StampProps> = ({ type, className = "" }) => {
  const commonProps = {
    className,
    stroke: "currentColor",
    strokeWidth: "1.5",
    fill: "none",
    viewBox: "0 0 24 24"
  };

  switch (type) {
    case 'cat':
      return (
        <svg {...commonProps}>
          <path d="M12 5C10 5 9 7 9 7L7 5L5 9C5 9 6 12 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 12 19 9 19 9L17 5L15 7C15 7 14 5 12 5Z" />
          <path d="M9 14L8 15" strokeLinecap="round" />
          <path d="M15 14L16 15" strokeLinecap="round" />
          <circle cx="10.5" cy="13" r="0.5" fill="currentColor" />
          <circle cx="13.5" cy="13" r="0.5" fill="currentColor" />
          <path d="M11.5 16C11.5 16 12 16.5 12.5 16" strokeLinecap="round" />
        </svg>
      );
    case 'bear':
      return (
        <svg {...commonProps}>
          <path d="M7 6C7 6 5 4 4 6C3 8 5 9 5 9" strokeLinecap="round" />
          <path d="M17 6C17 6 19 4 20 6C21 8 19 9 19 9" strokeLinecap="round" />
          <circle cx="12" cy="13" r="8" />
          <circle cx="10" cy="11" r="1" fill="currentColor" />
          <circle cx="14" cy="11" r="1" fill="currentColor" />
          <ellipse cx="12" cy="15" rx="2.5" ry="1.5" />
          <circle cx="12" cy="14.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case 'star':
      return (
        <svg {...commonProps}>
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...commonProps}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          <path d="M18 6L19 5" strokeLinecap="round" />
          <path d="M6 6L5 5" strokeLinecap="round" />
        </svg>
      );
    case 'rabbit':
    default:
      return (
        <svg {...commonProps}>
           <circle cx="12" cy="15" r="5" />
           <path d="M9 11C9 11 7 5 9 3C11 1 11 5 11 8" strokeLinecap="round" />
           <path d="M15 11C15 11 17 5 15 3C13 1 13 5 13 8" strokeLinecap="round" />
           <circle cx="10.5" cy="14" r="0.5" fill="currentColor" />
           <circle cx="13.5" cy="14" r="0.5" fill="currentColor" />
           <path d="M11 16L12 17L13 16" strokeLinecap="round" />
        </svg>
      );
  }
};