import React, { useState } from 'react'
import Button from '../Button/Button'
import FilterButton from './FilterButton'
import Heading from './Heading'
import ListItem from './ListItem'
import './TodoList.css'

function TodoList () {
  const [list, setList] = useState([])
  const [filter, setFilter] = useState('Tutti')
  const [inputVal, setInputVal] = useState('')

  const filteringMap = {
    Tutti: () => true,
    Attivi: item => !item.completed,
    Completati: item => item.completed
  }

  const filterName = Object.keys(filteringMap)

  const updateInputVal = (e) => {
    setInputVal(e.target.value)
  }

  const addItem = () => {
    if (inputVal === '') return
    const id = `item-${list.length}`
    const item = { id, text: inputVal, completed: false }
    setList([...list, item])
    setInputVal('')
  }

  const markAsDone = (id) => {
    const updatedList = list.map(item => {
      if (id === item.id) {
        return { ...item, completed: !item.completed }
      }
      return item
    })

    setList(updatedList)
  }

  const deleteItem = (id) => {
    const updatedList = list.filter(item => id !== item.id)
    setList(updatedList)
  }

  return (
    <>
      <div className="input__wrapper">
        <input
          className="input"
          type="text"
          value={inputVal}
          onInput={updateInputVal}
          onKeyPress={(e) => { if (e.key === 'Enter') addItem() }}
        />
        <Button
          text="Add item"
          onClick={addItem}
        />
      </div>
      <div className="Button-wrapper">
        {filterName.map(filterName => {
          return (
            <FilterButton
              key={filterName}
              name={filterName}
              pressed={filterName === filter}
              setFilter={setFilter}
            />
          )
        }
        )}
      </div>
      <Heading
        list={list}
        filter={filter}
        filteringMap={filteringMap}
      />
      <ul className="list">
        {
          list
            .filter(filteringMap[filter])
            .map((item) => {
              return (
                <ListItem
                  item={item}
                  key={item.id}
                  markAsDone={markAsDone}
                  deleteItem={deleteItem}
                />
              )
            })
        }
      </ul>
    </>
  )
}

export default TodoList