import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCategory } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import Button from 'material-ui-next/Button'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

class CategoryAddModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: '',
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  onFormSubmit(event) {
    event.preventDefault();

    let obj = {}

    obj.title = this.state.title

    this.props.createCategory(this.props.pack.id, obj)

    this.setState({
      title: '',
    });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleOpen}>
          Add a category
        </Button>
        <Dialog
          title="Add a Category"
          open={this.state.open}
          modal={false}
          onRequestClose={() => this.setState({open: false})}
        >
          <form onSubmit={this.onFormSubmit}>
            <TextField
              name="title"
              floatingLabelText="Name"
              value={this.state.title}
              onChange={(event) => {this.setState({title: event.target.value})}}
            />
            <FlatButton
              label="Cancel"
              style={{color: '#3f51b5'}}
              onClick={this.handleClose}
            />
            <FlatButton
              type="submit"
              label="Submit"
              style={{color: '#3f51b5'}}
              onClick={this.handleClose}
            />
          </form>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { createCategory })(CategoryAddModal)
