import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: "#adbcd1",
    backgroundColor: "#233041",
}));

type SingleStatProps = {
    name: string;
    value: string | number;
};
const SingleStat = ({ name, value }: SingleStatProps) => {
    return (
        <Item elevation={3}>
            <Stack direction="column" spacing={0}>
                <Typography variant='caption'>{name}</Typography>
                <Typography variant='h5' color='#adbcd1'>{value}</Typography>
            </Stack>
        </Item>
    );
};

export default SingleStat;