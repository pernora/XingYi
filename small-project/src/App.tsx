import type {FC} from "react"
import { SWRConfig } from "swr"
import { HashRouter, Route, Routes } from "react-router-dom"
import { ConfigProvider, type ThemeConfig } from "antd"
import HomePage from "./views/HomePage"
import Opern from "./views/Perform/Opern"
import Technology from "./views/Perform/Technology"
import OpernDetail from "./views/Perform/Opern/OpernDetail"


const GlobalTheme: Partial<ThemeConfig> = {
  token: {
    fontFamily: '@primary-font'
  },
  components: {
    Pagination: {
      itemActiveBg: ''
    }
  }
}

const AppContent:FC = () =>{
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/opern" element={<Opern />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/opern/detail/:id" element={<OpernDetail />} />
      </Routes>
    </HashRouter>
  )
}

function App(){
  return (
    <ConfigProvider theme={GlobalTheme}>      
      <SWRConfig>
        <AppContent />
      </SWRConfig>
    </ConfigProvider>
  )
}

export default App;
