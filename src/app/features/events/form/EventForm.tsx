import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { CategoryOptions } from "./categoryOptions";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFirestore } from "../../../hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "../eventSlice";
import LoadingComponent from "../../../layouts/LoadingComponent";
import { Event } from "../../../types/event";
export default function EventForm() {
  let { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.data.find((e) => e.id === id)
  );
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: async () => event,
  });

  const { status } = useAppSelector((state) => state.events);
  const { loadDocument, update, create } = useFirestore("events");
  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);
  const navigate = useNavigate();
  const updateEvent = async (data: FieldValues) => {
    if (!event) return;
    console.log(new Date(data.date));
    await update(event.id, {
      ...data,
      date: Timestamp.fromDate(new Date(data.date) as unknown as Date),
    });
  };
  const createEvent = async (data: FieldValues) => {
    const ref = await create({
      ...data,
      hostedBy: "Alok",
      attendees: [],
      hostPhotoURL: "",
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
    return ref;
  };
  const onSubmit = async (value: FieldValues) => {
    try {
      if (event) {
        await updateEvent({ ...event, ...value });
        navigate(`/events/${event.id}`);
      } else {
        const ref = await createEvent(value);
        navigate(`/events/${ref?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleToggleCancel = async (event: Event) => {
    await update(event.id, {
      isCancelled: !event.isCancelled,
    });
    toast.success(!event.isCancelled ? "Event cancelled" : "Event Activate");
  };
  if (status == "loading") return <LoadingComponent />;
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
        {event && (
          <Button
            content={event.isCancelled ? "Reactivet Event" : "Cancle Event"}
            floated="left"
            color={event.isCancelled ? "green" : "red"}
            onClick={() => handleToggleCancel(event)}
            type="button"
          />
        )}
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
