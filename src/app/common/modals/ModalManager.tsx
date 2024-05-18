import React from "react";
import { useAppSelector } from "../../store/store";
import LoginForm from "../../features/auth/LoginForm";
import RegisterForm from "../../features/auth/RegistrationForm";

export default function ModalManager() {
  const modalLookup = {
    LoginForm,
    RegisterForm,
  };
  const { type, data, open } = useAppSelector((state) => state.modals);
  let renderModal;

  if (open && type) {
    const ModalComopnent = (modalLookup as any)[type];
    renderModal = <ModalComopnent data={data} />;
  }
  return <span>{renderModal}</span>;
}
