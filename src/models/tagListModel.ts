type TagListModel = {
  data: string[]
  fetch: () => string[]
  create: (name: string) => boolean
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
      return false;
    }
    this.data.push(name);
    this.save();
    return true;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;