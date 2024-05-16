import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../store/store";

const initialValue = {
  title: "",
  category: "",
  description: "",
  city: "",
  venue: "",
  date: "",
};
export default function EventForm() {
  const [values, setValues] = useState(initialValue);
  const { id } = useParams();
  const event = useAppSelector((store) =>
    store.events.events.find((evt) => evt.id === id)
  );
  useEffect(() => {
    if (event) {
      setValues(event as any);
    }
  }, [event]);
  const onSubmit = () => {
    console.log(values);
  };
  function handleInputChnage(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  return (
    <Segment clearing>
      <Header content={event ? "Update Event" : "Create Event"} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event Title"
            value={values.title}
            name="title"
            onChange={handleInputChnage}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            value={values.category}
            name="category"
            onChange={handleInputChnage}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleInputChnage}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="City"
            value={values.city}
            name="city"
            onChange={handleInputChnage}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            name="venue"
            value={values.venue}
            onChange={handleInputChnage}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={values.date}
            onChange={handleInputChnage}
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
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
