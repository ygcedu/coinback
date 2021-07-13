import {RecordItem} from '@/custom';
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
let data: RecordItem[] | undefined = undefined;

const recordStore = {
  recordList: data,
  // record store
  fetchRecords() {
    data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    // as 强行指定返回数据类型为 RecordItem[]
    return data;
  },
  saveRecord() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  createRecord: (record: RecordItem) => {
    const record2: RecordItem = clone(record);
    record2.createAt = new Date();
    data && data.push(record2);
    recordStore.saveRecord();
  }
};

recordStore.fetchRecords();

export default recordStore;