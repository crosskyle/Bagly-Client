import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'
import { readItems } from '../actions'
import List from 'material-ui-next/List'

class ItemsIndex extends Component {

  componentDidMount() {
    this.props.readItems()
  }

  renderItems() {
    return _.map(this.props.items, item => {
      return <Item item={item} pack={this.props.pack} key={item.id} />
    })
  }

  render() {
    return (
      <div>
        <h3>Items</h3>
        <List>
          {this.renderItems()}
        </List>
      </div>
    )
  }
}

function mapStateToProps({ items, packs, selectedPack }) {
  return { items, pack: packs[selectedPack] }
}

ItemsIndex = connect(mapStateToProps, { readItems })(ItemsIndex)

export default ItemsIndex