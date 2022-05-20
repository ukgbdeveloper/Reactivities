import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../../app/layout/LoadingComponents";
import { useStore } from "../../../../app/stores/store";
import ActivityDetailedChats from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial, clearSelectedActivity
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
    return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);

  if (loadingInitial || !activity) return <LoadingComponents />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChats activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSideBar activity={activity} />
      </Grid.Column>
    </Grid>
  );
});
