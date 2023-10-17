
export const configModules = import.meta.glob('./components/**/config.ts', { eager: true });

export const componentModules = import.meta.glob('./components/**/index.vue', { eager: true });

// vue devtool 展不开  实例对象，这里转为 Object 对象
export const componentConfigs = Object.values(configModules).map(module => JSON.parse(JSON.stringify(module)));

export const opComponents = Object.values(componentModules).map(module => JSON.parse(JSON.stringify(module)));






