import React from 'react';
import './App.css';
import './normalize.css';
import {getCards} from './services/cardService';
import {CardList} from './components/CardList';
import {Router} from '@reach/router'
import {Practice} from './components/Practice';


function App() {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    getCards().then(setCards)
  }, [])
  function handleRemove(id) {
    setCards(existing => existing.filter(c => c.id !== id))
  }

  function handleAdd(card) {
    setCards(existing => [...existing, card])
  }

  function handleUpdate(card) {
    setCards(existing => existing.map(c => c.id === card.id ? card : c))
  }

  return (
    <div>
      <header>
        <h1>Study<span className="titleHighlight">Deck</span></h1>
        <h2>Retention through repitition</h2>
      </header>
      <main>
      <Router>
        <CardList
          path="/"
          cards={cards}
          onAdd={handleAdd} 
          onUpdate={handleUpdate} 
          onRemove={handleRemove}
        />
        <Practice path="/practice" cards={cards}/>
      </Router>
      </main>
    </div>
  );
}

export default App;
