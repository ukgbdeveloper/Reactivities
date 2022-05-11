import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { store } from "./store";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity : Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            a.date!.getTime() - b.date!.getTime());
    }

    get groupActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activites, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy')
                activites[date] = activites[date] ? [...activites[date], activity] : [activity];
                return activites;
            }, {} as {[key: string] : Activity[]})
        )
    }

    setLoadingState = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoadingInitial = (state:boolean) => {
        this.loadingInitial = state;
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
                activities.forEach(activity => {
                    this.setActivity(activity);
            });
            this.setLoadingState(false); 
        }catch (error) {
            console.log(error);
            this.setLoadingState(false);            
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity(activity: Activity) {
        const user = store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username
            )
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    createActivity =async (activity:Activity) => {
        this.loading = true;
        try {
            console.log('creating sending');
            await agent.Activities.create(activity);
            console.log('creating sent');
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        }catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}