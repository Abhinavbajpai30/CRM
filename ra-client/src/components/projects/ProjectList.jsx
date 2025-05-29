import { Datagrid, DateField, List, ReferenceField, TextField, EditButton, DeleteButton } from 'react-admin';

export const ProjectList = () => (
    <List>
        <Datagrid rowClick="">
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="clientId" reference="clients" />
            <TextField source="description" />
            <TextField source="status" />
            <DateField source="startDate" />
            <DateField source="dueDate" />
            <DateField source="completionDate" />
            <EditButton label="" />
            <DeleteButton label="" mutationMode="pessimistic" />
        </Datagrid>
    </List>
);