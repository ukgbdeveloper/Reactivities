import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityForm from '../form/ActivityForm';
import ActivityDetails from './ActivityDetails';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    selectedActivity: Activity | undefined;
    cancelSelectedActivity: () => void;
}

export default function ActivityDashboard({activities, 
    selectActivity, 
    selectedActivity, 
    cancelSelectedActivity} : Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && 
                <ActivityDetails activity={selectedActivity} 
                cancelSelectActivity={cancelSelectedActivity} /> }
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}