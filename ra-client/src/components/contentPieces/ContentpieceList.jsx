import { ArrayField, ChipField, Datagrid, DateField, List, ReferenceField, SingleFieldList, TextField, EditButton, DeleteButton } from 'react-admin';

export const ContentpieceList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="type" />
            <TextField source="status" />
            <ReferenceField source="writerId" reference="users">
                <TextField source='fullName' /> 
            </ReferenceField>
            <ReferenceField source="editorId" reference="users">
                <TextField source='fullName' /> 
            </ReferenceField>
            <TextField source="content" />
            <DateField source="submissionDate" />
            <DateField source="dueDate" />
            <ArrayField source="versions">
                <SingleFieldList>
                    <ChipField source="version" />
                </SingleFieldList>
            </ArrayField>
            <EditButton label="" />
            <DeleteButton label="" mutationMode="pessimistic" />
        </Datagrid>
    </List>
);