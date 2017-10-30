import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PackEdit from './PackEdit'
import PacksTable from './PackTable'
import CategoryAdd from './CategoryAdd'

class PacksShow extends Component {

  renderCategories(categories) {
    return _.map(categories, category => {
      return <PacksTable key={category.id} category={category} pack={this.props.pack} />
    })
  }

  render () {
    const { pack } = this.props

    if (!pack) {
      return (
      <div style={{textAlign: 'center', marginTop: 30}}>
        Open the left pane and add a new pack list or select an existing pack
      </div>
      )
    }

    return (
      <div style={{marginTop: 10}}>
        <PackEdit pack={pack}/>
        {this.renderCategories(pack.categories)}
        <br /><br />
        <CategoryAdd pack={pack}/>
      </div>
    )
  }
}

function mapStateToProps({ packs, selectedPack }) {
  return { pack: packs[selectedPack] }
}

export default connect(mapStateToProps, null)(PacksShow)