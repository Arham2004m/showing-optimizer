'use server';

import { createClient } from '@supabase/supabase-js';
import * as ics from 'ics';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // We use anon key. Make sure RLS allows inserts if testing without auth.
const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveTourAction(formData: any, itinerary: any[], waypoints: any[]) {
  try {
    // 1. Insert Tour
    const { data: tourData, error: tourError } = await supabase
      .from('tours')
      .insert({
        start_address: formData.startAddress,
        tour_date: formData.date || new Date().toISOString().split('T')[0],
        start_time: formData.startTime || '09:00',
        end_time: formData.endTime || '17:00',
        // Optional fields if provided:
        // client_email: formData.clientEmail,
      })
      .select('id')
      .single();

    if (tourError) throw new Error(`Tour insert error: ${tourError.message}`);
    const tourId = tourData.id;

    // 2. Insert Tour Stops
    const stopsToInsert = itinerary.map((stop: any, index: number) => {
      // Find waypoint coordinate for this stop (waypoints includes start address at index 0)
      const coord = waypoints[index];
      
      // We need scheduled_time as timestamp. Combine date and arrival time.
      let scheduledTime = null;
      if (formData.date && stop.arrivalTime) {
        // Simple parsing of "09:00 AM" format
        const timeParts = stop.arrivalTime.match(/(\d+):(\d+) (AM|PM)/i);
        if (timeParts) {
          let hours = parseInt(timeParts[1], 10);
          const minutes = parseInt(timeParts[2], 10);
          const ampm = timeParts[3].toUpperCase();
          if (ampm === 'PM' && hours < 12) hours += 12;
          if (ampm === 'AM' && hours === 12) hours = 0;
          
          const dateObj = new Date(formData.date);
          dateObj.setHours(hours, minutes, 0, 0);
          scheduledTime = dateObj.toISOString();
        } else {
          // If format is like "09:00"
          const [h, m] = stop.arrivalTime.split(':');
          const dateObj = new Date(formData.date);
          dateObj.setHours(parseInt(h), parseInt(m), 0, 0);
          scheduledTime = dateObj.toISOString();
        }
      }

      return {
        tour_id: tourId,
        stop_order: index + 1,
        address: stop.address,
        latlng: coord ? `(${coord[1]},${coord[0]})` : null, // Assuming format for Postgres point is (lat,lng)
        scheduled_time: scheduledTime,
      };
    });

    const { error: stopsError } = await supabase
      .from('tour_stops')
      .insert(stopsToInsert);

    if (stopsError) throw new Error(`Stops insert error: ${stopsError.message}`);

    // 3. Generate ICS File
    const events: ics.EventAttributes[] = itinerary.filter(s => !s.isStart).map((stop: any, index: number) => {
      // Calculate start time
      let startYear = new Date().getFullYear();
      let startMonth = new Date().getMonth() + 1;
      let startDay = new Date().getDate();
      let startHour = 9;
      let startMinute = 0;

      if (formData.date && stop.arrivalTime) {
        const dateObj = new Date(formData.date);
        startYear = dateObj.getFullYear();
        startMonth = dateObj.getMonth() + 1;
        startDay = dateObj.getDate();

        const timeParts = stop.arrivalTime.match(/(\d+):(\d+)\s?(AM|PM)?/i);
        if (timeParts) {
          let h = parseInt(timeParts[1], 10);
          const m = parseInt(timeParts[2], 10);
          const ampm = timeParts[3]?.toUpperCase();
          if (ampm === 'PM' && h < 12) h += 12;
          if (ampm === 'AM' && h === 12) h = 0;
          startHour = h;
          startMinute = m;
        }
      }

      return {
        title: `Showing: ${stop.address}`,
        start: [startYear, startMonth, startDay, startHour, startMinute],
        duration: { minutes: 30 },
        description: `View full itinerary: http://localhost:3000/tour/${tourId}`,
        location: stop.address,
        status: 'CONFIRMED'
      };
    });

    return new Promise((resolve, reject) => {
      ics.createEvents(events, (error, value) => {
        if (error) {
          reject(new Error(`ICS generation error: ${error.message}`));
          return;
        }
        resolve({
          success: true,
          tourId,
          icsData: value
        });
      });
    });

  } catch (err: any) {
    console.error("saveTourAction Error:", err);
    return { success: false, error: err.message };
  }
}
