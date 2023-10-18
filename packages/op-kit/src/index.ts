
export const configModules = import.meta.glob('./components/**/config.ts', { eager: true });

// vue devtool 展不开  实例对象，这里转为 Object 对象
export const componentConfigs = Object.values(configModules).map(module => JSON.parse(JSON.stringify(module)));


export const componentModules1 = import.meta.glob('./components/**/index.vue', { eager: true });

export const opComponents = {}


const componentModules = import.meta.glob('./components/**/index.vue')

for (const path in componentModules) {
  componentModules[path]().then((mod) => {
    console.log('mod', mod);
    // 使用文件名作为组件名
    const match = path.match(/\.\/components\/(.*?)\/index\.vue/);
    if (match && match[1]) {
    opComponents[match[1]] = mod.default

    }
  })
}








