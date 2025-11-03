import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const LoginPage = () => {
  
  return (
  <>
    <h1>〇〇〇にログインする</h1>
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
    </Box>
    <Stack spacing={2} direction="row" justifyContent="center">
      <Button variant="contained">ログイン</Button>
    </Stack>
  </>
  );
}
export default LoginPage;
