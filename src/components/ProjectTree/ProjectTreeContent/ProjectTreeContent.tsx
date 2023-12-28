import { FC } from 'react'
import { Tree } from 'antd'
import { DirectoryTreeProps } from 'antd/es/tree'
import { SelectedFile, SetStateFn, TreeData } from '../../../types/general'

const { DirectoryTree } = Tree

interface Props extends DirectoryTreeProps {
  treeData: TreeData
  fetchProjectContent: any
  setSelectedFile: SetStateFn<SelectedFile>
}

const ProjectTreeContent: FC<Props> = (props) => {
  const { fetchProjectContent, treeData, setSelectedFile } = props
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    const { node } = info
    if (node.isFile) setSelectedFile(node)
  }
  const onLoadData = (node: any) =>
    new Promise<void>((resolve) => {
      const { path, name, pos, children, key } = node
      const parentIndex: string = key.substring(0, key.lastIndexOf(':'))

      if (children) {
        resolve()
        return
      }
      setTimeout(() => {
        fetchProjectContent(path, name, parentIndex, pos)
        resolve()
      }, 2000)
    })
  return (
    <DirectoryTree
      loadData={onLoadData}
      treeData={treeData}
      onSelect={onSelect}
    />
  )
}

export default ProjectTreeContent
