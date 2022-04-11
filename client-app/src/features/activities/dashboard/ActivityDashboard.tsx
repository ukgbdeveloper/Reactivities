import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityForm from '../form/ActivityForm';
import ActivityDetails from './ActivityDetails';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard() {
        const {activityStore} = useStore();
        const {selectedActivity, editMode} = activityStore;

        useEffect(() => {
          activityStore.loadActivities()
        },[activityStore]);
      
      
        if (activityStore.loadingInitial) return <LoadingComponents content="Loading..." />;
      
    return (
        <Grid>
            <Grid.Column width='10'>
            <ActivityList/>
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