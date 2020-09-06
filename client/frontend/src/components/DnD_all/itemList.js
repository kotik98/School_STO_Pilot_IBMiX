import React, { useState } from 'react';
import Item from './itemComponent';
import './dnd_style.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

//Redux
import { useDispatch } from 'react-redux';
// END OF REDUX BlOCK

function ItemList({ data, dispatcher_func }) {
    const [wishes, setWishes] = useState(data); //useSelector(state => state.priority[0])
    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination ||
            (destination.droppableId === source.droppableId
                && destination.index === source.index)) return;

        const new_wishes = wishes;
        const element = new_wishes[source.index];

        new_wishes.splice(source.index, 1);
        new_wishes.splice(destination.index, 0, element);
        dispatch(dispatcher_func(new_wishes)); // Работает ли redux? В хранилище пишется, но при обновлении страницы все сбрасывается.
        setWishes(new_wishes);
    }

    return (
        <div className='block'>
            <div className={'prioritet_header_block'}>
                <p className={'prioritet_text'}>Приоритетно</p>
                <p className={'prioritet_text'}>Не приоритетно</p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>

                <Droppable droppableId={'droppable-1'} direction={'horizontal'}>
                    {provided => (
                        <div
                            className='droppable_box'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {wishes.map((item, index) => <Item item={item} index={index} key={item.name + '_sprestay'} amount_of_stars={wishes.length} />)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </DragDropContext>
        </div>);
}

export default ItemList;


