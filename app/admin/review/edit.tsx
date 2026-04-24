import { Edit, SimpleForm, TextInput, NumberInput, BooleanInput } from 'react-admin';

export const ReviewEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="product_id" disabled label="Product ID" />
            <TextInput source="user_id" disabled label="User ID" />
            <NumberInput source="rating" min={1} max={5} />
            <TextInput source="comment" multiline />
            <BooleanInput source="is_approved" label="Approved" />
        </SimpleForm>
    </Edit>
);