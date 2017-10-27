import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ItemTypes } from './drag-n-drop/constants'
import { DropTarget } from 'react-dnd'
import { deleteCategory } from '../actions'
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

import ItemAddModal from './ItemAddModal'
import TableRowItem from './TableRowItem'

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
  }
}

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
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
    const { category, pack, connectDropTarget } = this.props

    return connectDropTarget(
      <div style={{ paddingLeft: '.5em', paddingRight: '.5em'}} >
        <Table
          fixedHeader={true}
          onRowHover={(d) =>  {}/* console.log(category.items[d])*/}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow >
            <TableHeaderColumn colSpan="31" style={{fontSize: '14px'}}>
              {category.title}
            </TableHeaderColumn>
            <TableHeaderColumn colSpan="4">
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
        <ItemAddModal pack={pack} category={category}/>
      </div>
    )
  }
}

PacksTable = connect(null, { deleteCategory })(PacksTable)
PacksTable = DropTarget(ItemTypes.DRAWER_ITEM, categoryTarget, collect)(PacksTable)

export default PacksTable
