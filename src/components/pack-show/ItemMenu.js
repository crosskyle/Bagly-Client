import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateItem, removeItemFromList } from '../../actions/index'

import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import Button from 'material-ui-next/Button'
import TextField from 'material-ui-next/TextField'
import Checkbox from 'material-ui-next/Checkbox'
import { FormControlLabel, FormGroup } from 'material-ui-next/Form'
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui-next/Dialog'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui-next/styles'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    border: 'yellow',
    width: 200,
  }
})

const columnStyle = {
  marginLeft: '0em',
  paddingLeft: '.25em',
  marginRight: '0em',
  paddingRight: '.25em',
  verticalAlign: 'middle',
  textAlign: 'left'
}

class ItemMenu extends Component {

  constructor(props) {
    super(props);

    let { item } = this.props

    this.state = {
      open: false,
      item: {
        title: item.title,
        description: item.description,
        weight: item.weight,
        quantity: item.quantity,
        worn: item.worn,
        consumable: item.consumable
      }
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    let { item, category, pack } = this.props

    event.preventDefault();
    this.props.updateItem(pack.id, category.id, item.id, this.state.item)
  }

  render() {

    const { classes, item, category, pack } = this.props

    return (
      <div>
        <IconMenu
          iconButtonElement={
            <IconButton  style={columnStyle}>
              <MoreVertIcon />
            </IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          useLayerForClickAway={true}
        >
          <MenuItem
            primaryText="Edit"
            onClick={() => {
              this.setState({open: true})
            }}
          />
          <MenuItem
            primaryText="Remove"
            onClick={() => {
              this.props.removeItemFromList(pack.id, category.id, item.id)
            }}
          />
        </IconMenu>

        <Dialog open={this.state.open}  onRequestClose={() => this.setState({open: false})}>
          <DialogTitle>{'Add an Item'}</DialogTitle>
          <DialogContent>
            <form onSubmit={this.onFormSubmit}>
              <TextField
                label="Name"
                className={classes.textField}
                margin="normal"
                value={this.state.item.title}
                onChange={(event) => {
                  this.setState({
                    item: {
                      ...this.state.item,
                      title: event.target.value,
                    }
                  })
                }}
              />
              <TextField
                label="Description"
                className={classes.textField}
                margin="normal"
                value={this.state.item.description}
                onChange={(event) => {
                  this.setState({
                    item: {
                      ...this.state.item,
                      description: event.target.value,
                    }
                  })
                }}
              />
              <TextField
                label="Weight"
                className={classes.textField}
                margin="normal"
                value={this.state.item.weight}
                onChange={(event) => {
                  this.setState({
                    item: {
                      ...this.state.item,
                      weight: event.target.value,
                    }
                  })
                }}
              />
              <TextField
                label="Quantity"
                className={classes.textField}
                margin="normal"
                value={this.state.item.quantity}
                onChange={(event) => {
                  this.setState({
                    item: {
                      ...this.state.item,
                      quantity: event.target.value,
                    }
                  })
                }}
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.item.worn}
                      onChange={(event) => {
                        this.setState({
                          item: {
                            ...this.state.item,
                            worn: event.target.checked
                          }
                        })
                      }}
                    />
                  }
                  label="Worn"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.item.consumable}
                      onChange={(event) => {
                        this.setState({
                          item: {
                            ...this.state.item,
                            consumable: event.target.checked
                          }
                        })
                      }}
                    />
                  }
                  label="Consumable"
                />
              </FormGroup>
              <Button color="primary" onClick={() => this.setState({open: false})}>
                Cancel
              </Button>
              <Button type="submit" color="primary" onClick={() => this.setState({open: false})}>
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

ItemMenu.propTypes = {
  classes: PropTypes.object.isRequired
}

ItemMenu = withStyles(styles)(ItemMenu)

export default connect(null, { updateItem, removeItemFromList })(ItemMenu)