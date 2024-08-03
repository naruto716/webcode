import {Grid, Typography} from "@mui/material";
import {useFormContext} from "react-hook-form";
import AppTextInput from "../../app/Components/AppTextInput.tsx";
import AppCheckBox from "../../app/Components/AppCheckbox.tsx";

export default function AddressForm() {
    const {control, formState} = useFormContext();
    
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AppTextInput label='Full Name' name='fullName' control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput label='Address line 1' name='address1' control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput label='Address line 2' name='address2' control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput label='City' name='city' control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput label='State/Province/Region' name='state' control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput label='Zip / Postal code' name='zip' control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput label='Country' name='country' control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppCheckBox disabled={!formState.isDirty} label='Save this for default address' name='saveAddress' control={control} />
                </Grid>
            </Grid>
        </>
    );
}