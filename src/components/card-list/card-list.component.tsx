import { Monster } from '../../App';
import { v4 as uuidv4 } from 'uuid';

import CardItem from '../card-item/card-item.component';

import './card-list.styles.css';

type CardListProps = {
    monsters: Monster[];
}

const CardList = ({ monsters }: CardListProps) => {
    console.log('monsters',monsters);
    return(
        <div className='card-list'>
            {
                monsters.map((monster) => {
                    return <CardItem key={uuidv4()} monster={monster} />
                })
            }
        </div>
    )
}

export default CardList;