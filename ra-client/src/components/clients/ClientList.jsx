import { BooleanField, Datagrid, DateField, List, ReferenceField, TextField, EditButton, DeleteButton } from 'react-admin';

export const ClientList = () => (
    <List>
        <Datagrid rowClick="">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="industry" />
            <TextField source="contactPerson" />
            <TextField source="contactEmail" />
            <TextField source="contactPhone" />
            <TextField source="goals" />
            <ReferenceField source="strategist" reference="users">
                <TextField source='fullName' /> 
            </ReferenceField>
            <DateField source="createdDate" />
            <BooleanField source="isActive" />
            <EditButton label="" />
            <DeleteButton label="" mutationMode="pessimistic" />
        </Datagrid>
    </List>
);