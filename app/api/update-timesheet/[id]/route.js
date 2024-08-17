// mainfolder/app/api/update-timesheet/[id]/route.js

import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';

export async function POST(req, { params }) {
  try {
    await connectMongo();

    const { id } = params;
    const { start, end } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Timesheet ID is required' }),
        { status: 400 }
      );
    }

    // Update the timesheet entry
    const timesheet = await Timesheet.findByIdAndUpdate(
      id,
      { start, end },
      { new: true }
    );

    if (!timesheet) {
      return new Response(JSON.stringify({ error: 'Timesheet not found' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: 'Timesheet updated successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating timesheet:', error);
    return new Response(JSON.stringify({ error: 'Error updating timesheet' }), {
      status: 500,
    });
  }
}
