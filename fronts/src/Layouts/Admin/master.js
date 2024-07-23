import React from 'react'
import { Outlet } from 'react-router-dom'

export const Master = () => {


    
  return (
    <div>
        <h2>This is master Page</h2>
        <Outlet/>
    </div>
  )
}
