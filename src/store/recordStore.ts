import recordListModel from '@/models/recordListModel';
import {RecordItem} from '@/custom';


export default {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),
};