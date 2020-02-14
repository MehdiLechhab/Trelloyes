import React, { Component } from 'react';
import './App.css';
import List from './List';
import STORE from './store';

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

class App extends Component {
  state = {
    store: STORE,
  
  };

  handleDeleteCard = (id) => {
    
    const newArr = this.state.store.lists.map((item) => {
      item.cardIds = item.cardIds.filter(currentId => currentId !== id
      )
      return item;
    })
    
    const newCards = omit(this.state.store.allCards, id)
    this.setState({
      store: {
        lists: newArr,
        allCards: newCards
      }
    })
  };

  handleAddCard = (id) => {
    console.log(this.state.store, "add card clicked")
    const newItem = newRandomCard()

    const newList = this.state.store.lists.map(list => {
      if(id === list.id) {
        list.cardIds.push(newItem.id)
      } 
      return list
    })

    console.log(newList)
    const newCards = this.state.store.allCards
    newCards[newItem.id] = newItem

    this.setState({
      store: {
        lists:newList,
        allCards:newCards
      }
    })
  }

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleDeleteCard={this.handleDeleteCard}
              handleAddCard={this.handleAddCard}
              id={list.id}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
