import {RecordItem} from '@/custom';
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  // record store
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    // as 强行指定返回数据类型为 RecordItem[]
    return this.recordList;
  },
  saveRecord() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date().toISOString();
    // 可选链语法（ES2020）
    // this.recordList?.push(record2);
    this.recordList && this.recordList.push(record2);
    recordStore.saveRecord();
  }
};

recordStore.fetchRecords();

export default recordStore;