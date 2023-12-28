import { Dispatch, SetStateAction } from 'react'
import type { DataNode } from 'antd/es/tree'

export type SetStateFn<T> = Dispatch<SetStateAction<T>>
// export type setStateFn<T> = React.Dispatch<React.SetStateAction<T>>

export interface ProjectContent {
  name: string
  path: string
  isFile?: boolean
}
export type ProjectContentStore = ProjectContent[] | undefined
export interface TreeNode extends DataNode {
  name: string
  path: string
  isFile?: boolean
}
export type TreeData = TreeNode[]
export type FileContent = string | undefined
export type FetchFileContent = (name: string, path: string) => void

/* editor */
export type Value = string | undefined
export type SelectedFile = TreeNode | undefined
