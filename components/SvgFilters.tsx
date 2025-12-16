import React from 'react';

export const SvgFilters: React.FC = () => (
  <svg className="absolute w-0 h-0 pointer-events-none">
    <defs>
      <filter id="squiggle">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.02" 
          numOctaves="3" 
          result="noise" 
        />
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="noise" 
          scale="2" 
        />
      </filter>
      <filter id="pencil-texture">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.5" 
          numOctaves="4" 
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.5" />
        </feComponentTransfer>
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </defs>
  </svg>
);