import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PackEditModal from './PackEditModal'
import PacksTable from './PacksTable'
import CategoryAddModal from './CategoryAddModal'

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
      <div style={{textAlign: 'center', marginTop: 20}}>
        Select a pack
      </div>
      )
    }

    return (
      <div style={{marginTop: 10}}>
        <PackEditModal pack={pack}/>
        {this.renderCategories(pack.categories)}
        <br /><br />
        <CategoryAddModal pack={pack}/>
      </div>
    )
  }
}

function mapStateToProps({ packs, selectedPack }) {
  return { pack: packs[selectedPack] }
}

export default connect(mapStateToProps, null)(PacksShow)