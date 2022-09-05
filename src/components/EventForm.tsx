import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {Moment} from "moment";
import React, {useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";
import {IUser} from "../models/IUser";
import {formatDate} from "../utils/date";
import {rules} from "../utils/rules";

interface Props {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm = (props: Props) => {
    const {user} = useTypedSelector(state => state.auth);

    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent);

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    };

    const submitForm = () => {
        props.submit({...event, author: user.username});
    };

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Description event"
                name="description"
                rules={[rules.required()]}
            >
                <Input value={event.description} onChange={e => setEvent({...event, description: e.target.value})}/>
            </Form.Item>
            <Form.Item
                label="Date event"
                name="date"
                rules={[rules.required(), rules.isDateAfter('Date can`t be before today')]}
            >
                <DatePicker onChange={date => selectDate(date)}/>
            </Form.Item>
            <Form.Item
                label="Choose guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username}
                                       value={guest.username}
                        >
                            {guest.username}
                        </Select.Option>)}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;
