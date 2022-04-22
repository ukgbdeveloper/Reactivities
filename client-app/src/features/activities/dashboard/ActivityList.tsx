import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";

import {Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {groupActivities} = activityStore;
    return (
        <>
            {groupActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>

                {activities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity}/>
                ))}
                </Fragment>
            ))}
        </>
    )
})