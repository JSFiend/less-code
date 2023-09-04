
interface State {
  [key: string]: any,
}


import { useDataSource } from "@/components/data-source/store";
import { parseExpression, setCommonContext } from "@/utils";

export const state: State = ref({});

export function useState() {
  const { pageVariableList, defaultDataList } = toRefs(useDataSource());





  return {
    state,
  }

}