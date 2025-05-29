import { DateInput, Create, ReferenceArrayInput, ReferenceInput, SimpleForm, TextInput, required, SelectInput } from 'react-admin';

const mandat = required('This field is required!');

export const ProjectCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" validate={mandat} />
            <ReferenceInput source="clientId" reference="clients" />
            <TextInput source="name" validate={mandat} />
            <TextInput source="description" />
            <SelectInput source="status" choices={[
                { id: 'Pending', name: 'Pending' },
                { id: 'In Progress', name: 'In Progress'},
                { id: 'Completed', name: 'Completed' },
                { id: 'Published', name: 'Published' },
            ]}
            validate={mandat}
            />
            <DateInput source="startDate" />
            <DateInput source="dueDate" />
            <DateInput source="completionDate" />
        </SimpleForm>
    </Create>
);