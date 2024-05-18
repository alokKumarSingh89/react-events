import { Tab } from "semantic-ui-react";

export default function ProfileContent() {
  const panes = [
    {
      menuItem: "About",
      render: () => <Tab.Pane>About User</Tab.Pane>,
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
