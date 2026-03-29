import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import vinext from "vinext";

export default defineConfig(({ command }) => ({
  plugins: [
    vinext(),
    // The Cloudflare plugin is required for `vinext build` (Cloudflare Workers output)
    // but causes issues in `vinext dev` with the Pages Router virtual RSC entry.
    ...(command === "build" ? [cloudflare()] : []),
  ],
}));
