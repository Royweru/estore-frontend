import { Show, SimpleShowLayout, TextField, NumberField, DateField, ChipField, ArrayField, Datagrid } from 'react-admin';

export const OrderShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="user_id" label="User ID" />
            <ChipField source="status" />
            <TextField source="currency" />
            <NumberField source="total_amount" />
            <DateField source="created_at" showTime />
            <DateField source="updated_at" showTime />
            <ArrayField source="items">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="product_id" />
                    <NumberField source="quantity" />
                    <NumberField source="unit_price" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);