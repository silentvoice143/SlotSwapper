import { useEffect, useState } from "react";

import {
  acceptRequest,
  getMySwapRequests,
  getSwapRequests,
  rejectRequest,
} from "../api/requests";
import { Clock, Loader2 } from "lucide-react";
import RequestTable from "../components/request/table";
import { toast } from "sonner";

export interface Request {
  _id: string;
  from: {
    name: string;
    avatar: string;
  };
  to: {
    name: string;
    avatar: string;
  };
  event: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    status: string;
  };
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

function Requests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const [respondedRequests, setRespondedRequests] = useState<Request[]>([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async (id: string) => {
    try {
      setIsUpdating(id);
      const data = await acceptRequest(id);

      if (data.success) {
        toast.success("Request accepted");

        setPendingRequests((prev) => {
          return prev.filter((req) => req._id !== id);
        });
        setRespondedRequests((prev) => [...prev, data.request]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept request");
    } finally {
      setIsUpdating("");
    }
  };

  const handleReject = async (id: string) => {
    try {
      setIsUpdating(id);
      const data = await rejectRequest(id);

      if (data.success) {
        toast.success("Request rejected");

        setPendingRequests((prev) => {
          return prev.filter((req) => req._id !== id);
        });
        setRespondedRequests((prev) => [...prev, data.request]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    } finally {
      setIsUpdating("");
    }
  };

  const getRequests = async () => {
    try {
      setIsLoading(true);
      const req_data = await getMySwapRequests("");
      const pend_data = await getSwapRequests("pending");
      const res_data = await getSwapRequests("accepted,rejected");
      if (pend_data.success) {
        setPendingRequests(pend_data.request);
      }
      if (res_data.success) {
        setRespondedRequests(res_data.request);
      }
      if (req_data.success) {
        setRequests(req_data.request);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className=" px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Swap Requests</h1>
          <p className="text-gray-600 mt-1">Manage your slot swap requests</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        {isLoading && (
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

        {/* Pending Requests */}
        {!isLoading && pendingRequests.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Clock size={20} className="text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Pending ({pendingRequests.length})
              </h2>
            </div>
            <RequestTable
              requests={pendingRequests}
              showActions={true}
              handleAccept={handleAccept}
              handleReject={handleReject}
              isUpdating={isUpdating}
            />
          </div>
        )}

        {/* Responded Requests */}
        {!isLoading && respondedRequests.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Previous Requests
            </h2>
            <RequestTable requests={respondedRequests} showActions={false} />
          </div>
        )}

        {/*My request */}
        {!isLoading && requests.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Requests</h2>
            </div>
            <RequestTable
              requests={requests}
              showActions={false}
              owned={true}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading &&
          pendingRequests.length === 0 &&
          respondedRequests.length === 0 &&
          requests.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No requests yet
              </h3>
              <p className="text-gray-600">
                When someone requests to swap a slot with you, it will appear
                here
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default Requests;
