import React from 'react';

interface TecnideasLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  showText?: boolean;
  textClassName?: string;
}

export const TecnideasLogoIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Surrounding Rays */}
      {/* Top Center Ray */}
      <ellipse cx="50" cy="10" rx="3.5" ry="7" fill="#00AEEF" />
      {/* Top Left Ray */}
      <ellipse cx="27" cy="18" rx="3.5" ry="7" transform="rotate(-35 27 18)" fill="#00AEEF" />
      {/* Top Right Ray */}
      <ellipse cx="73" cy="18" rx="3.5" ry="7" transform="rotate(35 73 18)" fill="#00AEEF" />
      {/* Far Left Ray */}
      <ellipse cx="14" cy="38" rx="3.5" ry="7" transform="rotate(-65 14 38)" fill="#00AEEF" />
      {/* Far Right Ray */}
      <ellipse cx="86" cy="38" rx="3.5" ry="7" transform="rotate(65 86 38)" fill="#00AEEF" />
      {/* Bottom Left Ray */}
      <ellipse cx="18" cy="62" rx="3.5" ry="6" transform="rotate(-110 18 62)" fill="#00AEEF" />
      {/* Bottom Right Ray */}
      <ellipse cx="32" cy="78" rx="3" ry="5.5" transform="rotate(-135 32 78)" fill="#00AEEF" />

      {/* Main Bulb Contour */}
      <path
        d="M 50 22 C 34.5 22 22 34.5 22 50 C 22 60 28.5 68.5 35 74.5 C 37 76.5 38 79 38 82 L 62 82 C 62 79 63 76.5 65 74.5 C 71.5 68.5 78 60 78 50 C 78 34.5 65.5 22 50 22 Z"
        stroke="#00AEEF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Screw Base Diagonal Lines */}
      <line x1="40" y1="87" x2="60" y2="87" stroke="#00AEEF" strokeWidth="5" strokeLinecap="round" />
      <line x1="42" y1="93" x2="58" y2="93" stroke="#00AEEF" strokeWidth="5" strokeLinecap="round" />
      <line x1="45" y1="98" x2="55" y2="98" stroke="#00AEEF" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

export const TecnideasLogo: React.FC<TecnideasLogoProps> = ({
  className = "w-8 h-8",
  size = 'md',
  showText = false,
  textClassName = "text-xl font-black text-slate-900 dark:text-white"
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  const currentSizeClass = typeof size === 'number' ? '' : sizeClasses[size] || className;
  const style = typeof size === 'number' ? { width: size, height: size } : undefined;

  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      <div 
        className={`relative rounded-xl bg-slate-950 p-1.5 flex items-center justify-center border border-cyan-500/30 shadow-md shadow-cyan-500/10 ${currentSizeClass}`}
        style={style}
      >
        <TecnideasLogoIcon className="w-full h-full text-cyan-400" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${textClassName} tracking-tight leading-none`}>
            Tecnideas
          </span>
          <span className="text-[10px] font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase mt-0.5">
            HUB Digital
          </span>
        </div>
      )}
    </div>
  );
};
