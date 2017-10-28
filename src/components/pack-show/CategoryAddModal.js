import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCategory } from '../../actions/index'
import Button from 'material-ui-next/Button'
import TextField from 'material-ui-next/TextField'
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
    const { classes } = this.props

    return (
      <div>
        <Button color="primary" onClick={this.handleOpen}>
          Add a category
        </Button>
        <Dialog open={this.state.open} onRequestClose={() => this.setState({open: false})}>
          <DialogTitle>{'Add a Category'}</DialogTitle>
          <DialogContent>
            <form onSubmit={this.onFormSubmit}>
              <TextField
                label="Title"
                className={classes.textField}
                margin="normal"
                value={this.state.title}
                onChange={(event) => {this.setState({title: event.target.value})}}
              />
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

CategoryAddModal.propTypes = {
  classes: PropTypes.object.isRequired
}

CategoryAddModal = withStyles(styles)(CategoryAddModal)
CategoryAddModal = connect(null, { createCategory })(CategoryAddModal)

export default CategoryAddModal
