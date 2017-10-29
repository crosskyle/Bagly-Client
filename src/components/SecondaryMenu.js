import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signoutUser } from '../actions'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'

class SecondaryMenu extends Component {

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={
            <IconButton >
              <ExpandMore />
            </IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          useLayerForClickAway={true}
        >
          <MenuItem
            primaryText="Sign Out"
            onClick={() => {
              this.props.signoutUser()
            }}
          />
        </IconMenu>
      </div>
    )
  }
}

export default connect(null, { signoutUser })(SecondaryMenu)
