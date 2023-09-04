import { setCommonContext } from "@/utils";

export function piniaGlobalStore() {
  const route = useRoute();
  const router = useRouter();
  setCommonContext('route', route);
  return {
    route,
    router,
  };
}