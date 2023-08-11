import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
// import ContentWrapper from './ContentWrapper'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <TopBar />
      <SideBar />
      <Outlet />
      {/* <ContentWrapper /> */}
    </div>
  )
}

export default Layout