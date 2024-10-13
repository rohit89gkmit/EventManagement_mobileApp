declare global {
    type loginFormDataType={
        email: string,
        password: string
    };
    type customTextInputProps = {
        placeholder: string;
        secured: boolean;
        iconName: string;
        setData: Dispatch<SetStateAction<loginFormDataType>> | Dispatch<SetStateAction<signUpFormDataType>>
    };
    type signUpFormDataType = {
        name: string;
        email: string;
        age: number;
        username: string;
        password: string;
    }
}

export {}