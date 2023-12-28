import { Layout, Spin } from 'antd'
import { FC, useCallback, useEffect, useState } from 'react'
import RemainingHeightTemplate from '../../layouts/RemainingHeightTemplate.tsx/RemainingHeightTemplate'
import classes from './ProjectTree.module.css'
import ProjectTreeHeader from './ProjectTreeHeader/ProjectTreeHeader'
import { STATIC_URL } from '../../Global/Global'
import ProjectTreeContent from './ProjectTreeContent/ProjectTreeContent'
import { SelectedFile, SetStateFn, TreeData } from '../../types/general'
import restructureProjectContent from '../../utils/restructureProjectContent'

type Pos = string
type PosArr = number[]
type PosObj =
  | {
      level: number
      index: number
    }[]

interface Props {
  setSelectedFile: SetStateFn<SelectedFile>
}

const ProjectTree: FC<Props> = (props) => {
  const { setSelectedFile } = props
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [treeData, setTreeData] = useState<TreeData>([])

  console.log('treeData', treeData)
  const fetchProjectContent = useCallback(
    async (
      path?: string,
      current?: string,
      parentIndex?: string,
      pos?: Pos
    ) => {
      try {
        setLoading(true)
        setError(false)
        const url = `${STATIC_URL}/get-folder-content/?current=${current}`
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path }),
        })
        if (!res.ok) throw new Error('Failed to fetch project content')
        const data = await res.json()
        if (data) {
          const structuredTreeData: TreeData = restructureProjectContent(
            data,
            parentIndex
          )
          let posObj: PosObj = []
          if (pos) {
            let posArr: PosArr = pos.split('-').map((p) => parseInt(p))
            for (let j = 0; j < posArr.length; j += 2) {
              posObj.push({ level: posArr[j], index: posArr[j + 1] })
            }
          }
          if (posObj.length > 0) {
            setTreeData((prev) => {
              let newData: TreeData = prev
              posObj.forEach(({ level, index }, i, arr) => {
                newData[index].children = structuredTreeData
              })
              return prev
            })
          } else {
            setTreeData(structuredTreeData)
          }
        }
      } catch (e) {
        console.error('e', e)
        // setError(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    fetchProjectContent()
  }, [fetchProjectContent])

  if (loading) return <Spin />
  return (
    <Layout.Content className={classes.container}>
      {error ? (
        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
      ) : (
        <RemainingHeightTemplate>
          <ProjectTreeHeader
            fetchProjectContent={fetchProjectContent}
            setSelectedFile={setSelectedFile}
          />
          <ProjectTreeContent
            treeData={treeData}
            // setTreeData={setTreeData}
            // projectContent={projectContent}
            setSelectedFile={setSelectedFile}
            fetchProjectContent={fetchProjectContent}
          />
        </RemainingHeightTemplate>
      )}
    </Layout.Content>
  )
}

export default ProjectTree
