import { useDictStore } from "@/stores/dict.js";

export async function getDictValue(type, key, options = {}) {
  const { keyField = "dictLabel", valueField = "dictValue" } = options;
  const store = useDictStore();
  const list = await store.fetchDict(type);
  const item = list.find((item) => item[keyField] === key);
  return item?.[valueField] ?? "";
}
