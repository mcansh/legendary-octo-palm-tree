import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin],
} satisfies Config;
