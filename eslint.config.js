import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import vueTsConfigs from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "0Meta/Old/**"],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...vueTsConfigs(),
  skipFormatting,
  {
    files: ["src/**/*.{js,ts,vue}", "*.ts"],
    languageOptions: {
      globals: {
        confirm: "readonly",
        document: "readonly",
        localStorage: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-this-alias": "off",
      "vue/block-lang": "off",
      "vue/no-mutating-props": "off",
    },
  },
];
