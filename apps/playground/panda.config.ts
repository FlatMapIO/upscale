import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: "neutral",
      grayColor: "sand",
      additionalColors: ["tomato"],
      borderRadius: "md",
    }),
  ],
  include: ["./src/**/*.{ts,tsx}"],
  exclude: ["./src/{lib,fixtures}/**/*.*"],
  theme: {
    extend: {},
  },
  outdir: "src/styled-system",
  importMap: "~/styled-system",
});
