import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"
  
export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const client = useStreamVideoClient();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      setIsLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "state.starts_at", direction: 1 }],
          filter_conditions: {
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        console.log("Fetched calls:", calls);
        setCalls(calls);
      } catch (error) {
        console.error("Query error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls.filter((call) => {
    const { starts_at, ended_at } = call.state;
    return (starts_at && new Date(starts_at) < now) || !!ended_at;
  });

  const upcomingCalls = calls.filter((call) => {
    const { starts_at } = call.state;
    return starts_at && new Date(starts_at) > now;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading,
  };
};
