import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import ModalWrapper from "../../common/modals/ModalWrapper";
import { Button, Form } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { closeModal } from "../../common/modals/modalSlice";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();
  function onSubmit(data: FieldValues) {
    console.log(data);
    dispatch(closeModal());
  }
  return (
    <ModalWrapper header="Sign into Event">
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          content="Login"
        />
      </Form>
    </ModalWrapper>
  );
}
