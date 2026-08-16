import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier/flat";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  prettier,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "next-env.d.ts",
      "tsconfig.tsbuildinfo",
    ],
  },
];

export default eslintConfig;
