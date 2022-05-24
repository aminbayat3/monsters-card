import React from 'react';

import './search-box.styles.css';

const SearchBox = ({onChangeHandler, className, ...otherProps}) => {
    return(
        <input className={`search-box ${className}`} onChange={onChangeHandler} {...otherProps} />
    )
}

export default SearchBox;