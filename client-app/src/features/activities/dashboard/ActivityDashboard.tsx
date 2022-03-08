import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityForm from '../form/ActivityForm';
import ActivityDetails from './ActivityDetails';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityDashboard({activities, 
    deleteActivity, submitting} : Props) {
        const {activityStore} = useStore();
        const {selectedActivity, editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
            <ActivityList submitting={submitting} activities={activities} 
            
            deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'> 
            {console.log('selectedActivity')}
            {console.log(selectedActivity)}
                {selectedActivity && !editMode &&
                <ActivityDetails /> }
                {editMode &&
                <ActivityForm/>}
            </Grid.Column>
        </Grid>
    )
})