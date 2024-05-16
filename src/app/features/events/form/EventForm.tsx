import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { createEvent, updateEvent } from "../eventSlice";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { CategoryOptions } from "./categoryOptions";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
export default function EventForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  let { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((e) => e.id === id)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValue = event ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const onSubmit = (value: FieldValues) => {
    console.log(value);
    // id = id ?? Date.now().toString();
    // event
    //   ? dispatch(updateEvent({ ...event, ...values }))
    //   : dispatch(
    //       createEvent({
    //         ...values,
    //         id,
    //         hostedBy: "alok",
    //         attendees: [],
    //         hostPhotoURL: "",
    //       })
    //     );
    // navigate(`/events/${id}`);
  };

  return (
    <Segment clearing>
      <Header content="Event Detail" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          type="text"
          placeholder="Event Title"
          defaultValue={event?.title || ""}
          {...register("title", { required: " Title required" })}
          error={errors.title?.message}
        />
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          defaultValue={event?.category}
          render={({ field }) => (
            <Form.Select
              options={CategoryOptions}
              type="text"
              placeholder="Category"
              clearable
              {...field}
              onChange={(_, d) =>
                setValue("category", d.value, { shouldValidate: true })
              }
              error={errors.category?.message}
            />
          )}
        />

        <Form.TextArea
          type="text"
          placeholder="Description"
          defaultValue={event?.description || ""}
          {...register("description", { required: " Description required" })}
          error={errors.description?.message}
        />
        <Header content="Location" sub color="teal" />
        <Form.Input
          type="text"
          placeholder="City"
          defaultValue={event?.city || ""}
          {...register("city", { required: " City required" })}
          error={errors.city?.message}
        />
        <Form.Input
          type="text"
          placeholder="Venue"
          defaultValue={event?.venue || ""}
          {...register("venue", { required: " Venue required" })}
          error={errors.venue?.message}
        />
        <Form.Field>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            defaultValue={(event && new Date(event.date)) || null}
            render={({ field }) => (
              <ReactDatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue("date", value, { shouldValidate: true })
                }
                showTimeSelect
                timeCaption="time"
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="Event Date and time"
              />
            )}
          />
        </Form.Field>

        <Button
          disabled={!isValid}
          type="submit"
          floated="right"
          positive
          content="Submit"
        />
        <Button
          type="button"
          floated="right"
          content="Cancel"
          as={Link}
          to="/events"
        />
      </Form>
    </Segment>
  );
}
