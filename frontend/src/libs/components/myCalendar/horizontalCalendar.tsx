import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/libs/components/ui/button";
import { cn } from "@/libs/utils/utils";

interface HorizontalCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  events?: Date[];
}

const HorizontalCalendar: React.FC<HorizontalCalendarProps> = ({
  selectedDate,
  onDateSelect,
  events = [],
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      return new Date(year, month, i + 1);
    });
  };

  const days = getDaysInMonth(currentMonth);

  // Check if date has events
  const hasEvents = (date: Date) => {
    return events.some(
      (eventDate) => eventDate.toDateString() === date.toDateString()
    );
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Auto-scroll to selected date when month changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedIndex = days.findIndex((day) => isSelected(day));
      if (selectedIndex !== -1) {
        const buttonWidth = 64 + 12; // width + gap
        const scrollPosition = selectedIndex * buttonWidth - 150;
        scrollContainerRef.current.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }
    }
  }, [currentMonth]);

  return (
    <div className="space-y-4">
      {/* Month/Year Selector */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Button>

          <h2 className="text-xl font-semibold text-gray-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextMonth}
            className="hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Horizontal Date Scroll with Navigation */}
      <div className="bg-white rounded-2xl shadow-sm relative">
        {/* Left Arrow - Outside with linear fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-white to-transparent z-10 flex items-center justify-start pl-2 pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="bg-white shadow-lg hover:bg-gray-50 pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </Button>
        </div>

        {/* Scrollable Dates - Hidden Scrollbar */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden p-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-3 px-12">
            {days.map((day, index) => {
              const selected = isSelected(day);
              const hasEvent = hasEvents(day);
              const isTodayDate = isToday(day);

              return (
                <button
                  key={index}
                  onClick={() => onDateSelect(day)}
                  className={cn(
                    "shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all",
                    selected &&
                      "bg-linear-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-105",
                    !selected &&
                      isTodayDate &&
                      "bg-linear-to-br from-purple-100 to-blue-100 text-purple-700 border-2 border-purple-300 hover:border-purple-400",
                    !selected &&
                      !isTodayDate &&
                      "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-medium mb-1",
                      selected && "text-white",
                      !selected && isTodayDate && "text-purple-600",
                      !selected && !isTodayDate && "text-gray-500"
                    )}
                  >
                    {dayNames[day.getDay()]}
                  </span>
                  <span className="text-2xl font-bold mb-1">
                    {day.getDate()}
                  </span>
                  {hasEvent && (
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        selected && "bg-white",
                        !selected && isTodayDate && "bg-purple-600",
                        !selected && !isTodayDate && "bg-blue-500"
                      )}
                    />
                  )}
                </button>
              );
            })}
            <div className="w-10  h-2 shrink-0"></div>
          </div>
        </div>

        {/* Right Arrow - Outside with linear fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-white to-transparent z-10 flex items-center justify-end pr-2 pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="bg-white shadow-lg hover:bg-gray-50 pointer-events-auto"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCalendar;
