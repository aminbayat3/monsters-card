import { Monster } from '../../App';

import './card-item.styles.css';

type CardProps = {
    monster: Monster;
}

const CardItem = ({ monster:{ id, name, email } }: CardProps) => {
    return(
        <div className='card-item'>
            <img alt={`monster ${name}`} className='background' src={`https://robohash.org/${id}?set=set2&size=180x180`} />
            <h2>{name}</h2>
            <p>{`email : ${email}`}</p>
        </div>
    )
}

export default CardItem;