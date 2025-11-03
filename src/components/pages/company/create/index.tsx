import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { addCompany } from "../../../../util/supabase/company";

const CompanyCreatePage = () => {
  const [companyName, setCompanyName] = useState("");

  const postCompanyData = () => {
    addCompany(companyName).then(({ data, error }) => {
      if (error) {
        console.error("Company creation error:", error.message);
      } else {
        console.log("Company created successfully:", data);
      }
    });
  };

  return (
    <>
      <h1>会社を新規登録する</h1>
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
            label="会社名"
            placeholder="株式会社〇〇〇"
            defaultValue=""
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
      </Box>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" onClick={postCompanyData}>
          新規登録
        </Button>
      </Stack>
    </>
  );
};

export default CompanyCreatePage;
