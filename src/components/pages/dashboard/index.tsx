import React, {useState} from "react";
import MenuBar from "../dashboard/menuBar";
import {TextField, Autocomplete, Card, CardContent, Box, CardActionArea, Button} from "@mui/material";

const DashboardPage = () => {
    return (
        <div>
            <MenuBar />
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2, marginTop: 2, border: "1px solid lightgray", padding: 0.5, borderRadius: 1}}>
                <Autocomplete
                    sx={{minWidth: 200}}
                    options={[]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="地域"
                            variant="outlined"
                        />
                    )}
                />
                <Autocomplete
                    sx={{minWidth: 200}}
                    options={[]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="教科"
                            variant="outlined"
                        />
                    )}
                />
                <Button variant="contained">
                    検索
                </Button>
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
                <Card sx={{minWidth: 500, marginRight: 2, marginBottom: 2}}>
                    <CardActionArea>
                        <CardContent>コンテンツ1</CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{minWidth: 500, marginRight: 2, marginBottom: 2}}>
                    <CardActionArea>
                        <CardContent>コンテンツ2</CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{minWidth: 500, marginRight: 2, marginBottom: 2}}>
                    <CardActionArea>
                        <CardContent>コンテンツ3</CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </div>
    );
};

export default DashboardPage;
