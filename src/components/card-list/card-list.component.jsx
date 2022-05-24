import React from 'react';

import CardItem from '../card-item/card-item.component';

import './card-list.styles.css';

const CardList = ({ monsters }) => {
    return(
        <div className='card-list'>
            {
                monsters.map((monster) => {
                    return <CardItem key={monster.id} monster={monster} />
                })
            }
        </div>
    )
}

export default CardList;