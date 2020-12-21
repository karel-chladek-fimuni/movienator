import React, {FC} from "react";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Clear"
import SearchIcon from "@material-ui/icons/Search"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
            marginBottom: theme.spacing(1),
            display: 'flex',
            width: 350,
            height: 38,
            marginLeft: 'auto',
        },
        input: {
            fontSize: '1rem'
        },
        divider: {
            height: 24,
            margin: 1,
        },
        button: {
            padding:0,
            marginLeft:10,
            size: "small",
            color: "primary"
        }
    }),
);

type SearchInputProps = {
    value: string,
    onChange: (value: string) => void,
    onClear: () => void
}
const SearchInput: FC<SearchInputProps> = props => {
    const [localValue, setLocalValue] = React.useState<string>(props.value);
    const isChanged = localValue === props.value;
    const classes = useStyles();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        props.onChange(localValue)
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Paper className={classes.root}>
                
                <InputBase
                    value={localValue}
                    onChange={handleChangeInput}
                    className={classes.input}
                    placeholder="Search Movies"
                />
                <Divider orientation="vertical" className={classes.divider}/>
                <IconButton className={classes.button} onClick={isChanged ? props.onClear : () => props.onChange(localValue)}>
                    {localValue === props.value ? <RemoveIcon/> : <SearchIcon />}
                </IconButton>
            </Paper>
        </form>
    );
};

export default SearchInput;