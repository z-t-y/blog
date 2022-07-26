import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "umi";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      alert("请先登录");
      navigate("/login");
    }
  }, []);

  async function submit() {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(","),
          imageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") as string,
        },
      });
      if (res.status !== 200) {
        console.error(await res.text());
        alert("发布失败");
        return;
      }
      navigate("/posts/" + (await res.json()).id);
    } catch (err) {
      console.error(err);
    }
  }

  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  return (
    <div className="w-full flex justify-center">
      <div className="container w-3/4 px-8 pt-16">
        <div className="w-full mb-4">
          <TextField
            label="标题"
            value={title}
            onChange={(e: InputEvent) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <TextField
            multiline
            value={content}
            className="w-full mb-4"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          />
        </div>
        <div className="w-full mb-4">
          <TextField
            label="标签"
            value={tags}
            className="w-full mb-4"
            onChange={(e: InputEvent) => setTags(e.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <TextField
            label="图片地址"
            value={imageUrl}
            className="w-full"
            onChange={(e: InputEvent) => setImageUrl(e.target.value)}
          />
          <br />
          <img src={imageUrl} alt="" className="w-full h-auto mb-4" />
        </div>
        <Button variant="outlined" onClick={submit}>
          发布
        </Button>
      </div>
    </div>
  );
}
