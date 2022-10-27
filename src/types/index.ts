import type {ReactNode} from "react";


export type IModelParams = {
  name:       string
  position?:  [number, number, number]
  rotation?:  [number, number, number]
  meshColor?: [number, number, number]
  rectColor?:     string
}
export type IComponentsParams = {
  name:       string
  refGui?:    any
  meshRef?:   any
  grpPos?:    [number, number, number]
  meshPos?:   [number, number, number]
  mR:         number
  mM:         number
}
export type ISquareParams = {
  name:       string
  position?:  [number, number, number]
  rotation?:  [number, number, number]
  children:   ReactNode
}
export type ITitleParams =  {
  refGui?:    any
  str:        ISquareParams["name"]
  setColor:   [number, number, number]
  position:   [number, number, number]
  rotation:   [number, number, number]
}
export type IRectParams = {
  refGui?:    any
  rectW:      number
  rectH:      number
  rectI:      number
  boxArgs?:   any
  position?:  [number, number, number]
  rotation?:  [number, number, number]
  rectColor?: any
  meshColor?: any
}
export type ISunParams = {
  refGui?:    any
  position?:  [number, number, number]
  rotation?:  [number, number, number]
}

