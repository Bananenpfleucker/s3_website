import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'docs',
        minify: false
    },
    base: '/s3_website/'
});
