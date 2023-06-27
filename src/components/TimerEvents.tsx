"use client";

import { TimerEvent } from "@prisma/client";
import React, { cache, use, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const getTimerEvents = cache(() => 
    fetch("http://localhost:3000/api/timerevents")
        .then((res) => res.json())
        .catch((error: Error) => console.log('Failed to fetch events', error))
)

const deleteTimerEvent = cache((id: string) =>
    fetch(`http://localhost:3000/api/timerevent/${ id }`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch((error: Error) => console.log('Failed to delete event: ', error))
)

export default function TimerEvents() {
    let timerEvents = use<TimerEvent[]>(getTimerEvents());

    const [list, setList] = useState<TimerEvent[]>(timerEvents);

    const handleDelete = async (id: TimerEvent["id"]) => {
        try {
            let timerEvent = await deleteTimerEvent(`${id}`);
            if (!timerEvent) throw new Error("Failed to delete event");

            setList(list.filter((timerEvent) => timerEvent.id !== id));
        }
        catch (e: any) {
            console.log((e as Error).message);
        }
    }

    return (
        <div>
            { list.length } Events
            <br />
            <br />
            <div className="grid">
                { list.map((timerEvent) => (
                    <div key = { timerEvent.id }>
                        <CountdownTimer
                            event = {{
                                id: timerEvent.id,
                                title: timerEvent.title,
                                startDateTime: timerEvent.timestamp as unknown as string,
                                timezone: timerEvent.timezone
                            }}
                        />
                        <h2>{ timerEvent.title }</h2>
                        <button onClick={ () => handleDelete(timerEvent.id) }>
                            Delete
                        </button>
                        <br />
                        <br />
                    </div>
                ))}
            </div>
        </div>
    )
}