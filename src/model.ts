const localStorageKeyName = 'recordList';

const model = {
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    // as 强行指定返回数据类型为 RecordItem[]
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};

export default model;