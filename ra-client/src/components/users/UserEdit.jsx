import { Edit, SimpleForm, TextInput, SelectInput, required } from 'react-admin';

const mandat = required('This field is required!');

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" validate={mandat} />
            <TextInput source="username" validate={mandat} />
            <TextInput source="password" validate={mandat} />
            <TextInput source="fullName" validate={mandat} />
            <TextInput source="email" validate={mandat} />
            <SelectInput source="role" choices={[
                { id: 'Admin', name: 'Admin' },
                { id: 'Content Strategist', name: 'Content Strategist'},
                { id: 'Editor', name: 'Editor' },
                { id: 'Writer', name: 'Writer' },
            ]}
            validate={mandat}
            />
            <TextInput source="avatar" />
        </SimpleForm>
    </Edit>
);