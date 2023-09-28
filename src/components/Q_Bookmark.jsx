import React, {useContext} from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { Box, Button } from '@mui/material';

const Q_Bookmark = ({ questionData, onToggleBookmarked }) => {
    const { token, loggedInUser } = useContext(AuthContext);
    
    console.log('Q_Bookmark: questionData', questionData);
    console.log('questionId', questionData.id)

    const handleBookmarkClick = async (e) => {
        const updatedBookmarkedState = !questionData.bookmarked; // Toggle the current state
        
        const bookmarkData = {
            question: questionData.id
          };

        try {
            const response = await axios.put(
                `https://qb.fly.dev/bookmarks/`,
                bookmarkData,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Token ${token}`,
                    },
                }
            );
            console.log('Q_Bookmark: response', response);
            
            onToggleBookmarked(updatedBookmarkedState);
        } catch (error) {
            console.error(
                'There was an error toggling the bookmarked status of the question',
                error
            );
        }
    };

    return (
        <Box>
            {loggedInUser && (
                    <Button type='submit' variant='contained' color='warning'
                        className="q-bookmark-button"
                        onClick={handleBookmarkClick}
                    >
                        {questionData.bookmarked ? 'Remove Bookmark' : 'Bookmark'}
                    </Button>
                )
            }
        </Box>
    );
};

export default Q_Bookmark;
