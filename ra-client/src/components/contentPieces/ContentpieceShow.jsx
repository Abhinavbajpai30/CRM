import { ArrayField, Datagrid, DateField, NumberField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const ContentpieceShow = () => (
    <Show>
        <SimpleShowLayout>
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
            <ArrayField source="versions"><Datagrid><NumberField source="version" />
            <TextField source="content" />
            <DateField source="timestamp" />
            <ReferenceField source="editorId" reference="editors" /></Datagrid></ArrayField>
        </SimpleShowLayout>
    </Show>
);