import type { DataNode } from 'antd/es/tree'
import { ProjectContentStore } from '../types/general'

const restructureProjectContentData = (
  data: ProjectContentStore,
  level: number = 0
): DataNode[] => {
  let newData: DataNode[] = []
  data!.forEach((item) => {
    const { name, isFile } = item
    const getItemKey = (name: string, level: number) => `:${level}:${item}`
    let obj: DataNode = { key: getItemKey(name, level), title: name }
    if (isFile) {
      obj.isLeaf = true
    }
    newData.push(obj)
  })
  return newData
}

export default restructureProjectContentData
