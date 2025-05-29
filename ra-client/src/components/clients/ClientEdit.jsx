import { BooleanInput, DateInput, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from 'react-admin';

const mandat = required('This field is required!');

export const ClientEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" validate={mandat} />
            <TextInput source="name" validate={mandat} />
            <TextInput source="industry" />
            <TextInput source="contactPerson" />
            <TextInput source="contactEmail" />
            <TextInput source="contactPhone" />
            <TextInput source="goals" />
            <ReferenceInput source="strategist" reference="users" filter={{role: 'Content Strategist'}}>
                <SelectInput optionText="fullName"/>
            </ReferenceInput>
            <DateInput source="createdDate" />
            <BooleanInput source="isActive" />
        </SimpleForm>
    </Edit>
);