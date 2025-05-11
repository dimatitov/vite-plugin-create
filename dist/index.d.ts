import { Plugin } from 'vite';

declare function vitePluginCreate(): Plugin;

export { vitePluginCreate as default };
