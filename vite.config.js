import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				bmi: resolve(__dirname, 'bmi/bmi.html'),
                jstreeni: resolve(__dirname, 'JS-treeni.html'),
                rajapinnat: resolve(__dirname, 'rajapinnat.html'),
			},
		},
	},
	// Public base path could be set here too:
	//base: '/~roopejjo/hyte/',
	base: './',
});