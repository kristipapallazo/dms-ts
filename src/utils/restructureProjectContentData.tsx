import type { DataNode } from 'antd/es/tree'
import { ProjectContent } from '../types/general'

const SUPPORTED_FILES = ['.hmtl', '.js', '.jsx', '.ts', '.tsx']

const restructureProjectContentData = (data: ProjectContent): DataNode[] => {
  let newData: DataNode[] = []
  //[{key:'1', title:'1'}]

  let level: number = 0
  data!.forEach((item) => {
    const getObj = (item: string): DataNode => {
      const getItemKey = (name: string, level: number): string =>
        `:${level}:${name}`
      let obj: DataNode = { key: getItemKey(item, level), title: item }

      if (item.includes('/')) {
        //folder, has children
        //1/script.ts
        const slashIndex: number = item.indexOf('/')
        const folderName: string = item.substring(0, slashIndex)
        const itemExist = (key: string): boolean => {
          let exist: boolean = false
          newData.forEach((obj) => {
            if (obj.key === key) {
              exist = true
            }
          })
          return exist
        }
        if (itemExist(item)) {
        }
        const remainingStr: string = item.substring(slashIndex + 1)
        obj = {
          key: folderName,
          title: folderName,
          children: [getObj(remainingStr)],
        }
      } else {
        //no children, define type (folder/file)
        if (SUPPORTED_FILES.some((k) => item.endsWith(k))) {
          //supported file
          obj.isLeaf = true
        }
      }
      return obj
    }
    const obj: DataNode = getObj(item)
    newData.push(obj)
  })
  return newData
}

export default restructureProjectContentData
