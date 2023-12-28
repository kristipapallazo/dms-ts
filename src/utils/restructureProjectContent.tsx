import { ProjectContentStore, TreeData, TreeNode } from '../types/general'

type ParentIndex = string

const getItemKey = (name: string, parentIndex: ParentIndex, index: number) =>
  `${parentIndex}:${index}:${name}`

const restructureProjectContent = (
  data: ProjectContentStore,
  parentIndex: ParentIndex = '0'
): TreeData => {
  if (!data) return []
  const newData: TreeData = data!.map((item, index) => {
    const { name, isFile } = item
    let obj: TreeNode = {
      key: getItemKey(name, parentIndex, index),
      title: name,
      ...item,
    }
    if (isFile) {
      obj.isLeaf = true
    }
    return obj
  })
  return newData
}

export default restructureProjectContent
