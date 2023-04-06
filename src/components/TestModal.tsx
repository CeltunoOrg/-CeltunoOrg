import React, { ReactNode } from "react";
import useModal from "./useModal";


interface ModalType {
  children?: ReactNode;
  isOpen3: boolean;
  toggle: () => void;
}

export default function TestModal(props: ModalType) {
  return (
    <>
     {/* <button onClick={props.isOpen3}>Toggle</button> */}
          {props.isOpen3 && (
        <div className="modal-overlay" >
          <div  className="modal-box">
            {props.children}
          </div>
        </div>
          )}
    </>
  );
}
