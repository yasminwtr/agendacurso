"use client";
import { useEffect, useState } from 'react';
import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { useDisclosure, Spinner } from "@nextui-org/react";
import { createViewDay, createViewWeek } from '@schedule-x/calendar';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import useEvents from '@/app/hooks/useEvents';
import ScheduleModal from '@/app/components/ScheduleModal';
import PagesLayout from '@/app/components/PagesLayout';
import withAuth from "@/app/auth/withAuth";

const eventsServicePlugin = createEventsServicePlugin();
const calendarControls = createCalendarControlsPlugin();

function Agenda() {
    const { events, loading, fetchEvents, getEventById } = useEvents();
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
    const [event, setEvent] = useState(null);

    const formattedEvents = events.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        location: event.roomName,
    }));

    const calendar = useNextCalendarApp({
        views: [createViewDay(), createViewWeek()],
        plugins: [eventsServicePlugin, calendarControls],
        locale: "pt-BR",
        dayBoundaries: {
            start: '04:00',
            end: '23:00',
        },
        weekOptions: {
            gridHeight: 1500,
            timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },
        },
        callbacks: {
            onEventClick: async (calendarEvent) => {
                const data = await getEventById(calendarEvent.id);
                setEvent(data);
                onOpen();
                document.body.style.cursor = 'default';
            },
        },
    });

    useEffect(() => {
        eventsServicePlugin.set(formattedEvents);
    }, [formattedEvents]);

    useEffect(() => {
        if (!isOpen) setEvent(null);
    }, [isOpen]);

    return (
        <PagesLayout>
            <h1>Agenda</h1>

            {loading ? (
                <div className="spinner-calendar"><Spinner /></div>
            ) : (
                <>
                    <ScheduleModal fetchEvents={fetchEvents} isOpen={isOpen} onClose={onClose} onOpen={onOpen} onOpenChange={onOpenChange} event={event} />
                    <ScheduleXCalendar calendarApp={calendar} />
                </>
            )}
        </PagesLayout>
    );
}

export default withAuth(Agenda);
