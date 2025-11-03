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
