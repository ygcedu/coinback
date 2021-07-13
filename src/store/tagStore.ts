import tagListModel from '@/models/tagListModel';

export default {
  // tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name); // 知识点 2 // 最小知识原则
    if (message === 'duplicated') {
      window.alert('标签名重复了');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  // object: Exclude<Tag, 'id'> 表示 Tag 类型里除了 id 属性以外的值
  // window.updateTag = (id: string, object: Exclude<Tag, 'id'>) => {};
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  }
};