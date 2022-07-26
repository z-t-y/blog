import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "umi";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>();
  const [totalPages, setTotalPages] = useState<number>();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? +(searchParams.get("page") as string)
    : 1;
  const navigate = useNavigate();

  async function refresh(page: number) {
    try {
      const res = await fetch(`/api/posts?page=${page}`);
      if (res.status !== 200) {
        console.error(await res.text());
      }
      const postsJson = await res.json();
      const posts = postsJson.posts;
      posts.reverse();
      setPosts(posts);
      setTotalPages(postsJson.pagesTotal);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    refresh(page);
  }, []);
  return (
    <>
      <div className="pb-4 border-b-2 border-slate-300">
        <h1 className="text-5xl font-bold">All Posts</h1>
      </div>
      <div className="flex flex-row w-full flex-wrap">
        {!posts && (
          <div className="fixed w-screen h-screen flex justify-center items-center">
            <p className="animate-pulse">Loading...</p>
          </div>
        )}
        {posts && (
          <div className="flex flex-row w-full flex-wrap p-4">
            {posts.map((post) => (
              <div key={post.id} className="w-full p-2 mb-8">
                <div className="text-slate-400">
                  {post.createdAt.substring(0, 10)}
                </div>
                <div
                  onClick={() => navigate(`/posts/${post.id}`)}
                  className="mt-2 text-2xl text-bold cursor-pointer"
                >
                  <p>{post.title}</p>
                </div>
                <div className="mt-0 text-cyan-500 flex">
                  {post.tags.split(",").map((tag: any) => (
                    <div key={tag.id}>{tag.toUpperCase()}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between w-full text-slate-500 uppercase pr-4">
        <div
          className="w-6 cursor-pointer"
          onClick={() => {
            setPosts([]);
            setSearchParams({ page: `${page - 1}` });
            refresh(page - 1);
          }}
        >
          {page > 1 && "Previous"}
        </div>
        <div className="flex flex-nowrap space-x-2">
          <div>{page}</div>
          <div>/</div>
          <div>{totalPages}</div>
        </div>
        <div
          className="w-6 cursor-pointer"
          onClick={() => {
            setPosts([]);
            setSearchParams({ page: `${page + 1}` });
            refresh(page + 1);
          }}
        >
          {page !== totalPages && "Next"}
        </div>
      </div>
    </>
  );
}
