import { FC, useEffect, useState } from 'react'
import { Tree } from 'antd'
import { DataNode, DirectoryTreeProps } from 'antd/es/tree'
import { ProjectContent } from '../../../types/general'
import restructureProjectContentData from '../../../utils/restructureProjectContentData'
const { DirectoryTree } = Tree

interface Props extends DirectoryTreeProps {
  projectContent: ProjectContent
}

const ProjectTreeContent: FC<Props> = (props) => {
  const { projectContent } = props
  const [treeData, setTreeData] = useState<DataNode[]>([])
  useEffect(() => {
    const tempTreeData = restructureProjectContentData(projectContent)
  }, [projectContent])
  return <DirectoryTree treeData={treeData} defaultExpandAll />
}

export default ProjectTreeContent
