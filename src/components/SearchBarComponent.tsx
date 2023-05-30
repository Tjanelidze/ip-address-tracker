import React, { ChangeEvent, FormEvent } from 'react';

interface searchBarInterface {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  userInput: string;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBarComponent(props: searchBarInterface) {
  const { handleSubmit, userInput, handleInput } = props;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="locationInput"
          type="text"
          placeholder="Search for any IP address or domain"
          value={userInput}
          onChange={handleInput}
        />
        <button className="btn">
          <img src="./images/icon-arrow.svg" alt="arrow icon" />
        </button>
      </form>
    </>
  );
}
