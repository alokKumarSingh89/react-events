import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../types/profile";
import { useState } from "react";
interface IProps{
    profile: Profile;
}
export default function ProfileAbout({profile}:IProps) {
    const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
                <Header floated="left" icon="user" content={`About ${profile.displayName}`}/>
                <Button floated="right" basic content={editMode? 'Cancel':'Edit Profile'}
                onClick={()=>{setEditMode(!editMode)}}/>
            </Grid.Column>
            <Grid.Column width={16}>
                {editMode?<p>Profile form</p>:(<>
                <div style={{marginBottom:10}}>
                    <strong>Member since: {profile.createAt}</strong>
                    <div style={{marginTop:10}}>{profile.description}</div>
                </div>
                </>)}
            </Grid.Column>
        </Grid>
    </Tab.Pane>
  )
}