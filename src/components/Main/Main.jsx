import { ContactInfo } from "components/ContactInfo/ContactInfo";
import { ContactList } from "components/ContactList/ContactList";
import React, { useState } from "react";
import { Content } from "./Content/Content";
import { Sidebar } from "./Sidebar/Sidebar";
import styles from "./Main.module.css";
import cn from "classnames";

export const Main = ({ detailInfo, contactItems, objId, edited, fixed }) => {
  const [info, setInfo] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState("");
  const [fixation, setFixation] = useState("");

  // get props from state
  const detail = (data) => {
    setInfo(data);
  };
  const objectId = (data) => {
    setId(data);
  };
  const editedForce = (data) => {
    setEdit(data);
  };
  const mobile = (data) => {
    setFixation(!false);
  };
  const close = (data) => {
    setFixation(false);
  };

  return (
    <main className={cn(styles.main)}>
      <Sidebar>
        <ContactList
          fixed={mobile}
          detailInfo={detail}
          objId={objectId}
          editedInfo={edit}
        />
      </Sidebar>
      <Content popup={fixation} >
        <ContactInfo
          fixed={close}
          index={id}
          contactInfo={info}
          edited={editedForce}
        />
      </Content>
    </main>
  );
};
