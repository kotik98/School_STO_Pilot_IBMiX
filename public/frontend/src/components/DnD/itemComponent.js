import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './dnd_style.css';

function Item({item, index}) {

  const counting_stars = () => {
    let arr = [];
    for (let i = 0; i < (-1) * index + 5; i++)
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
              <div className={'sub_block unselectable ' + item.style}>
                <pre className={'category_title'} style={item.font ? {color: item.font} : {color: 'black'}}>{item.name}</pre>
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