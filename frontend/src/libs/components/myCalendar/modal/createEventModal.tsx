import { useState, useEffect } from "react";
import { Button } from "@/libs/components/ui/button";
import { Input } from "@/libs/components/ui/input";
import { Label } from "@/libs/components/ui/label";
import { Textarea } from "@/libs/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/libs/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/libs/components/ui/popover";
import { Calendar } from "@/libs/components/ui/calendar";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/libs/utils/utils";
import ReusableModal from "../../common/modal";
import { toUtcIso } from "@/libs/utils/dateFormatter";

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (eventData: {
    title: string;
    description: string;
    startTime: string; // ISO string format
    endTime: string; // ISO string format
    status: "busy" | "swappable";
  }) => void;
  initialDate?: Date;
  trigger?: React.ReactNode;
  isSaving?: boolean;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialDate,
  trigger,
  isSaving,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: initialDate || new Date(),
    startTime: "",
    endTime: "",
    status: "busy" as "busy" | "swappable",
  });

  const [errors, setErrors] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  // Update date when initialDate changes
  useEffect(() => {
    if (initialDate) {
      setFormData((prev) => ({ ...prev, date: initialDate }));
    }
  }, [initialDate]);

  const validateForm = () => {
    console.log(formData, "---formdata");
    const newErrors = {
      title: "",
      startTime: "",
      endTime: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      if (end <= start) {
        newErrors.endTime = "End time must be after start time";
      }
    }
    console.log(newErrors);

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const [startHours, startMinutes] = formData.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = formData.endTime.split(":").map(Number);

    // Combine date with times to create full datetime strings
    const startDateTime = set(formData.date, {
      hours: startHours,
      minutes: startMinutes,
      seconds: 0,
    });

    const endDateTime = set(formData.date, {
      hours: endHours,
      minutes: endMinutes,
      seconds: 0,
    });

    onSubmit({
      title: formData.title,
      description: formData.description,
      startTime: toUtcIso(startDateTime.toISOString()),
      endTime: toUtcIso(endDateTime.toISOString()),
      status: formData.status,
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      date: initialDate || new Date(),
      startTime: "",
      endTime: "",
      status: "busy",
    });
    setErrors({ title: "", startTime: "", endTime: "" });
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      date: initialDate || new Date(),
      startTime: "",
      endTime: "",
      status: "busy",
    });
    setErrors({ title: "", startTime: "", endTime: "" });
    onOpenChange(false);
  };

  return (
    <ReusableModal
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Event"
      description="Add a new event to your schedule. Fill in the details below."
      footerContent={
        <div className="w-full flex gap-4">
          <Button className="flex-1" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            disabled={isSaving}
            onClick={handleSubmit}
            className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSaving ? "Saving..." : "Create Event"}
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 py-4">
        {/* Title */}
        <div className="grid gap-2">
          <Label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter event title"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter event description"
            rows={3}
          />
        </div>

        {/* Date Picker */}
        <div className="grid gap-2">
          <Label>
            Date <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? (
                  format(formData.date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  date && setFormData({ ...formData, date });
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div className="grid grid-cols-2 gap-4">
          {/* Start Time */}

          <div className="flex flex-col gap-3">
            <Label htmlFor="startTime">
              Start Time <span className="text-red-500">*</span>
            </Label>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              type="time"
              id="time-picker"
              step={60}
              defaultValue="10:30:00"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            {errors.startTime && (
              <p className="text-sm text-red-500">{errors.startTime}</p>
            )}
          </div>

          {/* End Time */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="startTime">
              End Time <span className="text-red-500">*</span>
            </Label>
            <Input
              onChange={(e) => {
                console.log(e.target.value);
                setFormData({ ...formData, endTime: e.target.value });
              }}
              type="time"
              id="time-picker"
              step={60}
              defaultValue="10:30:00"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            {errors.startTime && (
              <p className="text-sm text-red-500">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="grid gap-2">
          <Label htmlFor="status">
            Status <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value: "busy" | "swappable") =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="swappable">Swappable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </ReusableModal>
  );
};

export default CreateEventModal;
