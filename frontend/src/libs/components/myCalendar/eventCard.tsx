import {
  CalendarHeart,
  Clock,
  Edit,
  Lock,
  MoreVertical,
  Send,
  Shuffle,
  Trash2,
  User,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDateTime } from "@/libs/utils/dateFormatter";
import { Button } from "../ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    status: "busy" | "swappable";
    createdBy: { name: string; _id: string };
  };
  isRequesting?: string;
  showOptions?: boolean;
  onEditClick?: () => void;
  showRequestButton?: boolean;
  onRequest?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: "busy" | "swappable") => void;
}

function EventCard({
  event,
  isRequesting,
  onEditClick,
  showOptions = true,
  showRequestButton = false,
  onRequest,
  onDelete,
  onStatusChange,
}: EventCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleStatusChange = (newStatus: "busy" | "swappable") => {
    if (onStatusChange) {
      onStatusChange(newStatus);
      setMenuOpen(false);
    }
  };
  return (
    <Card
      key={event._id}
      className="hover:shadow-xl transition-all duration-300 border-gray-200 group"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
          <div className="flex flex-row gap-2">
            <Badge
              variant={event.status === "busy" ? "default" : "secondary"}
              className={
                event.status === "busy"
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }
            >
              {event.status}
            </Badge>
            {showOptions && (
              <Popover open={menuOpen} onOpenChange={setMenuOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="p-0 w-48 border border-gray-200 rounded-lg shadow-lg"
                >
                  <button
                    onClick={() => {
                      onEditClick?.();
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 border-b border-gray-100"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Event
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        event.status === "busy" ? "swappable" : "busy"
                      )
                    }
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 border-b border-gray-100"
                  >
                    {event.status === "busy" ? (
                      <>
                        <Shuffle className="w-4 h-4" />
                        Mark as Swappable
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Mark as Busy
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onDelete?.();
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Event
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <CardDescription className="text-gray-600">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100">
              <CalendarHeart className="w-4 h-4 text-blue-600" />
            </div>
            <span>{formatDateTime(event.startTime)}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <span>Until {formatDateTime(event.endTime)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-3 w-0 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-xs text-gray-500 truncate w-full hover:text-blue-500 cursor-pointer">
                {event.createdBy.name}
              </span>
            </div>
          </div>
          {showOptions && (
            <Button
              onClick={() =>
                handleStatusChange(
                  event.status === "busy" ? "swappable" : "busy"
                )
              }
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2"
            >
              <Send className="w-4 h-4" />
              {event.status === "busy" ? "Mark Swappable" : "Mark Busy"}
            </Button>
          )}
          {showRequestButton && (
            <Button
              onClick={onRequest}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2"
            >
              <Send className="w-4 h-4" />
              {isRequesting === event._id
                ? "Sending Request..."
                : "Request Swap"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard;
