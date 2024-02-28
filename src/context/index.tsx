import { ReactNode, createContext, useState } from 'react'
import { ListI } from '../service/types'

type ContextProviderProps = {
  children: ReactNode
}

type ContextControllerProps = {
  isRendering: boolean,
  setIsRendering: (rendering: boolean) => void
  showSider: boolean
  setShowSider: (rendering: boolean) => void
  dark: boolean
  setDark: (rendering: boolean) => void
  list: ListI[]
  setList: (list: ListI[]) => void
  lidx: number
  setLidx: (lidx: number) => void
}
export const ConfigControllerContext = createContext<ContextControllerProps | null>({
  isRendering: false,
  setIsRendering: () => {},
  showSider: true,
  setShowSider: () => {},
  dark: false,
  setDark: () => {},
  list: [],
  setList: () => {},
  lidx: -1,
  setLidx: () => {}
})


export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [isRendering, setIsRendering] = useState(false)
  const [showSider, setShowSider] = useState(true)
  const [dark, setDark] = useState(false)
  const [list, setList] = useState<ListI[]>([])
  const [lidx, setLidx] = useState(-1)

  return (
    <ConfigControllerContext.Provider
      value={{
        isRendering, setIsRendering,
        showSider, setShowSider,
        dark, setDark,
        list, setList,
        lidx, setLidx
      }}
    >
      {children}
    </ConfigControllerContext.Provider>
  )
}
