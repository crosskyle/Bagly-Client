import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './drag-n-drop/constants'
import { deleteItem, putItemInCategory } from '../actions'
import { ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui-next/List'
import IconButton from 'material-ui-next/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

const itemSource = {
  beginDrag(props) {
    return props.item
  },

  endDrag(props, monitor) {
    if (monitor.getDropResult()) {
      const categoryEndpoint = monitor.getDropResult().category.self
      const itemId = props.item.id
      props.putItemInCategory(categoryEndpoint, itemId)
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Item extends Component {

  render() {
    const { connectDragSource, isDragging, item } = this.props
    const weight = `${item.weight} oz.`

    return connectDragSource(
      <div  style={{ opacity: isDragging ? 0.5 : 1 }}>
        <ListItem>
          <ListItemText primary={item.title} secondary={weight}/>
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete"
                        onClick={() => {
                          this.props.deleteItem(item.id, this.props.pack)
                        }}
            >
              <DeleteIcon style={{color: "#D3D3D3"}}/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    )
  }
}


Item = DragSource(ItemTypes.DRAWER_ITEM, itemSource, collect)(Item)
Item = connect(null, { deleteItem, putItemInCategory })(Item)

export default Item