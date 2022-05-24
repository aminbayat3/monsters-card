import React from 'react';

import './card-item.styles.css';

const CardItem = ({ monster:{ id, name, email } }) => {
    return(
        <div className='card-item'>
            <img alt={`monster ${name}`} className='background' src={`https://robohash.org/${id}?set=set2&size=180x180`} />
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    )
}

export default CardItem;