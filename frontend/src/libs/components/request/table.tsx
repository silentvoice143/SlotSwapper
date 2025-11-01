import { Check, Trash2 } from "lucide-react";
import { Button } from "@/libs/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/libs/components/ui/table";
import type { Request } from "@/libs/pages/requests";
import { formatDateTime } from "@/libs/utils/dateFormatter";
const RequestTable = ({
  requests,
  showActions,
  handleReject,
  handleAccept,
  isUpdating = "",
  owned = false,
}: {
  requests: Request[];
  showActions: boolean;
  handleAccept?: (id: string) => void;
  handleReject?: (id: string) => void;
  isUpdating?: string;
  owned?: boolean;
}) => (
  <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-gray-900">
            {owned ? "To" : "From"}
          </TableHead>
          <TableHead className="font-semibold text-gray-900">Event</TableHead>
          <TableHead className="font-semibold text-gray-900">
            Start Time
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            End Time
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            Requested
          </TableHead>
          <TableHead className="font-semibold text-gray-900">Status</TableHead>
          {showActions && (
            <TableHead className="font-semibold text-gray-900">
              Actions
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request._id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold">
                  {owned
                    ? request.to.name.slice(0)[0]
                    : request.from.name.slice(0)[0]}
                </div>
                <span className="font-medium text-gray-900">
                  {owned ? request.to.name : request.from.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-gray-900">{request.event.title}</span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 text-sm">
                {formatDateTime(request.event.startTime)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 text-sm">
                {formatDateTime(request.event.endTime)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 text-sm">
                {formatDateTime(request.createdAt)}
              </span>
            </TableCell>
            <TableCell>
              <div
                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === "pending"
                    ? "bg-yellow-50 text-yellow-700"
                    : request.status === "accepted"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {request.status.charAt(0).toUpperCase() +
                  request.status.slice(1)}
              </div>
            </TableCell>
            {showActions && (
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    disabled={isUpdating === request._id}
                    onClick={() => handleAccept && handleAccept(request._id)}
                    className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
                  >
                    <Check size={16} />
                    Accept
                  </Button>
                  <Button
                    disabled={isUpdating === request._id}
                    onClick={() => handleReject && handleReject(request._id)}
                    variant="outline"
                    className="border-2 border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-all hover:border-red-300 text-sm"
                  >
                    <Trash2 size={16} />
                    Decline
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default RequestTable;
