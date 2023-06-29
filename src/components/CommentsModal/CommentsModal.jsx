export default function CommentsModal({ setIsModalOpen }) {
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 min-h-screen w-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12 z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full py-3 sm:max-w-xl sm:mx-auto"
      >
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="mt-5 flex">
              <p className="_text-color text-2xl font-semibold mb-4">
                Comments
              </p>
            </div>
            <form className="divide-y divide-gray-200">
              <div className="flex flex-col">
                <label className="leading-loose _text-color">
                  Post a comment
                </label>
                <textarea
                  type="text"
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Title"
                />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="mt-4 _accent-color-bg flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
