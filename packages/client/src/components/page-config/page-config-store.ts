import { defineStore } from 'pinia';

export const usePageConfigStore = defineStore('pageConfigStore', () => {
  const pageConfigSchema = {
    properties: {
      padding: {
        type: 'number',
        title: '内边距',
        // default: 10,
      },
      // margin: {
      //   type: 'number',
      //   title: '外边距',
      //   default: 0,
      // },
      // title: {
      //   type: 'string',
      //   title: 'Title',
      //   default: 'Simulator',
      // },
      // description: {
      //   type: 'string',
      //   title: 'Description',
      //   default: 'Simulator',
      // },
      // keywords: {
      //   type: 'string',
      //   title: 'Keywords',
      //   default: 'Simulator',
      // },
    },
  };

  const pageConfig = ref({
    title: 'Simulator',
    description: 'Simulator',
    keywords: 'Simulator',
    author: 'Simulator',
    theme: 'light',
    background:
      'https://cdn.jsdelivr.net/gh/simulator-dev/simulator-dev.github.io@main/src/assets/images/background.jpg',
    backgroundColor: '#000000',
    backgroundOpacity: 0.5,
    margin: 0,
    padding: 10,
    width: 1920,
    height: 1080,
    scale: 1,
    showControls: true,
    showFullscreenButton: true,
    showZoomButtons: true,
    showHomeButton: true,
    showGrid: true,
    showAxis: true,
    showRotate: true,
    showScale: true,
    showGridHelper: true,
  });
  return {
    pageConfigSchema,
    pageConfig,
  };
});
