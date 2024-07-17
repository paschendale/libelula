import { keyframes } from "@chakra-ui/react";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const breathe = keyframes`
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.05); }
`;

export const move = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
`;

export const moveBackground = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 100vw 0; }
`;
