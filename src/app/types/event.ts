export type Event = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  hostedBy: string;
  isCancelled: boolean;
  hostPhotoURL: string;
  attendees: Attendee[];
};

export type Attendee = {
  id: string;
  name: string;
  photoURL: string;
};
