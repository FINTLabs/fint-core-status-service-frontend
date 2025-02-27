import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      header: "#1F3D59",
      body: "#ECEBF5",
      "tab-body": "#98B1C9",
    },
  },
  plugins: [],
} satisfies Config;
