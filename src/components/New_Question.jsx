import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";

const New_Question = ({ token }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        
        const questionData = {
            title,
            body,
        };
        
        try {
            const response = await axios.post(
                "https://qb.fly.dev/questions",
                questionData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Token ${token}`,
                    },
                }
            );

            // Hide the form and reset fields
            setTitle("");
            setBody("");

        } catch (error) {
            console.error("There was an error creating the New Question:", error);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmitClick}>
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Body"
                    variant="outlined"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <Button type="submit" variant="contained" color="secondary">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default New_Question;