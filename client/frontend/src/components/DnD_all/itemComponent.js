import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './dnd_style.css';

function Item({item, index, amount_of_stars}) {

  const counting_stars = () => {
    let arr = [];
    for (let i = 0; i < (-1) * index + amount_of_stars; i++)
      arr.push(<p className='rating_star'>&#9733;</p>);
    
    return arr;
  }

      return (
        <Draggable
        draggableId={item.name}
        index={index}
        >
          {provided => (
            <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
              <div className={'sub_block unselectable'} style={{backgroundColor: item.style}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <pre className={'category_title'} style={item.font ? {color: item.font} : {color: 'black'}}>{item.name}</pre>
                  {item.subtitle ? <pre className={'category_title'} style={item.font ? {color: item.font} : {color: 'black'}}>(6:00-22:00)</pre> : null}
                </div>
                <br />
                <div>
                  {counting_stars()}  
                </div>
              </div>
              <p className={'runa'}>&#x16E2;</p>
            </div>
          )}
        </Draggable>
      )
}

export default Item;