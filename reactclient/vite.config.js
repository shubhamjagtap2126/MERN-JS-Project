import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      open: true,
    },
    plugins: [react()],
  };
});
