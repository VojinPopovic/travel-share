import CloseModal from "../../../public/closeModalImage.svg";

export default function CreatePost({ setRenderPost }) {
  function closeModal() {
    setRenderPost(false);
  }
  return (
    <form
      onClick={closeModal}
      className="fixed top-0 left-0 min-h-screen w-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative py-3 sm:max-w-xl sm:mx-auto"
      >
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 _card-gradient rounded-full flex flex-shrink-0 justify-center items-center _text-color text-2xl font-mono">
                i
              </div>
              <div className="block pl-2 font-semibold text-xl self-start _text-color">
                <h2 className="leading-relaxed">Create a Post</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Say something interesting about the place you visited!
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 _text-color sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Post Title</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Event title"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Post Content</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Optional"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Image link</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Link"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button onClick={closeModal} className="flex justify-center items-center w-full _text-color px-4 py-3 rounded-md focus:outline-none">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="rgba(0,0,0,0.68)"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Cancel
                </button>
                <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none" type="submit">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
