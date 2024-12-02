import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'

function ListItem ({ item, markAsDone, deleteItem }) {
  return (
    <li className={`list__item${item.completed ? ' done' : ''}`} >
      <div className="list__checkbox">
        <input id={item.id} type="checkbox" defaultChecked={item.completed} onClick={() => markAsDone(item.id)} />
        <label htmlFor={item.id}>
          {item.text}
        </label>
      </div>
      <Button text="Delete" type="outlined" onClick={() => deleteItem(item.id)} />
    </li>
  )
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  markAsDone: PropTypes.func,
  deleteItem: PropTypes.func
}

export default ListItem