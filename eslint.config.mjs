import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Logger uchun console.* ruxsat
  {
    files: ["lib/ai-engine/runtime/logger/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },

  // Qolgan loyiha uchun
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },

  {
    ignores: [".next/**", "node_modules/**", "dist/**"],
  },
];

export default eslintConfig;
