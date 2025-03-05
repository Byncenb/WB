export const handleInputChange = (setValue: (value: string) => void, event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
};