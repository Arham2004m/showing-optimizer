import { Tour } from "../types/tour";

export const mockTours: Tour[] = [
  {
    id: "1",
    location_summary: "6 Homes in Beverly Hills",
    start_address: "123 Beverly Way, Beverly Hills",
    tour_date: new Date().toISOString().split('T')[0],
    start_time: "2:00 PM",
    end_time: "5:00 PM",
    client_name: "Eleanor Vance",
    created_at: new Date().toISOString(),
    status: "upcoming",
    stop_count: 6,
  },
  {
    id: "2",
    location_summary: "3 Homes on the Westside",
    start_address: "456 Ocean Ave, Santa Monica",
    tour_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    start_time: "9:00 AM",
    end_time: "11:30 AM",
    client_name: "Theodore Crain",
    created_at: new Date().toISOString(),
    status: "upcoming",
    stop_count: 3,
  },
  {
    id: "3",
    location_summary: "4 Homes in Silver Lake",
    start_address: "789 Sunset Blvd, Los Angeles",
    tour_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    start_time: "1:00 PM",
    end_time: "4:00 PM",
    client_name: "Shirley Crain",
    created_at: new Date().toISOString(),
    status: "draft",
    stop_count: 4,
  }
];
