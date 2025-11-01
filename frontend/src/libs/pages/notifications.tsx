import React, { useState } from "react";
import { Bell, Trash2, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/libs/components/ui/button";
import { Card, CardContent } from "@/libs/components/ui/card";
import { Badge } from "@/libs/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/libs/components/ui/alert-dialog";
import { formatTime } from "../utils/dateFormatter";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      _id: "1",
      title: "Swap Request Approved",
      message: "Your swap request with John for Nov 5 has been approved",
      read: false,
      createdAt: "2025-11-01T10:30:00Z",
    },
    {
      _id: "2",
      title: "New Swap Request",
      message: "Alice has requested to swap her slot on Nov 3",
      read: false,
      createdAt: "2025-11-01T09:15:00Z",
    },
    {
      _id: "3",
      title: "Schedule Updated",
      message: "Your schedule has been updated for the upcoming week",
      read: true,
      createdAt: "2025-10-31T14:20:00Z",
    },
    {
      _id: "4",
      title: "Reminder",
      message: "Team standup meeting in 30 minutes",
      read: true,
      createdAt: "2025-10-31T09:30:00Z",
    },
    {
      _id: "5",
      title: "Swap Request Declined",
      message: "Your swap request with Bob has been declined",
      read: true,
      createdAt: "2025-10-30T16:45:00Z",
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, read: false } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n._id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Bell className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-gray-600 mt-1">
                  You have {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Action Buttons */}
        {notifications.length > 0 && (
          <div className="flex gap-2 mb-6">
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="gap-2"
              >
                <CheckCircle size={18} />
                Mark all as read
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 size={18} />
                  Clear all
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All notifications will be
                  permanently deleted.
                </AlertDialogDescription>
                <div className="flex gap-3 justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearAll}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification._id}
                className={`transition-all ${
                  !notification.read
                    ? "bg-linear-to-r from-blue-50 to-purple-50 border-blue-200"
                    : "bg-white"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() =>
                        notification.read
                          ? markAsUnread(notification._id)
                          : markAsRead(notification._id)
                      }
                      className="mt-1 shrink-0 focus:outline-none"
                    >
                      {notification.read ? (
                        <CheckCircle
                          size={24}
                          className="text-gray-300 hover:text-gray-400"
                        />
                      ) : (
                        <Circle
                          size={24}
                          className="text-blue-600 hover:text-blue-700 fill-blue-600"
                        />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 shrink-0">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>
                          Delete notification?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                        <div className="flex gap-3 justify-end">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteNotification(notification._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Bell size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No notifications
              </h3>
              <p className="text-gray-600">
                You're all caught up! Check back later for new notifications.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Notifications;
