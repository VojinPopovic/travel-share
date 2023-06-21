import CloseModal from "../../../public/closeModalImage.svg";

export default function CreatePost({ setRenderPost }) {
  function closeModal() {
    setRenderPost(false);
  }
  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.7)] _text-color"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        class="w-[60vw] aspect-square fixed mx-auto my-auto left-0 right-0 top-0 bottom-0 py-6 px-6 flex flex-col justify-center"
      >
        <div class="relative py-3">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-2xl font-semibold">Make a new post</h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div class="relative">
                    <input
                      autocomplete="off"
                      name="title"
                      type="text"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      for="title"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Title
                    </label>
                  </div>
                  <div class="relative">
                    <input
                      autocomplete="off"
                      name="content"
                      type="password"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      for="content"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Content
                    </label>
                  </div>
                  <div class="relative">
                    <button class="_accent-color-bg text-white rounded-md px-2 py-1">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
