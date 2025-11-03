import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { signUpNewUser } from "../../../util/supabase/auth";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    setShowSuccessMessage(false);
    setErrorMessage("");

    signUpNewUser(email, password).then(({ data, error }) => {
      if (error) {
        console.error("Signup error:", error.message);
        setErrorMessage(error.message);
      } else {
        console.log("Signup successful:", data);
        setShowSuccessMessage(true);
      }
    });
  };

  return (
    <>
      <h1>アカウントを作成する</h1>
      <Link to="/login">
        <p>アカウントをお持ちの場合はログイン</p>
      </Link>

      {showSuccessMessage && (
        <Box sx={{ maxWidth: "50ch", margin: "0 auto", mb: 2 }}>
          <Alert severity="success">
            アカウント作成が完了しました！
            <br />
            確認メールを送信しましたので、メールアドレスを認証してください。
          </Alert>
        </Box>
      )}

      {errorMessage && (
        <Box sx={{ maxWidth: "50ch", margin: "0 auto", mb: 2 }}>
          <Alert severity="error">エラーが発生しました: {errorMessage}</Alert>
        </Box>
      )}

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
