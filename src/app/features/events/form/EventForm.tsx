import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
type Props = {
  setFormOpen: (open: boolean) => void;
};
const initialValue = {
  title: '',
  categoy: '',
  description:''
};
export default function EventForm({ setFormOpen }: Props) {
  const [value, setValue] = useState(initialValue);
  return (
    <Segment clearing>
      <Header content="Create Event" />
      <Form>
        <Form.Field>
          <input type="text" placeholder="Event Title" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Category" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Description" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="City" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Venue" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Date" />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="button"
          floated="right"
          content="Cancel"
          onClick={() => {
            setFormOpen(false);
          }}
        />
      </Form>
    </Segment>
  );
}
