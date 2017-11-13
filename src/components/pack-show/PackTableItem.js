import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { removeItemFromListDnd, putItemInCategory } from '../../actions/index'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../drag-n-drop/constants'
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

const itemSource = {
  beginDrag(props) {
    return props.item
  },

  endDrag(props, monitor) {
    if (monitor.getDropResult()) {
      const dropCategoryEndpoint = monitor.getDropResult().category.self
      const sourceCategoryEndpoint = props.category.self
      const itemId = props.item.id
      props.putItemInCategory(dropCategoryEndpoint, itemId)
      props.removeItemFromListDnd(sourceCategoryEndpoint, itemId)
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class TableRowItem extends Component {

  render() {

    let { connectDragSource, isDragging, item, category, pack } = this.props

    let wornColor = (item.worn) ? '#3f51b5' : '#D3D3D3'
    let consumableColor = (item.consumable) ? '#3f51b5' : '#D3D3D3'

    return (
      <TableRow style={{ opacity: isDragging ? 0.5 : 1 }} hoverable={true} ref={instance => connectDragSource(findDOMNode(instance))}>
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

TableRowItem = DragSource(ItemTypes.DRAWER_ITEM, itemSource, collect)(TableRowItem)
TableRowItem = connect(null, { removeItemFromListDnd, putItemInCategory })(TableRowItem)

export default TableRowItem