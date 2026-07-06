import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...coreWebVitals,
  {
    ignores: [".next/**", "out/**", "node_modules/**", "dist/**"],
  },
];

export default config;
