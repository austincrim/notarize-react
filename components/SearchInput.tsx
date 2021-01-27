export default function SearchInput({ setSearchText }) {
  return (
    <>
      <label htmlFor='searchNotes' className='sr-only'>
        Search Notes
      </label>
      <input
        id='searchNotes'
        className='w-full p-2 bg-gray-100 rounded focus:ring'
        type='text'
        placeholder='Search...'
        onChange={(e) => setSearchText(e.target.value)}
      />
    </>
  );
}
