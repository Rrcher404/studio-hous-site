/**
 * SVG filter powering the liquid-glass distortion used by `.glass.distort`
 * surfaces (dropdowns, the records player, the roaming lens). Rendered once
 * in the root layout. Browsers that can't take url() filters in
 * backdrop-filter (Safari) fall back to the plain blur declared before it.
 */
export function GlassDefs() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", overflow: "hidden" }}
    >
      <defs>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
