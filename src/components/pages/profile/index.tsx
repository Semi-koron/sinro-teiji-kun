import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { supabase } from "../../../util/supabase/supabase";
import { fetchUser, updateUser } from "../../../util/supabase/user";
import { Link, useNavigate } from "react-router-dom";
import type { Company } from "../../../util/supabase/company";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "../../common/Header";

const ProfileSettingsPage = () => {
  const [role, setRole] = useState("student");
  const [user, setUser] = useState<User | null>(null);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [company, setCompany] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useNavigate();

  const updateUserData = () => {
    if (!user) return;
    updateUser(user.id, username, Number(age), role, company).then(
      ({ data, error }) => {
        if (error) {
          console.error("Error updating user data:", error.message);
          alert("更新に失敗しました: " + error.message);
        } else {
          console.log("User data updated successfully:", data);
          alert("プロフィールを更新しました");
          router("/");
        }
      }
    );
  };

  useEffect(() => {
    const loadUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: userData, error: userError } = await fetchUser(
          currentUser.id
        );
        if (userError) {
          console.error("Error fetching user data:", userError.message);
        } else if (userData) {
          setUsername(userData.name);
          setAge(String(userData.age));
          setRole(userData.role);
          setCompany(userData.belong);
        }
      }

      const { data: companyData, error: companyError } = await supabase
        .from("company")
        .select("*");
      if (companyError) {
        console.error("Error fetching companies:", companyError.message);
      } else {
        console.log("Companies fetched successfully:", companyData);
        setCompanyList(companyData || []);
      }

      setLoading(false);
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div>
        <Header title="プロフィール設定" />
        <Box sx={{ p: 4 }}>読み込み中...</Box>
      </div>
    );
  }

  return (
    <div>
      <Header title="プロフィール設定" />
      <Box sx={{ mt: 10, p: 4 }}>
        <h1>プロフィール設定</h1>
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
            <>
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
              <Link to="/company/create">
                会社が見つからない場合はこちらから新規登録
              </Link>
            </>
          )}
        </Box>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button variant="contained" onClick={updateUserData}>
            更新
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default ProfileSettingsPage;
