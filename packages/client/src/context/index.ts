import * as _ from 'lodash-es';
import { useDataSource } from '@/components/data-source/store';
import { router } from '@/router/vue-router';

export function useCommonContext() {
  const route = router.currentRoute.value;
  return {
    // lodash
    _,
    // 数据
    state: useDataSource().state,
    // route 对象
    route: route,
    //
    query: route.query,
  };
}
