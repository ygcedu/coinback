type RootState = {
  recordList: RecordItem[],
  createRecordError: Error | null,
  createTagError: Error | null,
  tagList: Tag[],
  currentTag?: Tag
}

type RecordItem = {
  tags: Tag[]
  notes: string
  type: string
  amount: number // 数据类型 object | string | number ...
  createdAt?: string // 类 / 构造函数
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

export {RootState, RecordItem, Window, TagListModel, Tag};