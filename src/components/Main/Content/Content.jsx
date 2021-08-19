import React from 'react';
import styles from "./Content.module.css";
import cn from "classnames";

export const Content = ({children , popup}) =>{
   return <div className={cn(styles.content,{
      [styles.fixed]:popup == true
   })}>{children}</div>;
}