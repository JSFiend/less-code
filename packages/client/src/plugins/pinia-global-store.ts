

export function piniaGlobalStore() {
  const route = useRoute();
  const router = useRouter();
  return {
    route,
    router,
  };
}