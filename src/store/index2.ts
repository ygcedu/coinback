import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

console.log('index2 执行了');

const store = {
  ...recordStore,
  ...tagStore
};

export default store;