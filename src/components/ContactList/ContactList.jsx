import React, { useState, useEffect } from "react";
import notfound from "./placeholder.png";
import styles from "./ContactList.module.css";
import cn from "classnames";
import SearchIcon from "components/ContactList/SearchIcon";

export const ContactList = ({ contactItems, detailInfo, objId, editedInfo,fixed}) => {
  const [keyword, setKeyword] = useState("");
  const [filteredContacts, setFilteredContacts] = useState("");
  // get state from localStorage
  const [items, setItems] = useState(
   JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // if localStorage change re render component
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("contacts")));
  }, [editedInfo]);

  // filter state array by keyword from input
  useEffect(() => {
    if(items){
      setFilteredContacts(
        items.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }, [keyword, items]);

  // Fetch data from Api and save result in localStorage

  useEffect(() => {
    fetch("https://demo.sibers.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          localStorage.setItem("contacts", JSON.stringify(result));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  // Show error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Show message if data is loading
  else if (!isLoaded) {
    return <div>Downloading Data...</div>;
  }
  // render contacts list
  else {
    return (
      <>
        <div className={cn(styles.search__wrap)}>
          <input
            placeholder="Search..."
            className={cn(styles.search)}
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button className={cn(styles.search__button)}>
            <SearchIcon />
          </button>
        </div>
        <ul className={cn(styles.ul)}>
          {filteredContacts.map((contacts, index) => (
            <li
              className={cn(styles.li)}
              key={contacts.id}
              onClick={() => {
                detailInfo(contacts);
                objId(index);
                fixed(true)
              }}
            >
              <img
                className={cn(styles.img)}
                src={contacts.avatar}
                // if we don't get image from api use placeholder
                onError={(e) => {
                  e.currentTarget.src = notfound; 
                }}
              />
              <h4 className={cn(styles.name)}>{contacts.name}</h4>
              <span className={cn(styles.phone)}>{contacts.phone}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }
};
