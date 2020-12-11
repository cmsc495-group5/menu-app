import React from 'react'
import { Link } from 'react-router-dom';

export default function ReturnMenu() {
  const style = {
    paddingTop: "1rem"
  }

  return (
    <div style={style}>
      <hr></hr>
      <Link to={'/'}>Home</Link><br/>
      <Link to={'/admin/menus/'}>Menus List</Link><br/>
      <Link to={'/admin/sections'}>Sections</Link><br/>
      <Link to={'/admin/items/'}>Items</Link><br/>
      <Link to={'/admin/options/'}>Options</Link><br/>
      <Link to={'/menu'}>Full Menu</Link><br/>
      <Link to={'/admin/demo/'}>Demo</Link><br/>
    </div>
  )
}
