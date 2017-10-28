import React, { Component } from 'react'
import {
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import FontIcon from 'material-ui/FontIcon'


import ItemMenu from './ItemMenu'

const columnStyle = {
  marginLeft: '0em',
  paddingLeft: '.25em',
  marginRight: '0em',
  paddingRight: '.25em',
  verticalAlign: 'middle',
  textAlign: 'left'
}


class TableRowItem extends Component {

  render() {

    let { item, category, pack } = this.props

    let wornColor = (item.worn) ? '#3f51b5' : '#D3D3D3'
    let consumableColor = (item.consumable) ? '#3f51b5' : '#D3D3D3'

    return (
      <TableRow hoverable={true}>
        <TableRowColumn style={{
          marginLeft: '0em',
          paddingLeft: '.5em',
          marginRight: '0em',
          paddingRight: '.25em',
          verticalAlign: 'middle',
          textAlign: 'left'}} colSpan="12">{item.title}</TableRowColumn>
        <TableRowColumn style={columnStyle} colSpan="12">{item.description}</TableRowColumn>
        <TableRowColumn style={columnStyle} colSpan="3">{item.weight}</TableRowColumn>
        <TableRowColumn style={columnStyle} colSpan="2">{item.quantity}</TableRowColumn>
        <TableRowColumn style={columnStyle} colSpan="4">
          <FontIcon className="material-icons" style={{color:wornColor, fontSize:"16px"}}>accessibility</FontIcon>
          <FontIcon className="material-icons" style={{color:consumableColor, fontSize:"16px"}}>restaurant_menu</FontIcon>
        </TableRowColumn>
        <TableHeaderColumn colSpan="2" style={columnStyle} >
          <ItemMenu item={item} category={category} pack={pack} />
        </TableHeaderColumn>
      </TableRow>
    )
  }
}

export default TableRowItem