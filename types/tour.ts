export type Tour = {
  id: string;
  location_summary: string;
  start_address: string;
  tour_date: string;
  start_time: string;
  end_time: string;
  client_name: string;
  client_email?: string;
  created_at: string;
  status: "upcoming" | "completed" | "draft";
  stop_count: number;
};
