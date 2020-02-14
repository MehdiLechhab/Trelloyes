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


  handleAddCard = () => {
    console.log(this.state.store, "add card clicked")
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
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
