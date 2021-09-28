import preprocess from 'svelte-preprocess';
import svg from '@poppanator/sveltekit-svg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			includePaths: ["src"],
			prependData: `@import 'static/css/variables.scss';`
		},
	}),

	kit: {
		target: '#svelte',
		vite: {
			plugins: [svg({
				type: 'component'
			})],
			optimizeDeps: {
				include: ["highlight.js/lib/core"],
			}
		},
	}
};

export default config;
