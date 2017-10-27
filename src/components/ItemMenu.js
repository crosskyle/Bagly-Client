import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateItem, removeItemFromList } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

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

    const { item, category, pack } = this.props

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

        <Dialog
          title="Edit an Item"
          open={this.state.open}
          modal={false}
          onRequestClose={() => this.setState({open: false})}
        >
          <form onSubmit={this.onFormSubmit}>
            <TextField
              name="title"
              floatingLabelText="Name"
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
              name="description"
              floatingLabelText="Description"
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
              name="weight"
              floatingLabelText="Weight"
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
              name="quantity"
              floatingLabelText="Quantity"
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
            <Checkbox
              name="worn"
              label="Worn"
              checked={this.state.item.worn}
              onCheck={() => {
                this.setState({
                  item: {
                    ...this.state.item,
                    worn: !this.state.item.worn,
                  }
                })
              }}
            />
            <Checkbox
              name="consumable"
              label="Consumable"
              checked={this.state.item.consumable}
              onCheck={() => {
                this.setState({
                  item: {
                    ...this.state.item,
                    consumable: !this.state.item.consumable
                  }
                })
              }}
            />
            <FlatButton
              label="Cancel"
              style={{color: '#3f51b5'}}
              onClick={() => this.setState({open: false})}
            />
            <FlatButton
              type="submit"
              label="Submit"
              style={{color: '#3f51b5'}}
              onClick={() => this.setState({open: false})}
            />
          </form>
        </Dialog>
      </div>

    )
  }
}

export default connect(null, { updateItem, removeItemFromList })(ItemMenu)