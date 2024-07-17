export const createUserValidationSchema={
    username:{
        isLength:{

            options:{
                min:5 ,max:32,
            },
            errorMessage:"atleast 5 - 32 characters",
        },
        notEmpty:{
            errorMessage:"string must not be empty",
        },
        isString:{
            errorMessage:"must be string",
        },
    },
    displayname:{
        notEmpty:true,
    },
    password:{
        notEmpty:true,
    },
}