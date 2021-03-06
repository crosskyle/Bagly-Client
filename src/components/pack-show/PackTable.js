import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ItemTypes } from '../drag-n-drop/constants'
import { DropTarget } from 'react-dnd'
import { deleteCategory } from '../../actions/index'
import _ from 'lodash'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table'
import IconButton from 'material-ui-next/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import Paper from 'material-ui-next/Paper'

import ItemAddModal from './ItemAdd'
import TableRowItem from './PackTableItem'

const columnStyle = {
  marginLeft: '0em',
  paddingLeft: '.25em',
  marginRight: '0em',
  paddingRight: '.25em',
  verticalAlign: 'middle',
  textAlign: 'left'
}

const categoryTarget = {
  drop(props) {
    return props
  },
  canDrop(props, monitor) {
    let itemId = monitor.getItem().id

    for (let i = 0; i < props.category.items.length; i++) {
      if (props.category.items[i].id === itemId) {
        return false
      }
    }
    return true
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  }
}

class PacksTable extends Component {


  renderItems(category) {
    return _.map(category.items, item => {
      return (
         <TableRowItem key={item.id} item={item} category={category} pack={this.props.pack}/>
      )
    })
  }

  render() {
    const { category, pack, connectDropTarget, isOverCurrent, canDrop} = this.props

    let dropColor = ""

    if (canDrop && isOverCurrent) {
      dropColor = "#b8de8b"
    }
    else if (canDrop) {
      dropColor = "#b7bacf"
    }

    return connectDropTarget(
      <div style={{ paddingLeft: '.5em', paddingRight: '.5em', marginTop: '15px' }} >
        <Paper>
          <Table
            style={{ backgroundColor: dropColor }}
            wrapperStyle={{ maxHeight: 300 }}
            fixedHeader={true}
            onRowHover={(d) =>  {}/* console.log(category.items[d])*/}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow >
              <TableHeaderColumn colSpan="31" style={{fontSize: '14px'}}>
                {category.title}
              </TableHeaderColumn>
              <TableHeaderColumn style={columnStyle} colSpan="4">
                <IconButton
                  aria-label="Delete"
                  onClick={() => this.props.deleteCategory(pack.id, category.id)} >
                  <DeleteIcon style={{color: "#D3D3D3"}}/>
                </IconButton>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn style={{
                marginLeft: '0em',
                paddingLeft: '.5em',
                marginRight: '0em',
                paddingRight: '.25em',
                verticalAlign: 'middle',
                textAlign: 'left'}} colSpan="12">Name</TableHeaderColumn>
              <TableHeaderColumn style={columnStyle} colSpan="12">Description</TableHeaderColumn>
              <TableHeaderColumn style={columnStyle} colSpan="3">Oz</TableHeaderColumn>
              <TableHeaderColumn style={columnStyle} colSpan="2">Qty</TableHeaderColumn>
              <TableHeaderColumn style={columnStyle} colSpan="4"> </TableHeaderColumn>
              <TableHeaderColumn style={columnStyle} colSpan="2"> </TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} displayRowCheckbox={false}>
            {this.renderItems(category)}
            </TableBody>
          </Table>
        </Paper>

        <ItemAddModal pack={pack} category={category}/>

      </div>
    )
  }
}

PacksTable = connect(null, { deleteCategory })(PacksTable)
PacksTable = DropTarget(ItemTypes.DRAWER_ITEM, categoryTarget, collect)(PacksTable)

export default PacksTable
