import { Tab } from "semantic-ui-react";
import ProfileAbout from "./ProfileAbout";
import { Profile } from "../../types/profile";
interface IProps{
  profile:Profile
}
export default function ProfileContent({profile}: IProps) {
  const panes = [
    {
      menuItem: "About",
      render: () => <ProfileAbout profile={profile}/>,
    },
    {
      menuItem: "Photo",
      render: () => <Tab.Pane>Photo</Tab.Pane>,
    },
    {
      menuItem: "Events",
      render: () => <Tab.Pane>Event</Tab.Pane>,
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followes</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following</Tab.Pane>,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}
