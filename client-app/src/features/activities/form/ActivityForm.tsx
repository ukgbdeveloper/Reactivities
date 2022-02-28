import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit} : Props) {

    const initialState = selectedActivity ?? {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
    }

    const [activity, setActivity] = useState(initialState);

    function handleSumbit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSumbit} autoComplete="off">
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description'  value={activity.description} name='Description' onChange={handleInputChange} />
                <Form.Input placeholder='Category'  value={activity.category} name='Category' onChange={handleInputChange} />
                <Form.Input placeholder='Date'  value={activity.date} name='Date' onChange={handleInputChange} />
                <Form.Input placeholder='City'  value={activity.city} name='City' onChange={handleInputChange} />
                <Form.Input placeholder='Venue'  value={activity.venue} name='Venue' onChange={handleInputChange} />
                <Button floated='right' positive type="submit" content='Submit' />
                <Button onClick={closeForm} floated='right' type="button" content='Cancel' />
            </Form>
        </Segment>
    )
}