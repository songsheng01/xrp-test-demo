import { useEffect, useRef, useState } from "react";

export default function useOrderFeed() {
  const [events, setEvents] = useState([]);
  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WS || "ws://localhost:5001");
    wsRef.current = ws;

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        setEvents((prev) => [...prev, data]);   // append
      } catch {

      }
    };

    return () => ws.close();
  }, []);

  return events;   // components choose how to filter/use it
}