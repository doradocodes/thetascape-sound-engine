import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'ThetascapeSoundEngine',
            fileName: (format) => `thetascape-sound-engine.${format === 'es' ? 'js' : 'cjs'}`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [
                'tone',
                'react',
                'react-dom',
                'react-p5'
            ],
            output: {
                globals: {
                    tone: 'Tone'
                }
            }
        }
    },
    publicDir: 'src/public',
});
