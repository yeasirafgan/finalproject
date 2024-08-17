//mainfolder/app/api/delete-timesheet/[id]/route.js
import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';

export async function POST(req, { params }) {
  try {
    await connectMongo();

    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Timesheet ID is required' }),
        { status: 400 }
      );
    }

    // Delete the timesheet entry
    await Timesheet.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: 'Timesheet deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting timesheet:', error);
    return new Response(JSON.stringify({ error: 'Error deleting timesheet' }), {
      status: 500,
    });
  }
}
