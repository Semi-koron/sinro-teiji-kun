import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const SignupPage = () => {
  return (
  <>
    <h1>〇〇〇のアカウントを作成する</h1>
    <p>アカウントをお持ちの場合はログイン</p>{/*loginへ*/}
    <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
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
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="パスワード"
              placeholder="半角英数字"
              defaultValue=""
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="氏名"
              placeholder="山田 太郎"
              defaultValue=""
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="年齢"
              placeholder="数字"
              defaultValue=""
            />
          </div>
        </Box>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button variant="contained">新規登録</Button>
        </Stack>
  </>
  );
}

export default SignupPage;
