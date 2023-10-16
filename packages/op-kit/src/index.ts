
export const configModules = import.meta.glob('./components/**/config.ts', { eager: true });

export const componentModules = import.meta.glob('./components/**/index.vue', { eager: true });

window.configModules = configModules;
export const componentConfigs = Object.values(configModules);

export const opComponents = Object.values(componentModules);






