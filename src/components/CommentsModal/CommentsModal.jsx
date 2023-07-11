"use client";

import Comment from "../Comment/Comment";
import { CreatePostComment } from "../CreatePostComment/CreatePostComment";
import useSWR from "swr";
import PartialLoading from "../PartialLoading/PartialLoading";

export default function CommentsModal({ setIsModalOpen, id, session }) {
  function closeModal() {
    setIsModalOpen(false);
  }

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data,
    isLoading,
    mutate: mutatePostComments,
  } = useSWR(`/api/comments/post/id?id=${id}`, fetcher);

  function reloadData() {
    mutatePostComments();
  }

  async function makeComment(e) {
    e.preventDefault();
    const comment = e.target[0].value;
    CreatePostComment(comment, id, session);
    e.target.reset();
    setTimeout(() => {
      reloadData();
    }, "1000");
  }

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 min-h-screen w-full bg-gray-100 flex flex-col justify-center z-10 overflow-y-scroll"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-[600px] mx-auto"
      >
        <div className="relative px-2 sm:px-4 py-2 sm:py-4 sm:py-8 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10 max-h-[80vh] overflow-y-auto">
          <div className="mx-auto sm:px-5">
            <div className="mt-2 sm:mt-5 flex">
              <p className="_text-color text-2xl font-semibold mb-2 sm:mb-4">
                Comments
              </p>
            </div>
            <form onSubmit={makeComment} className="divide-y divide-gray-200">
              <div className="flex flex-col">
                <label className="leading-loose _text-color">
                  Post a comment
                </label>
                <textarea
                  type="text"
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Write something..."
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
            <div>
              {isLoading ? (
                <PartialLoading />
              ) : (
                data
                  ?.slice()
                  .reverse()
                  .map((postComment) => {
                    return (
                      <Comment
                        key={postComment._id}
                        post={postComment}
                        profileEmail={postComment.commentmaker}
                        reloadData={reloadData}
                        route={"post"}
                      />
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
