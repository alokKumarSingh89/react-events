import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import ModalWrapper from "../../common/modals/ModalWrapper";
import { Button, Form } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { closeModal } from "../../common/modals/modalSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useFirestore } from "../../hooks/firestore/useFirestore";
import { Timestamp } from "firebase/firestore";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();
  const { set } = useFirestore("profiles");
  async function onSubmit(data: FieldValues) {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCred.user, {
        displayName: data.displayName,
      });
      await set(userCred.user.uid, {
        displayName: data.displayName,
        email: data.email,
        createAt: Timestamp.now(),
      });
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ModalWrapper header="Register into Event">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          defaultValue=""
          placeholder="Display name"
          {...register("displayName", { required: "DisplayName is Required" })}
          error={errors.displayName?.message}
        />
        <Form.Input
          defaultValue=""
          placeholder="Email Address"
          {...register("email", {
            required: "Email is Required",
            pattern: /^[\w-\.]+@/,
          })}
          error={
            errors.email?.message ||
            (errors.email?.type == "pattern" && "Not Valid Email")
          }
        />
        <Form.Input
          type="password"
          defaultValue=""
          placeholder="Password"
          {...register("password", { required: "Password is Required" })}
          error={errors.password?.message}
        />
        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Register"
        />
      </Form>
    </ModalWrapper>
  );
}
