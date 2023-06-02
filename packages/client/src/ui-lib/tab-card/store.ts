import { InjectionKey } from 'vue';
import type { TabsRootContext } from '@/types';

// InjectionKey 指定了 provide 的类型，那么 inject 的时候就可以拿到该类型
export const tabsRootContextKey: InjectionKey<TabsRootContext> = Symbol('tabsRootContextKey');