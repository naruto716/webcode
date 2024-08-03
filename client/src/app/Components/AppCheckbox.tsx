import {useController, UseControllerProps} from "react-hook-form";
import {Checkbox, FormControlLabel} from "@mui/material";

interface Props extends UseControllerProps {
    label: string;
    disabled: boolean;
}

export default function AppCheckBox(props: Props) {
    const {field} = useController({...props, defaultValue: false});

    return (
        <FormControlLabel control={<Checkbox color="secondary" {...field} checked={field.value}/>}
                          label={props.label} disabled={props.disabled}/>
    );
}