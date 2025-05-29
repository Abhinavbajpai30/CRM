import { ArrayInput, DateInput, Edit, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput, SelectInput, required } from 'react-admin';

const mandat = required('This field is required!');

export const ContentpieceEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" validate={mandat} />
            <SelectInput source="type" choices={[
                { id: 'Article', name: 'Article'},
                { id: 'Blog Post', name: 'Blog Post'},
                { id: 'Social Media Post', name: 'Social Media Post'},
            ]} />
            <SelectInput source="status" choices={[
                { id: 'In Progress', name: 'In Progress'},
                { id: 'Submitted for Review', name: 'Submitted for Review' },
                { id: 'Requires Revision', name: 'Requires Revision' },
                { id: 'Approved', name: 'Approved' },
                { id: 'Published', name: 'Published' },
            ]}
            validate={mandat}
            />
            <ReferenceInput source="writerId" reference="users" filter={{role: 'Content Strategist'}}>
                <SelectInput optionText="fullName"/>
            </ReferenceInput>
            <ReferenceInput source="editorId" reference="users" filter={{role: 'Content Strategist'}}>
                <SelectInput optionText="fullName"/>
            </ReferenceInput>
            <TextInput source="content" validate={mandat} />
            <DateInput source="submissionDate" />
            <DateInput source="dueDate" />
            <ArrayInput source="versions">
                <SimpleFormIterator>
                    <NumberInput source="version" />
                    <TextInput source="content" />
                    <DateInput source="timestamp" />
                    <ReferenceInput source="editorId" reference="users" filter={{role: 'Content Strategist'}}>
                        <SelectInput optionText="fullName"/>
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);