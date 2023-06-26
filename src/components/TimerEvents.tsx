"use client";

import { TimerEvent } from "@prisma/client";
import React, { cache, use } from "react";
import CountdownTimer from "./CountdownTimer";

const getTimerEvents = cache(() => 
    fetch("http://localhost:3000/api/timerevents")
        .then((res) => res.json())
)

export default function TimerEvents() {
    let timerEvents = use<TimerEvent[]>(getTimerEvents());

    return (
        <div>
            { timerEvents.length } Events
            <div className="grid">
                { timerEvents.map((timerEvent, index) => (
                    <div>
                        
                        <CountdownTimer
                            event = {{
                                id: timerEvent.id,
                                title: timerEvent.title,
                                startDateTime: timerEvent.timestamp as unknown as string,
                                timezone: "America/New_York"
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}