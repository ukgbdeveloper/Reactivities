import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { Formik , Form} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";


export default observer(function ActivityForm(key) {
    const {activityStore} = useStore();
    const {loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();
    const [activity, setActivity] = useState({
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required('The activity category is required'),
        date: Yup.string().required('The activity date is required'),
        city: Yup.string().required('The activity city is required'),
        venue: Yup.string().required('The activity venue is required')
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity,key]);

    // function handleSumbit() {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         };
    //         console.log("created");
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     } else {
    //         console.log("updated");
    //         updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value });
    // }

    if (loadingInitial) return <LoadingComponents content="Loading activity..."/>

    return (
        <Segment clearing>
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values => console.log(values)}>
                {({values: activity, handleChange, handleSubmit}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="title" placeholder="Title" />
                    <MyTextInput placeholder='Description' name='description' />
                    <MyTextInput placeholder='Category' name='category'/>
                    <MyTextInput placeholder='Date' name='date' />
                    <MyTextInput placeholder='City' name='city' />
                    <MyTextInput placeholder='Venue' name='venue' />
                    <Button loading={loading} floated='right' positive type="submit" content='Submit' />
                    <Button as={Link} to='/activities' floated='right' type="button" content='Cancel' />
                </Form>
                )}
            </Formik>
        </Segment>
    )
})