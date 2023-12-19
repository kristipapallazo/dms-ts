import { FC, useEffect, useState } from 'react'
import { Tree } from 'antd'
import { DataNode, DirectoryTreeProps } from 'antd/es/tree'
import { ProjectContent } from '../../../types/general'
import restructureProjectContentData from '../../../utils/restructureProjectContentData'
const { DirectoryTree } = Tree

interface Props extends DirectoryTreeProps {
  projectContent: ProjectContent
  getProjectContent: any
}

const ProjectTreeContent: FC<Props> = (props) => {
  const { projectContent, getProjectContent } = props
  const [treeData, setTreeData] = useState<DataNode[]>([])
  console.log('treeData', treeData)
  const onLoadData = (item: any) =>
    new Promise<void>((resolve) => {
      const { key, children } = item
      console.log('item', item)
      console.log('resolve', resolve)

      // if (children) {
      //   resolve()
      //   return
      // }
      setTimeout(() => {
        // setTreeData((origin) =>
        //   updateTreeData(origin, key, [
        //     { title: 'Child Node', key: `${key}-0` },
        //     { title: 'Child Node', key: `${key}-1` },
        //   ])
        // )
        resolve()
      }, 1000)
    })
  useEffect(() => {
    const tempTreeData: DataNode[] =
      restructureProjectContentData(projectContent)
    setTreeData(tempTreeData)
  }, [projectContent])
  return (
    <DirectoryTree loadData={onLoadData} treeData={treeData} defaultExpandAll />
  )
}

export default ProjectTreeContent
