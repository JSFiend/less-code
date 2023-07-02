

export const useEnvironmentStore = defineStore('environmentStore', {
  state() {
    return {
      environment: [
        {
          env: 'dev',
          name: '平台环境',
        },
        {
          env: 'test',
          name: '测试环境',
        },
        {
          env: 'uat',
          name: '用户体验环境',
        },
        {
          env: 'prod',
          name: '正式环境',
        },
      ]
    };
  }
});