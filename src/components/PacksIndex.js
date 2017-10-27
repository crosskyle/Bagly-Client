import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readPacks, selectedPack, createPack } from '../actions'
import Button from 'material-ui-next/Button'
import List, { ListItem, ListItemText } from 'material-ui-next/List'


class PacksIndex extends Component {

  componentDidMount() {
    this.props.readPacks()
  }

  renderPacks() {
    return _.map(this.props.packs, pack => {
      return (
        <ListItem
          button
          onClick= {
            () => {
              this.props.onPackSelect()
              this.props.selectedPack(pack.id)
            }
          }
          key={pack.id}
        >
          <ListItemText primary={pack.title}/>
        </ListItem>
      )
    })
  }

  render() {
    return (
      <div>
        <h3>Packs</h3>
        <div>
          <Button
            onClick={() => this.props.createPack()}
            color="primary"
            style={{marginTop: 12}}
          >
            Add a pack
          </Button>
        </div>
        <List>
          {this.renderPacks()}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { packs: state.packs }
}

//using readPacks: readPacks instead of mapDispatch
export default connect(mapStateToProps, { createPack, readPacks, selectedPack })(PacksIndex)