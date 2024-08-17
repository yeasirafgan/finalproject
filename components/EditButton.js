'use client';

import { useRouter } from 'next/navigation';

const EditButton = ({ id }) => {
  const router = useRouter();

  const handleEdit = () => {
    // Redirect to the edit page with the timesheet ID
    router.push(`/admin/edit-timesheet/${id}`);
  };

  return (
    <button
      onClick={handleEdit}
      className='px-2 py-0.5 bg-blue-700 text-xs text-white rounded hover:bg-zinc-800 mr-2'
    >
      Edit
    </button>
  );
};

export default EditButton;
