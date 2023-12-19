import type { DataNode } from 'antd/es/tree'
import { ProjectContent } from '../types/general'

const restructureProjectContentData = (
  data: ProjectContent,
  level: number = 0
): DataNode[] => {
  let newData: DataNode[] = []
  data!.forEach((item) => {
    const getItemKey = (item: string, level: number) => `:${level}:${item}`
    let obj: DataNode = { key: getItemKey(item, level), title: item }
    if (item.includes('.')) {
      obj.isLeaf = true
    }
    newData.push(obj)
  })
  return newData
}
// const restructureProjectContentData = (data: ProjectContent): DataNode[] => {
//   let newData: DataNode[] = []
//   //[{key:'1', title:'1'}]

//   // let level: number = 0
//   data!.forEach((item) => {
//     const getObj = (item: string): DataNode => {
//       // const getItemKey = (name: string, level: number): string =>
//       //   `:${level}:${name}`
//       let obj: DataNode = { key: item, title: item }
//       if (item.includes('/')) {
//         //folder, has children
//         //1/script.ts
//         const slashIndex: number = item.indexOf('/')
//         const folderName: string = item.substring(0, slashIndex)
//         const remainingStr: string = item.substring(slashIndex + 1)
//         const itemIndex = (key: string): number => {
//           let index: number = -1
//           newData.forEach((obj, i) => {
//             if (obj.key === key) {
//               index = i
//             }
//           })
//           return index
//         }
//         if (itemIndex(folderName)) {
//         }
//         obj = {
//           key: folderName,
//           title: folderName,
//           children: [getObj(remainingStr)],
//         }
//       } else {
//         //no children, define type (folder/file)
//         if (SUPPORTED_FILES.some((k) => item.endsWith(k))) {
//           //supported file
//           obj.isLeaf = true
//         }
//       }
//       return obj
//     }
//     const obj: DataNode = getObj(item)
//     newData.push(obj)
//   })
//   return newData
// }

export default restructureProjectContentData
