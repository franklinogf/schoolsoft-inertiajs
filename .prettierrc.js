/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  printWidth: 100,
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cn"],
};

export default config;
