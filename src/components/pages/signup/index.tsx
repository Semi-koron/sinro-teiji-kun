import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { signUpNewUser } from "../../../util/supabase/auth";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    signUpNewUser(email, password).then(({ data, error }) => {
      if (error) {
        console.error("Signup error:", error.message);
      } else {
        console.log("Signup successful:", data);
      }
    });
  };

  return (
    <>
      <h1>〇〇〇のアカウントを作成する</h1>
      <Link to="/login">
        <p>アカウントをお持ちの場合はログイン</p>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Button variant="contained" onClick={handleSignup}>
          新規登録
        </Button>
      </Stack>
    </>
  );
};

export default SignupPage;
