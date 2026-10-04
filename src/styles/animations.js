import { keyframes } from '@emotion/react';

export const morph = keyframes`
  0%, 100% { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
  33%      { border-radius: 40% 60% 45% 55% / 60% 40% 60% 40%; }
  66%      { border-radius: 55% 45% 60% 40% / 45% 55% 45% 55%; }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-14px); }
`;

export const pulseGlow = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(255, 216, 61, 0.6); }
  70%  { box-shadow: 0 0 0 16px rgba(255, 216, 61, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 216, 61, 0); }
`;

export const pop = keyframes`
  0%   { transform: scale(1); }
  40%  { transform: scale(1.45); }
  100% { transform: scale(1); }
`;

// يشغّل الأنيميشن فقط إذا لم يطلب المستخدم تقليل الحركة
export const withMotion = (animation) => ({
  '@media (prefers-reduced-motion: no-preference)': { animation },
});
export const kenBurns = keyframes`
  from { transform: scale(1.05) translate3d(0, 0, 0); }
  to   { transform: scale(1.18) translate3d(-2%, -1.5%, 0); }
`;

export const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const drift = keyframes`
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(40px, -30px, 0) scale(1.15); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

export const scrollUp = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-50%); }
`;

export const drawRoute = keyframes`
  0%        { stroke-dashoffset: 260; }
  55%, 100% { stroke-dashoffset: 0; }
`;

export const ping = keyframes`
  0%   { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(3.2); opacity: 0; }
`;

export const shine = keyframes`
  0%   { transform: translateX(0) skewX(-20deg); }
  60%, 100% { transform: translateX(400%) skewX(-20deg); }
`;

export const tagBounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-4px) scale(1.06); }
`;

export const rowGlow = keyframes`
  0%, 25%, 100% { transform: scale(1); box-shadow: 0 3px 10px rgba(30, 60, 100, 0.12); }
  10%           { transform: scale(1.04); box-shadow: 0 8px 18px rgba(34, 207, 240, 0.4); }
`;
export const lightboxIn = keyframes`
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
`;
export const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const riseUp = keyframes`
  from { transform: translateY(110%); }
  to   { transform: translateY(0); }
`;

export const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
`;

export const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: scale(1); }
`;

export const ripple = keyframes`
  0%   { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(2.4); opacity: 0; }
`;

export const tabPop = keyframes`
  0%   { transform: scale(1); }
  45%  { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// أنيميشن دخول جاهز: enter(fadeUp, 0.4) = يدخل بعد 0.4 ثانية
export const enter = (animation, delay = 0, duration = 0.9) =>
  withMotion(`${animation} ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s backwards`);

export const wipe = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0 0 0); }
`;
export const shimmer = keyframes`
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
`;
export const nudge = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(3px); }
`;
export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
`;
export const swing = keyframes`
  0%, 100% { transform: rotate(-35deg); }
  50%      { transform: rotate(35deg); }
`;