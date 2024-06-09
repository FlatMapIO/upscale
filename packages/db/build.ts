import { buildSync } from "esbuild";

buildSync({
  define: {
    "import.meta.env.PROD": "true",
    "import.meta.env.DEV": "false",
  },
  entryPoints: ["src/meta-fields.ts", "src/libsql.ts"],
  platform: "node",
  format: "cjs",
  outdir: "dist/cjs",
  minify: false,
});
