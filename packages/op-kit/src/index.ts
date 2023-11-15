import { ComponentInstance } from '~types';

export const configModules = import.meta.glob('./components/**/config.ts', {
  eager: true,
});

// vue devtool 展不开  实例对象，这里转为 Object 对象
export const componentInstances: ComponentInstance[]  = Object.values(configModules).map((module) =>
  JSON.parse(JSON.stringify(module))
);


const componentModules = import.meta.glob('./components/**/index.vue', {
  eager: true,
});

console.log('componentModules', componentModules);
export const opComponents = {};

Object.values(componentModules).forEach((mod) => {
  opComponents[mod.default.name] = mod.default;
})

export * from './action/index';

