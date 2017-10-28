import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createItemInCategory } from '../../actions/index'
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

class ItemAddModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      item: {
        title: '',
        description: '',
        weight: '',
        quantity: '',
        worn: false,
        consumable: false
      }
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  onFormSubmit(event) {
    event.preventDefault()

    let { category, pack } = this.props

    this.props.createItemInCategory(pack.id, category.id, this.state.item)

    this.setState({
      item: {
        title: '',
        description: '',
        weight: '',
        quantity: '',
        worn: false,
        consumable: false
      }
    })
  }

  render() {

    const { classes } = this.props

    return (
      <div>
        <Button color="primary" onClick={this.handleOpen}>
          Add an item
        </Button>
        <Dialog open={this.state.open} onRequestClose={() => this.setState({open: false})}>
          <DialogTitle>{'Add an Item'}</DialogTitle>
          <DialogContent>
            <form onSubmit={this.onFormSubmit}>
              <TextField
                label="Name"
                className={classes.textField}
                margin="normal"
                value={this.state.title}
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
                value={this.state.description}
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
                value={this.state.weight}
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
                value={this.state.quantity}
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
                      checked={this.state.worn}
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
                      checked={this.state.consumable}
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
              <Button color="primary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary" onClick={this.handleClose}>
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

ItemAddModal.propTypes = {
  classes: PropTypes.object.isRequired
}

ItemAddModal = withStyles(styles)(ItemAddModal)

export default connect(null, { createItemInCategory })(ItemAddModal)
