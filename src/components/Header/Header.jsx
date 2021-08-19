import React from 'react';
import styles from "./Header.module.css";
import cn from 'classnames';


export const Header = () =>{
   return (
     <header className={cn(styles.header)}>
       <div className={cn(styles.logo)}>Contact Book</div>
     </header>
   );
}