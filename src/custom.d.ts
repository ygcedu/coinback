type RecordItem = {
  tags?: string[]
  notes: string
  type: string
  amount: number // 数据类型 object | string | number ...
  createAt?: Date // 类 / 构造函数
}

type Tag = {
  id: string // id 理论上应该是由数据库 id 生成器自动生成的随机数字
  name: string
}

type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}

declare global {
  interface Window {
    tagList: Tag[]
    findTag: (id: string) => Tag | undefined
    createTag: (name: string) => void
    removeTag: (id: string) => boolean
    updateTag: TagListModel['update']// 类型和 TagListModel 里面的 update 一样
    recordList: RecordItem[]
    createRecord: (record: RecordItem) => void
  }
}

export {RecordItem, Window, TagListModel, Tag};