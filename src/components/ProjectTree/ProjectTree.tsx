import { Layout, Spin } from 'antd'
import { FC, useCallback, useEffect, useState } from 'react'
import RemainingHeightTemplate from '../../layouts/RemainingHeightTemplate.tsx/RemainingHeightTemplate'
import classes from './ProjectTree.module.css'
import ProjectTreeHeader from './ProjectTreeHeader/ProjectTreeHeader'
import { ProjectContent, setStateFn } from '../../types/general'
import { STATIC_URL } from '../../Global/Global'
import ProjectTreeContent from './ProjectTreeContent/ProjectTreeContent'
import { json } from 'node:stream/consumers'

interface Props {
  projectContent: ProjectContent
  setProjectContent: setStateFn<ProjectContent>
}

const ProjectTree: FC<Props> = (props) => {
  const { projectContent, setProjectContent } = props
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const getProjectContent = useCallback(
    async (path = '.') => {
      try {
        setLoading(true)
        setError(false)
        const url = `${STATIC_URL}/get-project-content?path=${path}`
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify('test'),
        })
        if (!res.ok) throw new Error('Failed to fetch project content')
        const data = await res.json()
        console.log('data', data)
        if (data) {
          setProjectContent(data)
        }
      } catch (e) {
        console.error('e', e)
        // setError(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    },
    [setProjectContent]
  )

  useEffect(() => {
    getProjectContent()
  }, [getProjectContent])

  if (loading) return <Spin />
  return (
    <Layout.Content className={classes.container}>
      {error ? (
        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
      ) : (
        <RemainingHeightTemplate>
          <ProjectTreeHeader getProjectContent={getProjectContent} />
          <ProjectTreeContent projectContent={projectContent} getProjectContent={getProjectContent}/>
        </RemainingHeightTemplate>
      )}
    </Layout.Content>
  )
}

export default ProjectTree
