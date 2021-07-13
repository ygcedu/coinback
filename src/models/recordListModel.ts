import {RecordItem} from '@/custom';
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createAt = new Date();
    this.data.push(record2);
    this.save();
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    // as 强行指定返回数据类型为 RecordItem[]
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default recordListModel;