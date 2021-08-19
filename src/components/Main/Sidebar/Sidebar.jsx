import React from 'react';
import styles from "./Sidebar.module.css";
import cn from "classnames";

export const Sidebar = ({children}) =>{
   return <aside className={cn(styles.aside)}>
      {children}</aside>;
}