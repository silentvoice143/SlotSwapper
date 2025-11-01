import { useEffect, useState } from "react";
import { Plus, Calendar, ArrowRightLeft, Loader2 } from "lucide-react";
import { Button } from "@/libs/components/ui/button";

import EventCard from "../components/myCalendar/eventCard";
import HorizontalCalendar from "../components/myCalendar/horizontalCalendar";
import CreateEventModal from "../components/myCalendar/modal/createEventModal";
import { changeEventStatus, getEventsByDate, postEvent } from "../api/events";
import { toast } from "sonner";

interface Event {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "busy" | "swappable";
  createdBy: { name: string; _id: string };
}

function MyCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getEvents = async () => {
    try {
      setLoadingEvents(true);
      const data = await getEventsByDate({ date: selectedDate });
      if (data.success) {
        setEvents(data.data);
      }
    } catch (err) {
    } finally {
      setLoadingEvents(false);
    }
  };

  const createEvent = async (event: any) => {
    try {
      setIsSaving(true);
      const data = await postEvent(event);
      if (data.success) {
        toast.success("Event created successfully");
      }
    } catch (err) {
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (eventId: string, status: string) => {
    try {
      setIsSaving(true);
      const data = await changeEventStatus(eventId, status);
      console.log(data, "----updated");

      if (data.success) {
        toast.success("Event updated successfully");

        // Update the event in state
        setEvents((prevEvents: any) =>
          prevEvents.map((event: Event) =>
            event._id === eventId ? { ...event, status } : event
          )
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update event");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [selectedDate]);

  return (
    <div className="min-h-screen w-full bg-gray-50 relative">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between pb-4">
          <div>
            <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              SlotSwapper
            </span>
          </div>
          <CreateEventModal
            trigger={
              <Button className="gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg">
                <Plus className="w-5 h-5" />
                Add Event
              </Button>
            }
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSubmit={createEvent}
            isSaving={isSaving}
          />
        </div>

        <div className="mb-4">
          <HorizontalCalendar
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
            }}
          />
        </div>

        {loadingEvents && (
          <div className="min-h-64 flex justify-center items-center flex-col gap-2">
            <Loader2
              className="animate-spin transition-200 text-blue-600"
              size={20}
            />
            <div>
              <h2 className="text-xl ml-2">Loading..</h2>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard
              key={`${event?._id}-${index}`}
              event={event as Event}
              onEditClick={() => {}}
              onStatusChange={(status) =>
                handleStatusChange(event?._id, status)
              }
            />
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && !loadingEvents && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-100 to-purple-100 mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No events yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first event
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCalendar;
