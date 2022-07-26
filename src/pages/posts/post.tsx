import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { useParams } from "umi";

export default function Page() {
  const params = useParams();
  const [post, setPost] = useState<any>();

  async function refresh() {
    try {
      const res = await fetch(`/api/posts/${params.postId}`);
      const post = await res.json();
      console.log(post.imageUrl === null, post.imageUrl === undefined);
      setPost(res.status === 200 ? post : null);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  if (post === null) {
    return (
      <div className="flex justify-center text-slate-700">
        Post with ID {params.postId} not found.
      </div>
    );
  }

  return (
    <div className="max-w-screen overflow-x-hidden flex justify-center">
      <div className="w-3/4">
        {post === undefined && (
          <div className="fixed w-screen h-screen flex justify-center items-center">
            <p className="animate-pulse">Loading...</p>
          </div>
        )}
        {post && (
          <>
            <div className="w-full flex justify-center">
              <div className="w-full flex flex-wrap justify-center items-center">
                <div className="w-full text-black text-xl opacity-60 flex justify-center">
                  {post.createdAt.split("T")[0]}
                </div>
                <div className="w-full text-black text-4xl font-bold flex justify-center">
                  {post.title}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center my-6">
              <div className="w-full container">
                {post.imageUrl !== null && (
                  <img
                    src={post.imageUrl}
                    className="w-full h-auto my-4 shadow-xl rounded"
                    alt=""
                  />
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(post.content),
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
