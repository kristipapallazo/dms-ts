import { Dispatch, SetStateAction } from 'react'

export type Value = string | undefined
export type setStateFn<T> = React.Dispatch<React.SetStateAction<T>>
export type SelectedFile = string | undefined
export type ProjectContent = string[] | undefined
export type SetStateFn<T> = Dispatch<SetStateAction<T>>
