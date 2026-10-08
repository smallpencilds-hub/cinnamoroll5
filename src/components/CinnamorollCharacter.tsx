import React from 'react';
import { CharacterEmotion, BlushStyle } from '../types';

interface CinnamorollCharacterProps {
  hatId: string | null;
  clothesId: string | null;
  shoesId: string | null;
  accessoryId: string | null;
  emotion?: CharacterEmotion;
  blush?: BlushStyle;
  isPetting?: boolean;
  onPet?: (e: React.MouseEvent<SVGSVGElement>) => void;
  scale?: number;
  className?: string;
  id?: string;
}

export const CinnamorollCharacter: React.FC<CinnamorollCharacterProps> = ({
  hatId,
  clothesId,
  shoesId,
  accessoryId,
  emotion = 'happy',
  blush = 'classic',
  isPetting = false,
  onPet,
  scale = 1,
  className = '',
  id = 'cinnamoroll-svg',
}) => {
  return (
    <div
      className={`relative inline-block select-none transition-all duration-300 ${
        isPetting ? 'scale-105 -translate-y-2' : 'hover:scale-[1.02]'
      } ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      <svg
        id={id}
        viewBox="0 0 540 500"
        className="w-full max-w-[450px] h-auto drop-shadow-[0_22px_40px_rgba(186,215,248,0.5)] cursor-pointer"
        onClick={onPet}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cloud Fur Gradients */}
          <linearGradient id="furGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#F6FAFF" />
            <stop offset="100%" stopColor="#D8E8F8" />
          </linearGradient>

          <radialGradient id="headCloudGlow" cx="50%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFFFF" />
            <stop offset="88%" stopColor="#F2F7FD" />
            <stop offset="100%" stopColor="#D9E9F9" />
          </radialGradient>

          <radialGradient id="earVelvetShade" cx="50%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FCFDFF" />
            <stop offset="80%" stopColor="#EEF5FC" />
            <stop offset="100%" stopColor="#D3E5F8" />
          </radialGradient>

          {/* Deep Sparkling Sanrio Crystal Eyes */}
          <linearGradient id="crystalEyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="35%" stopColor="#134E7C" />
            <stop offset="70%" stopColor="#2E86C1" />
            <stop offset="90%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>

          {/* Golden Lux Gradient for accessories */}
          <linearGradient id="goldLuxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DB" />
            <stop offset="30%" stopColor="#F6E05E" />
            <stop offset="70%" stopColor="#ECC94B" />
            <stop offset="100%" stopColor="#D69E2E" />
          </linearGradient>

          {/* Soft Marshmallow Cheek Blush */}
          <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF7A93" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#FFA1B3" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#FFCCD5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Soft Drop Shadow Filter for layers */}
          <filter id="softShade" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#BEE3F8" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ========================================================= */}
        {/* 1. BACK ACCESSORIES (Angel Wings, etc.) */}
        {/* ========================================================= */}
        {accessoryId === 'angel_wings' && (
          <g id="acc-angel-wings" className="animate-pulse">
            {/* Left Wing with layered feathers */}
            <path
              d="M 180 240 C 120 170, 20 160, 5 220 C -5 260, 30 295, 80 300 C 120 305, 160 280, 185 258 Z"
              fill="#FFFFFF"
              stroke="#BEE3F8"
              strokeWidth="4.5"
            />
            <path d="M 35 210 C 65 235, 115 245, 150 240" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 50 238 C 80 260, 125 268, 160 255" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Right Wing with layered feathers */}
            <path
              d="M 360 240 C 420 170, 520 160, 535 220 C 545 260, 510 295, 460 300 C 420 305, 380 280, 355 258 Z"
              fill="#FFFFFF"
              stroke="#BEE3F8"
              strokeWidth="4.5"
            />
            <path d="M 505 210 C 475 235, 425 245, 390 240" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 490 238 C 460 260, 415 268, 380 255" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* ========================================================= */}
        {/* 2. CINNAMON ROLL CURLY TAIL (Iconic Pastry Swirl) */}
        {/* ========================================================= */}
        <g id="tail" transform="translate(350, 335)">
          {/* Ground shadow beneath tail */}
          <ellipse cx="28" cy="8" rx="22" ry="14" fill="#CBD5E0" opacity="0.4" />
          {/* Main 3D spiral pastry curl */}
          <path
            d="M 0 24 C 20 24, 46 18, 46 -6 C 46 -30, 12 -36, -6 -18 C -20 -3, -6 14, 12 12 C 20 10, 22 -1, 14 -5"
            fill="none"
            stroke="url(#furGradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 0 24 C 20 24, 46 18, 46 -6 C 46 -30, 12 -36, -6 -18 C -20 -3, -6 14, 12 12 C 20 10, 22 -1, 14 -5"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Sweet cream frosting highlight along the upper crest */}
          <path
            d="M 4 22 C 18 22, 42 16, 42 -5 C 42 -22, 18 -28, 4 -16"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>

        {/* ========================================================= */}
        {/* 3. FLOPPY EARS (Idle Soft Swaying Physics & Inner Velvet) */}
        {/* ========================================================= */}
        {/* Left Floppy Ear with breathing sway */}
        <g id="ear-left" className="origin-[170px_175px] animate-ear-l">
          {/* Ear Connection Shadow */}
          <path
            d="M 175 168 C 105 150, 18 185, 12 250 C 6 308, 52 332, 105 312 C 152 292, 182 222, 175 168 Z"
            fill="url(#earVelvetShade)"
            stroke="#CBD5E1"
            strokeWidth="4.8"
            strokeLinejoin="round"
          />
          {/* Inner Ear Soft Velvet Wash & Crease */}
          <path
            d="M 152 188 C 102 180, 42 208, 36 256 C 32 290, 68 308, 105 296 C 138 284, 160 230, 152 188 Z"
            fill="#F4F9FF"
            opacity="0.8"
          />
          {/* Ear fold contour highlight */}
          <path
            d="M 145 185 C 95 178, 38 205, 34 252"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Ear lower fluffy curve detail */}
          <path
            d="M 48 290 Q 75 305, 105 295"
            stroke="#E2EEFC"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Right Floppy Ear with complementary sway */}
        <g id="ear-right" className="origin-[370px_175px] animate-ear-r">
          <path
            d="M 365 168 C 435 150, 522 185, 528 250 C 534 308, 488 332, 435 312 C 388 292, 358 222, 365 168 Z"
            fill="url(#earVelvetShade)"
            stroke="#CBD5E1"
            strokeWidth="4.8"
            strokeLinejoin="round"
          />
          <path
            d="M 388 188 C 438 180, 498 208, 504 256 C 508 290, 472 308, 435 296 C 402 284, 380 230, 388 188 Z"
            fill="#F4F9FF"
            opacity="0.8"
          />
          <path
            d="M 395 185 C 445 178, 502 205, 506 252"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 492 290 Q 465 305, 435 295"
            stroke="#E2EEFC"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ========================================================= */}
        {/* 4. PLUMP BODY & CHUBBY STUBBY FEET */}
        {/* ========================================================= */}
        <g id="body-base">
          {/* Ambient Floor Shadow under body */}
          <ellipse cx="270" cy="408" rx="82" ry="16" fill="#CBD5E0" opacity="0.35" />

          {/* Main Pear-Shaped Torso with gentle fur glow */}
          <path
            d="M 205 235 C 192 268, 188 348, 210 392 C 234 406, 306 406, 330 392 C 352 348, 348 268, 335 235 Z"
            fill="url(#furGradient)"
            stroke="#CBD5E1"
            strokeWidth="4.8"
          />

          {/* Marshmallow Belly Highlight */}
          <ellipse cx="270" cy="328" rx="48" ry="44" fill="#FFFFFF" opacity="0.65" />

          {/* Stubby Left Leg */}
          <path
            d="M 220 382 C 220 414, 250 414, 254 388 Z"
            fill="url(#furGradient)"
            stroke="#CBD5E1"
            strokeWidth="4.2"
          />
          {/* Stubby Right Leg */}
          <path
            d="M 286 388 C 290 414, 320 414, 320 382 Z"
            fill="url(#furGradient)"
            stroke="#CBD5E1"
            strokeWidth="4.2"
          />

          {/* Soft Marshmallow Toe-Beans / Paw Pads on Feet (when bare) */}
          {!shoesId && (
            <g id="feet-toe-beans">
              {/* Left foot pads */}
              <ellipse cx="236" cy="402" rx="6" ry="4" fill="#FED7E2" stroke="#FBB6CE" strokeWidth="0.8" />
              <circle cx="228" cy="397" r="1.8" fill="#FED7E2" />
              <circle cx="236" cy="395" r="1.8" fill="#FED7E2" />
              <circle cx="244" cy="397" r="1.8" fill="#FED7E2" />

              {/* Right foot pads */}
              <ellipse cx="304" cy="402" rx="6" ry="4" fill="#FED7E2" stroke="#FBB6CE" strokeWidth="0.8" />
              <circle cx="296" cy="397" r="1.8" fill="#FED7E2" />
              <circle cx="304" cy="395" r="1.8" fill="#FED7E2" />
              <circle cx="312" cy="397" r="1.8" fill="#FED7E2" />
            </g>
          )}
        </g>

        {/* ========================================================= */}
        {/* 5. CLOTHES LAYER */}
        {/* ========================================================= */}
        {clothesId === 'sweater_cinnamon' && (
          <g id="clothes-sweater">
            <path
              d="M 200 248 C 188 285, 192 360, 210 386 C 232 395, 308 395, 330 386 C 348 360, 352 285, 340 248 Z"
              fill="#FFF8ED"
              stroke="#D69E2E"
              strokeWidth="4.2"
            />
            {/* Cable-knit ribbed stitch texture */}
            <path d="M 235 268 L 235 382" stroke="#F6AD55" strokeWidth="2.8" strokeDasharray="5,4" fill="none" />
            <path d="M 305 268 L 305 382" stroke="#F6AD55" strokeWidth="2.8" strokeDasharray="5,4" fill="none" />
            <ellipse cx="270" cy="248" rx="58" ry="15" fill="#FEEBC8" stroke="#D69E2E" strokeWidth="3.8" />
            <path d="M 238 248 Q 270 255, 302 248" stroke="#DD6B20" strokeWidth="2.8" fill="none" />
            <path d="M 214 382 Q 270 394, 326 382" stroke="#DD6B20" strokeWidth="4.5" fill="none" />

            {/* Embroidered Cinnamon Roll Motif */}
            <g transform="translate(270, 318) scale(0.75)">
              <circle cx="0" cy="0" r="24" fill="#DD6B20" stroke="#9C4221" strokeWidth="3.5" />
              <path
                d="M -14 3 C -14 -14, 14 -14, 14 1 C 14 10, -5 10, -5 1 C -5 -4, 4 -4, 4 1"
                stroke="#FFF"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="0" cy="0" r="3" fill="#FFF" />
            </g>
          </g>
        )}

        {clothesId === 'dungarees_spring' && (
          <g id="clothes-dungarees">
            <path
              d="M 202 248 C 188 285, 192 328, 200 338 C 224 344, 316 344, 340 338 C 348 328, 352 285, 338 248 Z"
              fill="#FFFFFF"
              stroke="#CBD5E0"
              strokeWidth="3.8"
            />
            <path
              d="M 206 295 C 196 338, 194 380, 212 392 C 232 400, 308 400, 328 392 C 346 380, 344 338, 334 295 Z"
              fill="#90CDF4"
              stroke="#2B6CB0"
              strokeWidth="4.2"
            />
            <path d="M 270 305 L 270 392" stroke="#FAF089" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 232 248 L 232 302" stroke="#2B6CB0" strokeWidth="9.5" strokeLinecap="round" />
            <path d="M 308 248 L 308 302" stroke="#2B6CB0" strokeWidth="9.5" strokeLinecap="round" />
            <g transform="translate(232, 296)">
              <circle cx="0" cy="0" r="6.5" fill="#FAF089" stroke="#B7791F" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
            </g>
            <g transform="translate(308, 296)">
              <circle cx="0" cy="0" r="6.5" fill="#FAF089" stroke="#B7791F" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
            </g>
            <path
              d="M 252 316 L 288 316 C 288 340, 252 340, 252 316 Z"
              fill="#63B3ED"
              stroke="#2B6CB0"
              strokeWidth="2.8"
            />
            <path d="M 270 324 C 267 320, 263 323, 270 332 C 277 323, 273 320, 270 324 Z" fill="#FED7E2" />
          </g>
        )}

        {clothesId === 'strawberry_dress' && (
          <g id="clothes-strawberry">
            <path
              d="M 204 248 C 190 285, 168 348, 180 392 C 214 404, 326 404, 360 392 C 372 348, 350 285, 336 248 Z"
              fill="#FED7E2"
              stroke="#E53E3E"
              strokeWidth="4.2"
            />
            <path d="M 188 355 Q 270 372, 352 355" stroke="#FBB6CE" strokeWidth="3.2" fill="none" />
            <path
              d="M 230 265 C 230 365, 310 365, 310 265 Z"
              fill="#FFFFFF"
              stroke="#F687B3"
              strokeWidth="3.2"
            />
            <g transform="translate(270, 326) scale(0.75)">
              <path d="M 0 16 C 14 16, 17 -6, 0 -12 C -17 -6, -14 16, 0 16 Z" fill="#E53E3E" />
              <path d="M -9 -10 C -5 -18, 5 -18, 9 -10 C 3 -8, -3 -8, -9 -10 Z" fill="#48BB78" />
              <circle cx="-4" cy="2" r="1.3" fill="#FEFCBF" />
              <circle cx="4" cy="2" r="1.3" fill="#FEFCBF" />
              <circle cx="0" cy="8" r="1.3" fill="#FEFCBF" />
            </g>
            <path
              d="M 186 392 Q 206 402, 226 392 Q 248 402, 270 392 Q 292 402, 314 392 Q 334 402, 354 392"
              fill="none"
              stroke="#FFF"
              strokeWidth="7.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {clothesId === 'sailor_suit' && (
          <g id="clothes-sailor">
            <path
              d="M 202 248 C 188 285, 192 360, 210 386 C 232 395, 308 395, 330 386 C 348 360, 352 285, 338 248 Z"
              fill="#FFFFFF"
              stroke="#2B6CB0"
              strokeWidth="4.2"
            />
            <path
              d="M 208 248 L 226 302 L 270 268 L 314 302 L 332 248 Z"
              fill="#2B6CB0"
              stroke="#1A365D"
              strokeWidth="3.8"
            />
            <path d="M 218 258 L 232 295 L 270 272 L 308 295 L 322 258" stroke="#FFFFFF" strokeWidth="2.8" fill="none" />
            <polygon points="270,268 260,308 270,318 280,308" fill="#E53E3E" stroke="#9B2C2C" strokeWidth="2.2" />
            <circle cx="270" cy="276" r="5" fill="url(#goldLuxGrad)" stroke="#B7791F" strokeWidth="1.8" />
          </g>
        )}

        {clothesId === 'fairy_kimono' && (
          <g id="clothes-kimono">
            <path
              d="M 198 248 C 180 295, 176 362, 204 394 C 232 402, 308 402, 336 394 C 364 362, 360 295, 342 248 Z"
              fill="#E9D8FD"
              stroke="#805AD5"
              strokeWidth="4.2"
            />
            <path d="M 244 248 L 270 295 L 296 248" stroke="#805AD5" strokeWidth="3.2" fill="none" />
            <rect x="210" y="295" width="120" height="44" rx="7" fill="#F687B3" stroke="#D53F8C" strokeWidth="3.8" />
            <line x1="210" y1="317" x2="330" y2="317" stroke="#FAF089" strokeWidth="2.8" />
            <g transform="translate(270, 317)">
              <circle cx="0" cy="0" r="11" fill="#FFF5F7" stroke="#ED64A6" strokeWidth="2.2" />
              <circle cx="0" cy="0" r="4" fill="#F687B3" />
            </g>
          </g>
        )}

        {clothesId === 'star_pajamas' && (
          <g id="clothes-pajamas">
            <path
              d="M 202 248 C 188 285, 192 362, 210 388 C 232 396, 308 396, 330 388 C 348 362, 352 285, 338 248 Z"
              fill="#FEFCBF"
              stroke="#D69E2E"
              strokeWidth="4.2"
            />
            <text x="228" y="292" fontSize="16" fill="#4299E1">⭐</text>
            <text x="292" y="302" fontSize="15" fill="#4299E1">⭐</text>
            <text x="250" y="350" fontSize="16" fill="#4299E1">⭐</text>
            <text x="302" y="366" fontSize="15" fill="#4299E1">⭐</text>
            <path d="M 240 324 Q 250 314, 260 324 Q 270 314, 280 324 L 280 344 L 240 344 Z" fill="#FFF" stroke="#CBD5E0" strokeWidth="2.2" />
          </g>
        )}

        {clothesId === 'royal_cape' && (
          <g id="clothes-cape">
            <path
              d="M 194 248 C 174 295, 164 372, 202 394 C 238 402, 302 402, 338 394 C 376 372, 366 295, 346 248 Z"
              fill="#E53E3E"
              stroke="#9B2C2C"
              strokeWidth="4.8"
            />
            <ellipse cx="270" cy="248" rx="72" ry="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="4.5" />
            <circle cx="242" cy="248" r="3.2" fill="#1A202C" />
            <circle cx="270" cy="252" r="3.2" fill="#1A202C" />
            <circle cx="298" cy="248" r="3.2" fill="#1A202C" />
            <path d="M 248 258 Q 270 268, 292 258" stroke="url(#goldLuxGrad)" strokeWidth="3.5" fill="none" />
            <circle cx="270" cy="266" r="9" fill="url(#goldLuxGrad)" stroke="#B7791F" strokeWidth="2.2" />
            <circle cx="270" cy="266" r="4.5" fill="#E53E3E" />
          </g>
        )}

        {/* ========================================================= */}
        {/* 6. SHOES & SOCKS LAYER */}
        {/* ========================================================= */}
        {shoesId === 'pink_shoes' && (
          <g id="shoes-pink">
            <ellipse cx="236" cy="398" rx="22" ry="13" fill="#FBB6CE" stroke="#D53F8C" strokeWidth="3.2" />
            <ellipse cx="236" cy="392" rx="15" ry="4.5" fill="#FFF" />
            <circle cx="236" cy="394" r="3.5" fill="#D53F8C" />
            <ellipse cx="304" cy="398" rx="22" ry="13" fill="#FBB6CE" stroke="#D53F8C" strokeWidth="3.2" />
            <ellipse cx="304" cy="392" rx="15" ry="4.5" fill="#FFF" />
            <circle cx="304" cy="394" r="3.5" fill="#D53F8C" />
          </g>
        )}

        {shoesId === 'blue_sneakers' && (
          <g id="shoes-sneakers">
            <ellipse cx="234" cy="398" rx="24" ry="14" fill="#63B3ED" stroke="#2B6CB0" strokeWidth="3.8" />
            <ellipse cx="234" cy="404" rx="22" ry="5.5" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2.2" />
            <ellipse cx="306" cy="398" rx="24" ry="14" fill="#63B3ED" stroke="#2B6CB0" strokeWidth="3.8" />
            <ellipse cx="306" cy="404" rx="22" ry="5.5" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2.2" />
          </g>
        )}

        {shoesId === 'bunny_slippers' && (
          <g id="shoes-bunny">
            <ellipse cx="234" cy="398" rx="24" ry="15" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3.8" />
            <ellipse cx="225" cy="385" rx="5" ry="11" fill="#FED7E2" stroke="#CBD5E1" strokeWidth="2.2" />
            <ellipse cx="243" cy="385" rx="5" ry="11" fill="#FED7E2" stroke="#CBD5E1" strokeWidth="2.2" />
            <circle cx="234" cy="400" r="3" fill="#F687B3" />

            <ellipse cx="306" cy="398" rx="24" ry="15" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3.8" />
            <ellipse cx="297" cy="385" rx="5" ry="11" fill="#FED7E2" stroke="#CBD5E1" strokeWidth="2.2" />
            <ellipse cx="315" cy="385" rx="5" ry="11" fill="#FED7E2" stroke="#CBD5E1" strokeWidth="2.2" />
            <circle cx="306" cy="400" r="3" fill="#F687B3" />
          </g>
        )}

        {shoesId === 'yellow_rainboots' && (
          <g id="shoes-rainboots">
            <path d="M 218 376 L 252 376 L 254 406 L 214 406 Z" fill="#ECC94B" stroke="#D69E2E" strokeWidth="3.8" />
            <ellipse cx="234" cy="404" rx="20" ry="4.5" fill="#D69E2E" />
            <path d="M 288 376 L 322 376 L 326 406 L 286 406 Z" fill="#ECC94B" stroke="#D69E2E" strokeWidth="3.8" />
            <ellipse cx="306" cy="404" rx="20" ry="4.5" fill="#D69E2E" />
          </g>
        )}

        {shoesId === 'crystal_slippers' && (
          <g id="shoes-crystal">
            <ellipse cx="236" cy="398" rx="23" ry="13" fill="#EBF8FF" stroke="#90CDF4" strokeWidth="3.2" opacity="0.95" />
            <ellipse cx="304" cy="398" rx="23" ry="13" fill="#EBF8FF" stroke="#90CDF4" strokeWidth="3.2" opacity="0.95" />
            <polygon points="236,390 238,394 243,394 239,397 241,402 236,399 232,402 234,397 230,394 234,394" fill="#FAF089" />
            <polygon points="304,390 306,394 311,394 307,397 309,402 304,399 300,402 302,397 298,394 302,394" fill="#FAF089" />
          </g>
        )}

        {/* ========================================================= */}
        {/* 7. CINNAMOROLL'S HEAD, SNOUT, EYES & ANIME EXPRESSIONS */}
        {/* ========================================================= */}
        <g id="head" className="animate-breath">
          {/* Subtle Neck Fluff Tuft / Collar Shadow */}
          <path d="M 220 248 Q 270 262, 320 248" stroke="#D8E8F8" strokeWidth="5" fill="none" opacity="0.7" />

          {/* Chubby Head Contour with Cute Cheek Tufts */}
          <path
            d="M 140 185 
               C 134 140, 155 102, 195 84 
               C 225 70, 270 68, 305 76 
               C 345 85, 385 115, 398 155 
               C 406 182, 402 215, 388 238 
               C 375 258, 350 268, 325 272 
               C 285 278, 255 278, 215 272 
               C 188 268, 164 256, 150 236 
               C 138 218, 138 198, 140 185 Z"
            fill="url(#headCloudGlow)"
            stroke="#CBD5E1"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Top Cloud Fur Curl (Iconic Marshmallow Tuft) */}
          <path
            d="M 258 76 C 263 65, 277 65, 282 76 C 288 71, 298 75, 294 83 C 290 87, 270 87, 258 76 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Cheerful Blush / Dynamic Cheek Styles */}
          {blush === 'classic' && (
            <g id="blush-classic">
              <ellipse cx="195" cy="202" rx="26" ry="16" fill="url(#cheekBlush)" />
              <ellipse cx="345" cy="202" rx="26" ry="16" fill="url(#cheekBlush)" />
            </g>
          )}

          {blush === 'hearts' && (
            <g id="blush-hearts">
              <ellipse cx="195" cy="202" rx="26" ry="16" fill="url(#cheekBlush)" />
              <ellipse cx="345" cy="202" rx="26" ry="16" fill="url(#cheekBlush)" />
              <path d="M 195 196 C 192 191, 187 195, 195 204 C 203 195, 198 191, 195 196 Z" fill="#F687B3" />
              <path d="M 345 196 C 342 191, 337 195, 345 204 C 353 195, 348 191, 345 196 Z" fill="#F687B3" />
            </g>
          )}

          {blush === 'stars' && (
            <g id="blush-stars">
              <ellipse cx="195" cy="202" rx="26" ry="16" fill="url(#cheekBlush)" />
              <ellipse cx="345" cy="202" rx="26" ry="16" fill="url(#cheekBlush)" />
              <text x="187" y="206" fontSize="14" fill="#ECC94B">✨</text>
              <text x="337" y="206" fontSize="14" fill="#ECC94B">✨</text>
            </g>
          )}

          {blush === 'sakura' && (
            <g id="blush-sakura">
              <ellipse cx="195" cy="202" rx="26" ry="16" fill="url(#cheekBlush)" />
              <ellipse cx="345" cy="202" rx="26" ry="16" fill="url(#cheekBlush)" />
              <text x="187" y="206" fontSize="14" fill="#ED64A6">🌸</text>
              <text x="337" y="206" fontSize="14" fill="#ED64A6">🌸</text>
            </g>
          )}

          {blush === 'sparkles' && (
            <g id="blush-sparkles">
              <ellipse cx="195" cy="202" rx="28" ry="18" fill="url(#cheekBlush)" />
              <ellipse cx="345" cy="202" rx="28" ry="18" fill="url(#cheekBlush)" />
              <circle cx="188" cy="200" r="2.2" fill="#FFF" />
              <circle cx="200" cy="204" r="1.6" fill="#FFF" />
              <circle cx="338" cy="200" r="2.2" fill="#FFF" />
              <circle cx="350" cy="204" r="1.6" fill="#FFF" />
            </g>
          )}

          {/* ========================================================= */}
          {/* Crystalline Anime Eyes (with natural idle blink animation) */}
          {/* ========================================================= */}
          {emotion === 'happy' && (
            <g id="eyes-happy" className="animate-blink">
              {/* Eyelid crease folds */}
              <path d="M 206 150 Q 216 145, 226 150" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M 314 150 Q 324 145, 334 150" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Left Eye */}
              <g transform="translate(216, 172)">
                <ellipse cx="0" cy="0" rx="12.5" ry="18.5" fill="url(#crystalEyeGrad)" stroke="#0B2545" strokeWidth="1.8" />
                {/* Upper shadow */}
                <ellipse cx="0" cy="-6" rx="11" ry="8" fill="#0B2545" opacity="0.45" />
                {/* Bright aqua inner moon crescent */}
                <path d="M -10 6 C -6 14, 6 14, 10 6 C 6 12, -6 12, -10 6 Z" fill="#BAE6FD" />
                {/* Primary round white shine highlight */}
                <circle cx="-4.5" cy="-7" r="5.5" fill="#FFFFFF" />
                {/* Secondary small white specular reflection */}
                <ellipse cx="4.5" cy="6" rx="2.8" ry="3.8" fill="#FFFFFF" opacity="0.9" />
                {/* Tiny star glint */}
                <circle cx="1" cy="-1" r="1.5" fill="#BAE6FD" />
                {/* Upper Eyelash line with delicate flick */}
                <path d="M -13 -14 Q 0 -22, 13 -14" stroke="#0B2545" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              </g>

              {/* Right Eye */}
              <g transform="translate(324, 172)">
                <ellipse cx="0" cy="0" rx="12.5" ry="18.5" fill="url(#crystalEyeGrad)" stroke="#0B2545" strokeWidth="1.8" />
                <ellipse cx="0" cy="-6" rx="11" ry="8" fill="#0B2545" opacity="0.45" />
                <path d="M -10 6 C -6 14, 6 14, 10 6 C 6 12, -6 12, -10 6 Z" fill="#BAE6FD" />
                <circle cx="-4.5" cy="-7" r="5.5" fill="#FFFFFF" />
                <ellipse cx="4.5" cy="6" rx="2.8" ry="3.8" fill="#FFFFFF" opacity="0.9" />
                <circle cx="1" cy="-1" r="1.5" fill="#BAE6FD" />
                <path d="M -13 -14 Q 0 -22, 13 -14" stroke="#0B2545" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              </g>
            </g>
          )}

          {emotion === 'winking' && (
            <g id="eyes-winking">
              {/* Left Eye: Big cute closed wink arc */}
              <path
                d="M 204 175 Q 216 154, 228 175"
                stroke="#0B2545"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
              />
              <polygon points="192,158 195,164 202,164 196,168 198,174 192,170 186,174 188,168 183,164 189,164" fill="#ECC94B" />

              {/* Right Eye: Wide open sparkling */}
              <g transform="translate(324, 172)" className="animate-blink">
                <ellipse cx="0" cy="0" rx="12.5" ry="18.5" fill="url(#crystalEyeGrad)" stroke="#0B2545" strokeWidth="1.8" />
                <ellipse cx="0" cy="-6" rx="11" ry="8" fill="#0B2545" opacity="0.45" />
                <path d="M -10 6 C -6 14, 6 14, 10 6 C 6 12, -6 12, -10 6 Z" fill="#BAE6FD" />
                <circle cx="-4.5" cy="-7" r="5.5" fill="#FFFFFF" />
                <ellipse cx="4.5" cy="6" rx="2.8" ry="3.8" fill="#FFFFFF" />
                <path d="M -13 -14 Q 0 -22, 13 -14" stroke="#0B2545" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              </g>
            </g>
          )}

          {emotion === 'sparkling' && (
            <g id="eyes-sparkling">
              <g transform="translate(216, 172)">
                <ellipse cx="0" cy="0" rx="13.5" ry="19.5" fill="url(#crystalEyeGrad)" />
                <text x="0" y="8" fontSize="20" fill="#FAF089" textAnchor="middle">✨</text>
                <circle cx="-5" cy="-8" r="4.5" fill="#FFF" />
              </g>
              <g transform="translate(324, 172)">
                <ellipse cx="0" cy="0" rx="13.5" ry="19.5" fill="url(#crystalEyeGrad)" />
                <text x="0" y="8" fontSize="20" fill="#FAF089" textAnchor="middle">✨</text>
                <circle cx="-5" cy="-8" r="4.5" fill="#FFF" />
              </g>
            </g>
          )}

          {emotion === 'sleepy' && (
            <g id="eyes-sleepy">
              <path d="M 204 175 Q 216 188, 228 175" stroke="#134E7C" strokeWidth="4.8" strokeLinecap="round" fill="none" />
              <path d="M 312 175 Q 324 188, 336 175" stroke="#134E7C" strokeWidth="4.8" strokeLinecap="round" fill="none" />
              <text x="350" y="150" fontSize="16" fill="#63B3ED" fontWeight="bold">z</text>
              <text x="364" y="136" fontSize="22" fill="#3182CE" fontWeight="bold">Z</text>
            </g>
          )}

          {emotion === 'eating' && (
            <g id="eyes-eating">
              <path d="M 204 172 Q 216 158, 228 172" stroke="#0B2545" strokeWidth="5.2" strokeLinecap="round" fill="none" />
              <path d="M 312 172 Q 324 158, 336 172" stroke="#0B2545" strokeWidth="5.2" strokeLinecap="round" fill="none" />
              {/* Sweet cinnamon crumb */}
              <circle cx="284" cy="204" r="2.8" fill="#D69E2E" />
              <circle cx="288" cy="208" r="1.6" fill="#D69E2E" />
            </g>
          )}

          {emotion === 'love' && (
            <g id="eyes-love">
              <path d="M 216 162 C 210 152, 198 162, 216 180 C 234 162, 222 152, 216 162 Z" fill="#E53E3E" stroke="#9B2C2C" strokeWidth="2" />
              <path d="M 324 162 C 318 152, 306 162, 324 180 C 342 162, 330 152, 324 162 Z" fill="#E53E3E" stroke="#9B2C2C" strokeWidth="2" />
              <circle cx="212" cy="164" r="2.5" fill="#FFF" />
              <circle cx="320" cy="164" r="2.5" fill="#FFF" />
            </g>
          )}

          {emotion === 'shy' && (
            <g id="eyes-shy">
              <g transform="translate(216, 174)">
                <ellipse cx="0" cy="0" rx="11" ry="16" fill="url(#crystalEyeGrad)" />
                <circle cx="-3" cy="-4" r="4" fill="#FFF" />
              </g>
              <g transform="translate(324, 174)">
                <ellipse cx="0" cy="0" rx="11" ry="16" fill="url(#crystalEyeGrad)" />
                <circle cx="-3" cy="-4" r="4" fill="#FFF" />
              </g>
              <line x1="184" y1="195" x2="194" y2="208" stroke="#E53E3E" strokeWidth="1.8" />
              <line x1="192" y1="195" x2="202" y2="208" stroke="#E53E3E" strokeWidth="1.8" />
              <line x1="338" y1="195" x2="348" y2="208" stroke="#E53E3E" strokeWidth="1.8" />
              <line x1="346" y1="195" x2="356" y2="208" stroke="#E53E3E" strokeWidth="1.8" />
            </g>
          )}

          {/* Tiny Cute Puppy Nose with Glossy Specular Dot */}
          <ellipse cx="270" cy="186" rx="3.5" ry="2.5" fill="#0F172A" />
          <circle cx="269" cy="185" r="1.1" fill="#93C5FD" />

          {/* Puppy Philtrum line */}
          <line x1="270" y1="188" x2="270" y2="194" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />

          {/* Iconic Inverted 'ω' Puppy Mouth with Tongue when Eating/Happy */}
          <g id="mouth">
            {emotion === 'eating' ? (
              <g>
                <path
                  d="M 260 196 Q 270 214, 280 196 Z"
                  fill="#F43F5E"
                  stroke="#0F172A"
                  strokeWidth="2.8"
                />
                <ellipse cx="270" cy="206" rx="5" ry="3.5" fill="#FDA4AF" />
              </g>
            ) : emotion === 'love' ? (
              <g>
                <path
                  d="M 258 195 Q 270 215, 282 195 Z"
                  fill="#FED7E2"
                  stroke="#0F172A"
                  strokeWidth="3"
                />
                <ellipse cx="270" cy="207" rx="6" ry="4" fill="#F43F5E" />
              </g>
            ) : (
              <path
                d="M 257 194 Q 263 203, 270 196 Q 277 203, 283 194"
                stroke="#0F172A"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>
        </g>

        {/* ========================================================= */}
        {/* 8. CHUBBY PAWS (with delicate soft pink paw pads) */}
        {/* ========================================================= */}
        <g id="arms">
          {/* Left Stubby Paw */}
          <ellipse cx="196" cy="282" rx="20" ry="14" fill="url(#headCloudGlow)" stroke="#CBD5E1" strokeWidth="4.5" />
          {/* Paw Beans on front paw */}
          <ellipse cx="196" cy="286" rx="5.5" ry="3.5" fill="#FED7E2" />
          <circle cx="190" cy="281" r="1.6" fill="#FED7E2" />
          <circle cx="196" cy="279" r="1.6" fill="#FED7E2" />
          <circle cx="202" cy="281" r="1.6" fill="#FED7E2" />

          {/* Right Stubby Paw */}
          <ellipse cx="344" cy="282" rx="20" ry="14" fill="url(#headCloudGlow)" stroke="#CBD5E1" strokeWidth="4.5" />
          <ellipse cx="344" cy="286" rx="5.5" ry="3.5" fill="#FED7E2" />
          <circle cx="338" cy="281" r="1.6" fill="#FED7E2" />
          <circle cx="344" cy="279" r="1.6" fill="#FED7E2" />
          <circle cx="350" cy="281" r="1.6" fill="#FED7E2" />
        </g>

        {/* ========================================================= */}
        {/* 9. HEADWEAR & HATS LAYER */}
        {/* ========================================================= */}
        {hatId === 'sky_ribbon' && (
          <g id="hat-sky-ribbon" transform="translate(172, 142) scale(1.1)">
            <ellipse cx="-18" cy="0" rx="18" ry="12" fill="#90CDF4" stroke="#2B6CB0" strokeWidth="3.2" />
            <ellipse cx="18" cy="0" rx="18" ry="12" fill="#90CDF4" stroke="#2B6CB0" strokeWidth="3.2" />
            <path d="M -12 6 L -25 34 L -6 24 Z" fill="#63B3ED" stroke="#2B6CB0" strokeWidth="2.8" />
            <path d="M 12 6 L 25 34 L 6 24 Z" fill="#63B3ED" stroke="#2B6CB0" strokeWidth="2.8" />
            <circle cx="0" cy="0" r="8.5" fill="#FFFFFF" stroke="#2B6CB0" strokeWidth="2.8" />
            <circle cx="0" cy="0" r="4.5" fill="#EBF8FF" />
          </g>
        )}

        {hatId === 'flower_crown' && (
          <g id="hat-flower-crown" transform="translate(270, 88)">
            <path d="M -90 30 Q 0 -8, 90 30" stroke="#48BB78" strokeWidth="4.8" fill="none" />
            <g transform="translate(-58, 20)">
              <circle cx="0" cy="0" r="12" fill="#FED7E2" stroke="#F687B3" strokeWidth="2.2" />
              <circle cx="0" cy="0" r="5" fill="#FAF089" />
            </g>
            <g transform="translate(-22, 6)">
              <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.2" />
              <circle cx="0" cy="0" r="5.5" fill="#FAF089" />
            </g>
            <g transform="translate(16, 5)">
              <circle cx="0" cy="0" r="14" fill="#FED7E2" stroke="#F687B3" strokeWidth="2.2" />
              <circle cx="0" cy="0" r="5.5" fill="#FAF089" />
            </g>
            <g transform="translate(56, 18)">
              <circle cx="0" cy="0" r="12" fill="#BEE3F8" stroke="#63B3ED" strokeWidth="2.2" />
              <circle cx="0" cy="0" r="5" fill="#FAF089" />
            </g>
          </g>
        )}

        {hatId === 'chef_hat' && (
          <g id="hat-chef" transform="translate(270, 60)">
            <path
              d="M -46 25 C -75 14, -75 -28, -40 -42 C -36 -65, 36 -65, 40 -42 C 75 -28, 75 14, 46 25 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="4.8"
            />
            <rect x="-48" y="18" width="96" height="18" rx="3.5" fill="#EDF2F7" stroke="#CBD5E1" strokeWidth="3.2" />
            <ellipse cx="0" cy="27" rx="9" ry="5" fill="#ED8936" />
          </g>
        )}

        {hatId === 'gold_crown' && (
          <g id="hat-crown" transform="translate(270, 68)">
            <polygon
              points="-44,18 -48,-22 -22,-7 0,-30 22,-7 48,-22 44,18"
              fill="url(#goldLuxGrad)"
              stroke="#B7791F"
              strokeWidth="4"
            />
            <rect x="-44" y="16" width="88" height="10" rx="2" fill="#D69E2E" />
            <path d="M 0 6 C -8 -4, -12 3, 0 13 C 12 3, 8 -4, 0 6 Z" fill="#E53E3E" stroke="#9B2C2C" strokeWidth="1.8" />
            <circle cx="-48" cy="-22" r="3.8" fill="#FFFFFF" />
            <circle cx="0" cy="-30" r="4.8" fill="#FFFFFF" />
            <circle cx="48" cy="-22" r="3.8" fill="#FFFFFF" />
          </g>
        )}

        {hatId === 'beret_artist' && (
          <g id="hat-beret" transform="translate(254, 70) rotate(-10)">
            <ellipse cx="0" cy="0" rx="64" ry="26" fill="#D6BCFA" stroke="#805AD5" strokeWidth="4.8" />
            <path d="M 0 -26 L 0 -35" stroke="#805AD5" strokeWidth="4.8" strokeLinecap="round" />
            <ellipse cx="38" cy="7" rx="12" ry="9" fill="#FEEBC8" stroke="#D69E2E" strokeWidth="2" />
            <circle cx="33" cy="6" r="2" fill="#E53E3E" />
            <circle cx="38" cy="4" r="2" fill="#3182CE" />
            <circle cx="43" cy="6" r="2" fill="#48BB78" />
          </g>
        )}

        {hatId === 'bunny_hood' && (
          <g id="hat-bunny-hood" transform="translate(270, 78)">
            <path d="M -60 18 Q 0 -7, 60 18" stroke="#FED7E2" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path
              d="M -42 10 C -64 -30, -54 -84, -34 -84 C -18 -84, -18 -30, -30 10 Z"
              fill="#FFFFFF"
              stroke="#FBB6CE"
              strokeWidth="4.2"
            />
            <path d="M -38 5 C -50 -24, -46 -68, -34 -68 C -22 -68, -24 -24, -30 5 Z" fill="#FED7E2" />
            <path
              d="M 30 10 C 18 -30, 18 -84, 34 -84 C 54 -84, 64 -30, 42 10 Z"
              fill="#FFFFFF"
              stroke="#FBB6CE"
              strokeWidth="4.2"
            />
            <path d="M 30 5 C 24 -24, 22 -68, 34 -68 C 46 -68, 50 -24, 38 5 Z" fill="#FED7E2" />
          </g>
        )}

        {hatId === 'angel_halo' && (
          <g id="hat-halo" transform="translate(270, 44)">
            <ellipse cx="0" cy="0" rx="64" ry="15" fill="none" stroke="url(#goldLuxGrad)" strokeWidth="7.5" />
            <text x="-76" y="7" fontSize="20" fill="#FAF089">✨</text>
            <text x="60" y="7" fontSize="20" fill="#FAF089">✨</text>
          </g>
        )}

        {/* ========================================================= */}
        {/* 10. ACCESSORIES & HANDHELD ITEMS */}
        {/* ========================================================= */}
        {accessoryId === 'cute_glasses' && (
          <g id="acc-glasses" transform="translate(270, 172)">
            <path
              d="M -56 -10 C -66 -25, -88 -10, -88 7 C -88 22, -56 34, -56 34 C -56 34, -24 22, -24 7 C -24 -10, -46 -25, -56 -10 Z"
              fill="rgba(254, 215, 226, 0.45)"
              stroke="#D53F8C"
              strokeWidth="4"
            />
            <path
              d="M 56 -10 C 46 -25, 24 -10, 24 7 C 24 22, 56 34, 56 34 C 56 34, 88 22, 88 7 C 88 -10, 66 -25, 56 -10 Z"
              fill="rgba(254, 215, 226, 0.45)"
              stroke="#D53F8C"
              strokeWidth="4"
            />
            <path d="M -24 8 Q 0 -1, 24 8" stroke="#D53F8C" strokeWidth="3.8" fill="none" />
          </g>
        )}

        {accessoryId === 'marshmallow_cocoa' && (
          <g id="acc-cocoa" transform="translate(366, 276) scale(1)">
            <rect x="-22" y="-14" width="44" height="40" rx="9" fill="#ED8936" stroke="#C05621" strokeWidth="3.8" />
            <path d="M 22 -6 C 34 -6, 34 22, 22 22" fill="none" stroke="#C05621" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="0" cy="-14" rx="22" ry="8" fill="#652B19" />
            <ellipse cx="0" cy="-15" rx="9" ry="5" fill="#FFFFFF" />
            <path d="M -9 -25 Q -13 -36, -7 -42" stroke="#CBD5E0" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 9 -27 Q 5 -38, 11 -44" stroke="#CBD5E0" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}

        {accessoryId === 'magic_star_wand' && (
          <g id="acc-wand" transform="translate(372, 246) rotate(15)">
            <rect x="-4" y="10" width="8" height="76" rx="4" fill="#FAF089" stroke="#D69E2E" strokeWidth="2.8" />
            <polygon
              points="0,-22 7,-7 22,-7 10,6 15,22 0,11 -15,22 -10,6 -22,-7 -7,-7"
              fill="url(#goldLuxGrad)"
              stroke="#D69E2E"
              strokeWidth="3.2"
            />
            <path d="M 4 15 Q 20 30, 11 48" stroke="#F687B3" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M -4 15 Q -20 30, -11 48" stroke="#63B3ED" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {accessoryId === 'cinnamon_pastry' && (
          <g id="acc-pastry" transform="translate(356, 282) scale(0.95)">
            <circle cx="0" cy="0" r="28" fill="#DD6B20" stroke="#9C4221" strokeWidth="3.8" />
            <path
              d="M -20 4 C -20 -18, 18 -18, 18 3 C 18 15, -6 15, -6 0 C -6 -7, 7 -7, 7 0"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {accessoryId === 'strawberry_boba' && (
          <g id="acc-boba" transform="translate(366, 268) scale(0.95)">
            <path d="M -18 -20 L 18 -20 L 14 30 L -14 30 Z" fill="#FED7D7" stroke="#E53E3E" strokeWidth="3.2" />
            <ellipse cx="0" cy="-20" rx="20" ry="7" fill="#FFFFFF" stroke="#E53E3E" strokeWidth="2.8" />
            <line x1="0" y1="-20" x2="8" y2="-40" stroke="#F56565" strokeWidth="5" strokeLinecap="round" />
            <circle cx="-7" cy="22" r="4" fill="#2D3748" />
            <circle cx="5" cy="24" r="4" fill="#2D3748" />
            <circle cx="0" cy="13" r="4" fill="#2D3748" />
          </g>
        )}

        {accessoryId === 'teddy_bear' && (
          <g id="acc-teddy" transform="translate(360, 274) scale(0.85)">
            <circle cx="0" cy="14" r="20" fill="#B7791F" stroke="#744210" strokeWidth="3.2" />
            <circle cx="0" cy="-14" r="17" fill="#B7791F" stroke="#744210" strokeWidth="3.2" />
            <circle cx="-16" cy="-25" r="8" fill="#B7791F" stroke="#744210" strokeWidth="2.8" />
            <circle cx="16" cy="-25" r="8" fill="#B7791F" stroke="#744210" strokeWidth="2.8" />
            <ellipse cx="0" cy="-9" rx="8" ry="6" fill="#FEEBC8" />
            <circle cx="0" cy="-11" r="2.5" fill="#744210" />
            <circle cx="-6" cy="-16" r="2" fill="#1A202C" />
            <circle cx="6" cy="-16" r="2" fill="#1A202C" />
            <polygon points="0,-1 -8,-6 -8,4" fill="#63B3ED" />
            <polygon points="0,-1 8,-6 8,4" fill="#63B3ED" />
            <circle cx="0" cy="-1" r="2.8" fill="#3182CE" />
          </g>
        )}

        {accessoryId === 'star_balloon' && (
          <g id="acc-balloon" transform="translate(372, 120)">
            <path d="M 0 55 Q -11 98, -14 165" stroke="#CBD5E0" strokeWidth="2.8" fill="none" />
            <polygon
              points="0,-42 13,-13 46,-13 21,9 29,40 0,22 -29,40 -21,9 -46,-13 -13,-13"
              fill="url(#goldLuxGrad)"
              stroke="#D69E2E"
              strokeWidth="3.5"
            />
            <circle cx="-8" cy="4" r="2.5" fill="#744210" />
            <circle cx="8" cy="4" r="2.5" fill="#744210" />
            <path d="M -5 11 Q 0 16, 5 11" stroke="#744210" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
