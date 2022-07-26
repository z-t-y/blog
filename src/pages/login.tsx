import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "umi";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function submit() {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        console.error(await res.text());
        return;
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/posts/create");
    } catch (err) {
      console.error(err);
    }
  }

  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  return (
    <div className="w-full flex justify-center">
      <div className="container w-1/2 px-8 py-8">
        <div className="w-full">
          <TextField
            label="邮箱"
            value={email}
            onChange={(e: InputEvent) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <TextField
            label="密码"
            type="password"
            value={password}
            onChange={(e: InputEvent) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button variant="outlined" onClick={submit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
