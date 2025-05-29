import { Datagrid, EmailField, List, TextField, ImageField, EditButton, DeleteButton } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="">
            <TextField source="id" />
            <TextField source="username" />
            {/* <TextField source="password" /> */}
            <TextField source="fullName" />
            <EmailField source="email" />
            <TextField source="role" />
            <ImageField
                source="avatar"
                label="Avatar"
                sx={{ '& img': { maxWidth: 40, maxHeight: 40, borderRadius: '50%' } }}
                title="fullName"
            />
            <EditButton label="" />
            <DeleteButton label="" mutationMode="pessimistic" />
        </Datagrid>
    </List>
);