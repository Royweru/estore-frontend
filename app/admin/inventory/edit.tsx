import { Edit, SimpleForm, NumberInput, TextInput } from 'react-admin';

export const InventoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="product_id" disabled label="Product ID" />
            <NumberInput source="quantity" min={0} />
        </SimpleForm>
    </Edit>
);