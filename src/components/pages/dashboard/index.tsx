import React, {useEffect, useState} from "react";
import {prefOptions, sbjOptions} from "./optionList";
import MenuBar from "../dashboard/menuBar";
import {TextField, Autocomplete, Box, Button} from "@mui/material";
import ContentCard from "../dashboard/contentCard";

type ContentData = {
    id: number;
    title: string;
    description: string;
    subject: string;
    region: string;
    prefecture: string;
    imgUrl: string;
};

const sampleData: ContentData[] = [
    {
        id: 1,
        title: "Sample Content 1",
        description: "This is a description for sample content 1.",
        subject: "数学",
        region: "北海道・東北",
        prefecture: "北海道",
        imgUrl: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        title: "Sample Content 2",
        description: "This is a description for sample content 2.",
        subject: "理科",
        region: "北海道・東北",
        prefecture: "北海道",
        imgUrl: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        title: "Sample Content 3",
        description: "This is a description for sample content 3.",
        subject: "数学",
        region: "九州・沖縄",
        prefecture: "福岡県",
        imgUrl: "https://via.placeholder.com/150",
    },
];

const DashboardPage = () => {
    const [pref, setPref] = useState<string | null>(null);
    const [sbj, setSbj] = useState<string | null>(null);
    const [filteredData, setFilteredData] = useState<ContentData[]>(sampleData);

    const handleSearch = () => {
        if (pref) {
            if (sbj) {
                setFilteredData(
                    sampleData.filter(
                        (data) =>
                            data.prefecture === pref && data.subject === sbj
                    )
                );
            } else {
                setFilteredData(
                    sampleData.filter(
                        (data) => data.prefecture === pref
                    )
                );
            }
        } else if (sbj) {
            setFilteredData(
                sampleData.filter(
                    (data) => data.subject === sbj
                )
            );
        } else {
            setFilteredData(sampleData);
        }
    };

    return (
        <div>
            <MenuBar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 2,
                    marginTop: 2,
                    border: "1px solid lightgray",
                    padding: 1,
                    borderRadius: 1,
                }}
            >
                <Autocomplete
                    sx={{minWidth: 200}}
                    options={prefOptions}
                    getOptionLabel={(option) => option.pref}
                    groupBy={(option) => option.region}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="地域"
                            variant="outlined"
                        />
                    )}
                    onChange={(event, value) =>
                        setPref(value ? value.pref : null)
                    }
                />
                <Autocomplete
                    sx={{minWidth: 200}}
                    options={sbjOptions}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="教科"
                            variant="outlined"
                        />
                    )}
                    onChange={(event, value) => setSbj(value ? value : null)}
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                >検索</Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    marginTop: 2,
                    width: "100%",
                }}
            >
                {filteredData &&filteredData.map((data) => (
                    <ContentCard
                        key={data.id}
                        title={data.title}
                        description={data.description}
                        subject={data.subject}
                        region={data.region}
                        prefecture={data.prefecture}
                        imgUrl={data.imgUrl}
                    />
                ))}
            </Box>
        </div>
    );
};

export default DashboardPage;
