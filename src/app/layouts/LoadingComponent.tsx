import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
interface IProps {
  inverted?: boolean;
  content?: string;
}
export default function LoadingComponent({
  inverted,
  content = "Loading....",
}: IProps) {
  return (
    <Dimmer inverted={inverted} active>
      <Loader content={content} />
    </Dimmer>
  );
}
