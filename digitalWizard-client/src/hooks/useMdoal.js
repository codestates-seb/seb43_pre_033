import { useState } from "react";

export default function useModal(initvalue) {
  const [modal, setModal] = useState(initvalue);
  const openModal = () => {
    setModal(true);
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };
  const closeModal = () => {
    setModal(false);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  return [modal, openModal, closeModal];
}
