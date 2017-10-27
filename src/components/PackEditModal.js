import React, { Component } from 'react'
import EditIcon from 'material-ui/svg-icons/content/create'
import IconButton from 'material-ui/IconButton'
import IconButtonNext from 'material-ui-next/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import { connect } from 'react-redux'
import { updatePack, deletePack } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

class PackEditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: '',
      description: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(event) {
    event.preventDefault()

    let obj = {}

    obj.title = this.state.title
    obj.description = this.state.description

    this.props.updatePack(this.props.pack.id, obj)

    this.setState({
      title: '',
      description: ''
    })
  }

  render() {
    return (
      <div>
        <span style={{textAlign: 'left', marginLeft: 30}}>{this.props.pack.title}</span>
        <IconButton
          onClick={() => this.setState({open: true})}
          style={{ paddingRight: '0px', paddingBottom: '6px',
            verticalAlign: 'middle', textAlign: 'right', paddingTop: "0px", MarginTop: "0em"}}
        >
          <EditIcon />
        </IconButton>
        <IconButtonNext
          aria-label="Delete"
          onClick={() => this.props.deletePack(this.props.pack.id)}
          style={{ paddingRight: '0px', paddingBottom: '6px',
            verticalAlign: 'middle', textAlign: 'right', paddingTop: "0px", MarginTop: "0em"}}
        >
          <DeleteIcon style={{color: "#D3D3D3"}}/>
        </IconButtonNext>
        <Dialog
          title="Edit Pack"
          open={this.state.open}
          modal={false}
          onRequestClose={() => this.setState({open: false})}
        >
          <form onSubmit={this.onFormSubmit}>
            <TextField
              name="title"
              floatingLabelText="Name"
              value={this.state.title}
              onChange={(e) => {this.setState({title: e.target.value})}}
            />
            <TextField
              name="description"
              floatingLabelText="Description"
              value={this.state.description}
              onChange={(e) => {this.setState({description: e.target.value})}}
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

export default connect(null, { updatePack, deletePack })(PackEditModal)