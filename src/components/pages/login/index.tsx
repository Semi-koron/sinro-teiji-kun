import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { login } from "../../../util/supabase/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();

  const handleLogin = () => {
    login(username, password).then(({ data, error }) => {
      if (error) {
        console.error("Login error:", error.message);
      } else {
        console.log("Login successful:", data);
        router("/");
      }
    });
  };
  return (
    <>
      <h1>〇〇〇にログインする</h1>
      <Link to="/signup">
        <p>アカウントをお持ちになってない場合はサインアップ</p>
      </Link>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="メールアドレス"
            placeholder="info@example.com"
            defaultValue=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            type="password"
            label="パスワード"
            placeholder="半角英数字"
            defaultValue=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </Box>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" onClick={handleLogin}>
          ログイン
        </Button>
      </Stack>
    </>
  );
};
export default LoginPage;
