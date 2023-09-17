import * as _ from 'lodash-es';
import { useDataSourceStore } from '@/components/data-source/data-source-store';
import { router } from '@/router/vue-router';
import Cookies from 'universal-cookie';

const mainCookies = new Cookies(null, { path: '/' });

export function useCommonContext() {
  const route = router.currentRoute.value;
  const cookies = computed({
    get: mainCookies.getAll.bind(mainCookies),
    set() {}
  });
  return {
    // lodash
    _,
    // 数据
    state: useDataSourceStore().state,
    // route 对象
    route: route,
    // router 对象
    router,
    // URL 上的参数
    query: route.query,
    // cookies
    cookies,
    // universal-cookie 办法
    Cookies,
  };
}
