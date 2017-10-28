import React, { Component } from 'react'
import IconButton from 'material-ui-next/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Create'
import { connect } from 'react-redux'
import { updatePack, deletePack } from '../../actions/index'
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


class PackEdit extends Component {
  constructor(props) {
    super(props);

    const { pack } = this.props

    this.state = {
      open: false,
      title: pack.title,
      description: pack.description
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
    const { classes } = this.props

    return (
      <div>
        <span style={{textAlign: 'left', marginLeft: 30}}>{this.props.pack.title}</span>
        <IconButton
          aria-label="Edit"
          onClick={() => this.setState({open: true})}
          style={{ paddingBottom: '6px', paddingLeft: '15px',
            verticalAlign: 'middle'}}
        >
          <EditIcon style={{color: "#D3D3D3"}}/>
        </IconButton>
        <IconButton
          aria-label="Delete"
          onClick={() => this.props.deletePack(this.props.pack.id)}
          style={{ paddingBottom: '6px',
            verticalAlign: 'middle' }}
        >
          <DeleteIcon style={{color: "#D3D3D3"}}/>
        </IconButton>
        <Dialog open={this.state.open} onRequestClose={() => this.setState({open: false})}>
          <DialogTitle>Edit Pack</DialogTitle>
          <DialogContent>
            <form onSubmit={this.onFormSubmit}>
              <TextField
                label="Name"
                className={classes.textField}
                margin="normal"
                value={this.state.title}
                onChange={(e) => {this.setState({title: e.target.value})}}
              />
              <TextField
                label="Description"
                className={classes.textField}
                margin="normal"
                value={this.state.description}
                onChange={(e) => {this.setState({description: e.target.value})}}
              />
              <Button color="primary" onClick={() => this.setState({open: false})}>
                Cancel
              </Button>
              <Button type="submit" color="primary" onClick={() => this.setState({open: false})}>
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <br/>
        <span style={{textAlign: 'left', marginLeft: 30}}>{this.props.pack.description}</span>
        <br/>
        <br/>
      </div>
    )
  }
}

PackEdit.propTypes = {
  classes: PropTypes.object.isRequired
}

PackEdit = withStyles(styles)(PackEdit)

export default connect(null, { updatePack, deletePack })(PackEdit)
