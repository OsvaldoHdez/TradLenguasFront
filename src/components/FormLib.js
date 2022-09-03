
import { useField } from "formik";
import { ErrorMsg } from "./Styles";
import TextField from '@mui/material/TextField';;

export const TextInput = ({ ...props }) => {
    const [field, meta] = useField(props);

    return(
        <div >
           
            
            {props.type !== "password" && 
                <TextField 
                    invalid={meta.touched && meta.error}
                    {...field} 
                    {...props} 
                />
            }

            {props.type === "password" && (
                <TextField 
                invalid={meta.touched && meta.error}
                    {...field} 
                    {...props}
                />
            )}
           
            {meta.touched && meta.error ? (
                <ErrorMsg>{meta.error}</ErrorMsg>
            ) : (
                <ErrorMsg style={{visibility: "hidden"}}>.</ErrorMsg>
            )}
        </div>
    )

}