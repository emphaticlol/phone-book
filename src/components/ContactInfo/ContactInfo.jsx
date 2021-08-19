import React, { useEffect, useState } from 'react';
import notfound from "./placeholder.png";
import styles from "./ContactInfo.module.css";
import cn from "classnames";


export const ContactInfo = ({contactInfo,index, edited , fixed}) =>{

  // state for Edit button
  const [disabled, setDisable] = useState(true);
  // inputs State
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // render elements after get Props from ContactList
  useEffect(() => {
    setPhone(contactInfo.phone);
    setEmail(contactInfo.email);
    setUsername(contactInfo.username);
  }, [contactInfo]);

  // save Form data to localStorage
  const handleSubmit = (e) =>{
    e.preventDefault();
    let formData = new FormData(e.target);
      let localObject = JSON.parse(localStorage.getItem('contacts'));
             for (let [key, value] of formData.entries()) {
               localObject[index][key] = value;
                localStorage.setItem('contacts', JSON.stringify(localObject))
            }
       handlEditing();
       edited(true);
  }
  // change disable attributes for inputs
  const handlEditing = () =>{
    setDisable(!disabled)
  }
  // if contactInfo empty don't render component
  if (!contactInfo){
    return null
  }
   return (
     <>
       <div className={cn(styles.profile)}>
         <img
           className={cn(styles.img)}
           src={contactInfo.avatar}
           onError={(e) => {
             e.currentTarget.src = notfound;
           }}
         />
         <h3 className={cn(styles.name)}>{contactInfo.name}</h3>
       </div>
       <form onSubmit={handleSubmit} className={cn(styles.form)}>
         <label className={cn(styles.label)}>
           <span>E-mail</span>
           <input
             type="text"
             name="email"
             value={email || ""}
             onChange={(e) => setEmail(e.target.value)}
             disabled={disabled}
             className={cn(styles.input, {
               [styles.input__enable]: disabled == false,
             })}
           />
         </label>

         <label className={cn(styles.label)}>
           <span>Phone</span>
           <input
             type="text"
             name="phone"
             value={phone || ""}
             onChange={(e) => setPhone(e.target.value)}
             disabled={disabled}
             className={cn(styles.input, {
               [styles.input__enable]: disabled == false,
             })}
           />
         </label>
         <label className={cn(styles.label)}>
           <span>Username</span>
           <input
             type="text"
             name="username"
             value={username || ""}
             onChange={(e) => setUsername(e.target.value)}
             disabled={disabled}
             className={cn(styles.input, {
               [styles.input__enable]: disabled == false,
             })}
           />
         </label>
         <button
           className={cn(styles.save, {
             [styles.enable]: disabled == false,
           })}
         >
           Save
         </button>
       </form>
       <button className={cn(styles.edit)} onClick={handlEditing}>
         Edit
       </button>
       <button
         onClick={() => {
           fixed(false);
           handlEditing();
         }}
         className={cn(styles.back)}
       >
         ← Back
       </button>
     </>
   );
}