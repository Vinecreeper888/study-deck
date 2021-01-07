import React from 'react';
import {destroyCard} from '../services/cardService'
import {CardForm} from './CardForm';

export function CardPreview({onRemove, onUpdate, ...card}) {
    const [isEditMode, setIsEditMode] = React.useState(false);
    function handleToggleEdit() {
        setIsEditMode(current => !current)
    }
    return isEditMode ? (
        <CardForm onCancel={handleToggleEdit} onSave={onUpdate} card={card}/>
    ) : (
        <View {...card} onEdit={handleToggleEdit} onRemove={onRemove}/>
    )
}

export function View({id,term,definition, onEdit, onRemove}) {
    const [isFront, setIsFront] = React.useState(true)
    
    function handleCardFlip() {
        setIsFront(current => !current);
    }

    function handleDelete() {
        const confirm = window.confirm(`Are you sure you wish to delete "${term}"`)
        if(confirm) {
            destroyCard(id).then(() => {
                onRemove && 
                    typeof onRemove === 'function' &&
                    onRemove(id)
            })
        }
    }

    return(
        <div className={`tile ${isFront ? '' : 'back'}`}>
            {/* contain all flashcards */}
            <h4 className="cardTerm">{isFront ? term: definition}</h4>
            <div className="cardButtons">
              <button type="button" className="tertiary" onClick={handleCardFlip}>{isFront ? 'Show Back' : 'Show Front'}</button>
              <div>
                <button type="button" className="secondary" onClick={onEdit}>Edit</button>
                <button type="button" className="secondary danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
    );
};