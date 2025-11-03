import {
  Box,
  Button,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { addEvnet } from "../../../../util/supabase/event";
import { supabase } from "../../../../util/supabase/supabase";
import type { UserData } from "../../../../util/supabase/user";
import { fetchSubject, type Subject } from "../../../../util/supabase/subject";
import { useNavigate } from "react-router-dom";

const EventCreatePage = () => {
  const [evnetName, setEvnetName] = useState("");
  const [eventDate, setEventDate] = useState<PickerValue | null>(null);
  const [description, setDescription] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const router = useNavigate();

  const postEventData = async () => {
    if (!userData) return;
    const belong = userData.belong ?? "";
    if (belong === "") {
      console.error("User belong is missing.");
      return;
    }
    const { data, error } = await addEvnet(
      evnetName,
      eventDate,
      belong,
      description,
      place,
      selectedSubjects
    );
    if (error) {
      console.error("Event creation error:", error.message);
    } else {
      console.log("Event created successfully:", data);
      router("/");
    }
  };

  const handleSubjectToggle = (subjectId: number) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  useEffect(() => {
    // ユーザー情報を取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      supabase
        .from("user")
        .select("*")
        .eq("id", session?.user?.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching user:", error.message);
          } else {
            console.log("User fetched successfully:", data);
            setUserData(data);
          }
        });
    });

    // 教科一覧を取得
    fetchSubject().then(({ data, error }) => {
      if (error) {
        console.error("Error fetching subjects:", error.message);
      } else {
        console.log("Subjects fetched successfully:", data);
        setSubjects(data || []);
      }
    });
  }, []);

  return (
    <>
      <h1>イベントを新規登録する</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
          "& .MuiPickersTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="イベント名"
            placeholder="〇〇〇見学会"
            defaultValue=""
            value={evnetName}
            onChange={(e) => setEvnetName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="概要"
            placeholder="〜向けの〇〇職業体験イベントです。"
            defaultValue=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "50ch" }} required>
            <InputLabel id="place-select-label">都道府県</InputLabel>
            <Select
              labelId="place-select-label"
              id="place-select"
              value={place}
              label="都道府県"
              onChange={(e) => setPlace(e.target.value)}
            >
              <MenuItem value="北海道">北海道</MenuItem>
              <MenuItem value="青森県">青森県</MenuItem>
              <MenuItem value="岩手県">岩手県</MenuItem>
              <MenuItem value="宮城県">宮城県</MenuItem>
              <MenuItem value="秋田県">秋田県</MenuItem>
              <MenuItem value="山形県">山形県</MenuItem>
              <MenuItem value="福島県">福島県</MenuItem>
              <MenuItem value="茨城県">茨城県</MenuItem>
              <MenuItem value="栃木県">栃木県</MenuItem>
              <MenuItem value="群馬県">群馬県</MenuItem>
              <MenuItem value="埼玉県">埼玉県</MenuItem>
              <MenuItem value="千葉県">千葉県</MenuItem>
              <MenuItem value="東京都">東京都</MenuItem>
              <MenuItem value="神奈川県">神奈川県</MenuItem>
              <MenuItem value="新潟県">新潟県</MenuItem>
              <MenuItem value="富山県">富山県</MenuItem>
              <MenuItem value="石川県">石川県</MenuItem>
              <MenuItem value="福井県">福井県</MenuItem>
              <MenuItem value="山梨県">山梨県</MenuItem>
              <MenuItem value="長野県">長野県</MenuItem>
              <MenuItem value="岐阜県">岐阜県</MenuItem>
              <MenuItem value="静岡県">静岡県</MenuItem>
              <MenuItem value="愛知県">愛知県</MenuItem>
              <MenuItem value="三重県">三重県</MenuItem>
              <MenuItem value="滋賀県">滋賀県</MenuItem>
              <MenuItem value="京都府">京都府</MenuItem>
              <MenuItem value="大阪府">大阪府</MenuItem>
              <MenuItem value="兵庫県">兵庫県</MenuItem>
              <MenuItem value="奈良県">奈良県</MenuItem>
              <MenuItem value="和歌山県">和歌山県</MenuItem>
              <MenuItem value="鳥取県">鳥取県</MenuItem>
              <MenuItem value="島根県">島根県</MenuItem>
              <MenuItem value="岡山県">岡山県</MenuItem>
              <MenuItem value="広島県">広島県</MenuItem>
              <MenuItem value="山口県">山口県</MenuItem>
              <MenuItem value="徳島県">徳島県</MenuItem>
              <MenuItem value="香川県">香川県</MenuItem>
              <MenuItem value="愛媛県">愛媛県</MenuItem>
              <MenuItem value="高知県">高知県</MenuItem>
              <MenuItem value="福岡県">福岡県</MenuItem>
              <MenuItem value="佐賀県">佐賀県</MenuItem>
              <MenuItem value="長崎県">長崎県</MenuItem>
              <MenuItem value="熊本県">熊本県</MenuItem>
              <MenuItem value="大分県">大分県</MenuItem>
              <MenuItem value="宮崎県">宮崎県</MenuItem>
              <MenuItem value="鹿児島県">鹿児島県</MenuItem>
              <MenuItem value="沖縄県">沖縄県</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={eventDate}
                onChange={(newValue) => setEventDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <FormControl component="fieldset" sx={{ m: 1 }}>
            <FormLabel component="legend">関連する教科を選択</FormLabel>
            <FormGroup>
              {subjects.map((subject) => (
                <FormControlLabel
                  key={subject.id}
                  control={
                    <Checkbox
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleSubjectToggle(subject.id)}
                    />
                  }
                  label={subject.subject_name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </Box>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" onClick={postEventData}>
          新規登録
        </Button>
      </Stack>
    </>
  );
};

export default EventCreatePage;
