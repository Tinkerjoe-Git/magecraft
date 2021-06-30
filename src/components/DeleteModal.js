import React from 'react'
import { Modal, Button, Dialog, Icon } from '@material-ui/core'

const DeleteModal = (props) => {
  const { open, toggle, handleDelete, type } = props

  return (
    <Modal open={open}>
      <Dialog>
        <p>Are you certain you want to delete this {type}?</p>
      </Dialog>
      <Button primary color="red" inverted onClick={toggle}>
        <Icon name="remove" /> No
      </Button>
      <Button color="green" inverted onClick={handleDelete}>
        <Icon name="checkmark" /> Yes
      </Button>
    </Modal>
  )
}

export default DeleteModal
