import { useEffect, useState } from "react";
import { getSwappableEvents } from "../api/events";
import EventCard from "../components/myCalendar/eventCard";
import { Calendar, Loader2 } from "lucide-react";
import { postRequest } from "../api/requests";
import { useAppSelector } from "../hooks/useRedux";
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

function MarketPlace() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [isRequesting, setIsRequesting] = useState("");
  const { userId } = useAppSelector((state) => state.auth);
  const getEvents = async () => {
    try {
      setLoadingEvents(true);
      const data = await getSwappableEvents();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (err) {
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleRequest = async (event: Event) => {
    try {
      console.log({
        from: userId,
        to: event.createdBy._id,
        event: event._id,
      });
      setIsRequesting(event._id);
      const data = await postRequest({
        from: userId,
        to: event.createdBy._id,
        event: event._id,
      });

      if (data.success) {
        toast.success("Request send successfully!");
      }
    } catch (err) {
    } finally {
      setIsRequesting("");
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="p-6">
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventCard
            key={`${event._id}-${index}`}
            event={event as Event}
            onRequest={() => {
              handleRequest(event);
            }}
            showRequestButton={true}
            showOptions={false}
            isRequesting={isRequesting}
          />
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && !loadingEvents && (
        <div className="text-center py-16 flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-100 to-purple-100 mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No events to Swap
          </h3>
        </div>
      )}
    </div>
  );
}

export default MarketPlace;
