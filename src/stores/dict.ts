import { defineStore } from "pinia";
import { ref } from "vue";
// import { getsmartsiteDict } from "@/api/dict";
const getsmartsiteDict = () => {};

// ✅ 单个字典项类型
export interface DictItem {
  label: string;
  value: string | number;
  dictLabel: string;
  dictValue: string | number;
}

// ✅ 后端返回类型（按你接口推测）
interface ApiDictItem {
  dictLabel: string;
  dictValue: string | number;
}

// ✅ store
export const useDictStore = defineStore("dict", () => {
  // state
  const dictMap = ref<Record<string, DictItem[]>>({});

  // 正在请求的 Promise 缓存
  const loadingMap = ref<Record<string, Promise<DictItem[]>>>({});

  // getters
  const getDict = (type: string): DictItem[] => {
    return dictMap.value[type] || [];
  };

  // actions
  const fetchDict = async (type: string): Promise<DictItem[]> => {
    // 已缓存
    if (dictMap.value[type]) return dictMap.value[type];

    // 正在请求（防重复）
    if (loadingMap.value[type]) return loadingMap.value[type];

    const request = getsmartsiteDict(type).then((res: any) => {
      const data: ApiDictItem[] = res.data || [];

      const list: DictItem[] = data.map((dict) => ({
        label: dict.dictLabel,
        value: dict.dictValue,
        dictLabel: dict.dictLabel,
        dictValue: dict.dictValue,
      }));

      dictMap.value[type] = list;
      delete loadingMap.value[type];

      return list;
    });

    loadingMap.value[type] = request;

    return request;
  };

  const fetchDicts = async (types: string[]): Promise<DictItem[][]> => {
    return Promise.all(types.map((t) => fetchDict(t)));
  };

  return {
    dictMap,
    getDict,
    fetchDict,
    fetchDicts,
  };
});
