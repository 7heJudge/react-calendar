import {Calendar} from "antd";
import {Moment} from "moment";
import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";
import {formatDate} from "../utils/date";

interface Props {
    events: IEvent[];
}

const EventCalendar = (props: Props) => {
    const {user} = useTypedSelector(state => state.auth);
    const dateCellRender = (value: Moment) => {
        const formattedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(event => event.date === formattedDate).map(event => ({
            value: event,
            color: user.username === event.author ? 'green' : 'gray'
        }))
        return (
            <div>
                {currentDayEvents.map((event, index) =>
                    <div key={index}
                         style={{backgroundColor: event.color, borderRadius: '10px', padding: '5px 10px'}}>
                        {event.value.description}
                    </div>)}
            </div>
        );
    };

    return (
        <div>
            <Calendar dateCellRender={dateCellRender}/>
        </div>
    );
};

export default EventCalendar;
