import { ChangeEventHandler, ChangeEvent } from "react";// ChangeEvent is the event definition but ChangeEventHandler is the function definition
// so we can define our own function definition using ChangeEvent 

import "./search-box.styles.css";

type SearchBoxProps = {
  className: string;
  value: string;
  type: string;
  placeholder?: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>; //(event: ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ onChangeHandler, className, ...otherProps }: SearchBoxProps) => {
  return (
    <input
      className={`search-box ${className}`}
      onChange={onChangeHandler}
      {...otherProps}
    />
  );
};

export default SearchBox;
