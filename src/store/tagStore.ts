import {Tag} from '@/custom';
import createId from '@/lib/idCreator';

const localStorageKeyName = 'tagList';

const tagStore = {
  // tag store
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag(name: string) {
    // this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了');
      return 'duplicated';
    }
    const id = createId().toString();
    this.tagList.push({id, name: name});
    window.alert('添加成功');
    this.saveTags();
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  // object: Exclude<Tag, 'id'> 表示 Tag 类型里除了 id 属性以外的值
  // window.updateTag = (id: string, object: Exclude<Tag, 'id'>) => {};
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.id = tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};

tagStore.fetchTags();

export default tagStore;