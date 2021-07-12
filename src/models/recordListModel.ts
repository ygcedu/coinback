import {RecordItem} from '@/custom';

const localStorageKeyName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    // as 强行指定返回数据类型为 RecordItem[]
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName,
      JSON.stringify(this.data));
  }
};

export default recordListModel;