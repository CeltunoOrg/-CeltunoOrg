// useModal.tsx

import { useState } from "react";

export default function useModal() {
  const [isOpen3, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen3);
  };

  return {
    isOpen3,
    toggle
  };
}
