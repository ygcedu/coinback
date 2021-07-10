type TagListModel = {
  data: string[]
  fetch: () => string[]
  create: (name: string) => { code: number, message: string } // 'success' 表示成功，'duplicated' 表示 name 重复
  save: () => void
}
const localStorageKeyName = 'tagList';

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name: string) {
    if (this.data.indexOf(name) >= 0) {
      return {code: 1, message: 'duplicated'};
    }
    this.data.push(name);
    this.save();
    return {code: 0, message: 'success'};
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;