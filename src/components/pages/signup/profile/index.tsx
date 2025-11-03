import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { supabase } from "../../../../util/supabase/supabase";
import { addUser } from "../../../../util/supabase/user";
import { useNavigate } from "react-router-dom";
import type { Company } from "../../../../util/supabase/company";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ProfilePage = () => {
  const [role, setRole] = useState("student");
  const [user, setUser] = useState<User | null>(null);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [company, setCompany] = useState<string | null>(null);
  const router = useNavigate();

  const postUserData = () => {
    if (!user) return;
    addUser(user.id, username, Number(age), role, company).then(
      ({ data, error }) => {
        if (error) {
          console.error("Error adding user data:", error.message);
        }
        console.log("User data added successfully:", data);
        router("/signup/complete");
      }
    );
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    supabase
      .from("company")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching companies:", error.message);
        } else {
          console.log("Companies fetched successfully:", data);
          setCompanyList(data || []);
        }
      });
  }, []);

  return (
    <>
      <h1>〇〇〇のアカウントを作成する</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
          "& .MuiFormControl-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="氏名"
            placeholder="山田 太郎"
            defaultValue=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            type="number"
            label="年齢"
            placeholder="数字"
            defaultValue=""
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <FormControl>
            <InputLabel id="role-select">職業</InputLabel>
            <Select
              label="役割"
              id="outlined-required"
              value={role}
              onChange={(e) => {
                if (e.target.value === "student") {
                  setCompany(null);
                }
                setRole(e.target.value);
              }}
            >
              <MenuItem value="student">学生</MenuItem>
              <MenuItem value="employee">企業担当者</MenuItem>
            </Select>
          </FormControl>
        </div>
        {role === "employee" && (
          <div>
            <FormControl>
              <InputLabel id="company-select">所属会社</InputLabel>
              <Select
                label="会社名"
                id="company-select"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                {companyList.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.company_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </Box>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" onClick={postUserData}>
          新規登録
        </Button>
      </Stack>
    </>
  );
};

export default ProfilePage;
