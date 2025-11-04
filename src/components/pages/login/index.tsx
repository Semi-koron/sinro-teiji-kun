import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { login } from "../../../util/supabase/auth";
import { fetchUser } from "../../../util/supabase/user";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await login(username, password);

    if (error) {
      console.error("Login error:", error.message);
      return;
    }

    console.log("Login successful:", data);

    // ログイン成功後、ユーザーデータが存在するかチェック
    if (data.user) {
      const { data: userData, error: userError } = await fetchUser(data.user.id);

      if (userError || !userData) {
        // ユーザーデータが見つからない場合、プロフィール登録ページに遷移
        console.log("User data not found, redirecting to profile registration");
        router("/signup/profile");
      } else {
        // ユーザーデータが存在する場合、ダッシュボードに遷移
        console.log("User data found:", userData);
        router("/");
      }
    }
  };
  return (
    <>
      <h1>ログイン</h1>
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
