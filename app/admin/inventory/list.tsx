import { List, Datagrid, TextField, NumberField, DateField } from 'react-admin';

export const InventoryList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="product_id" label="Product ID" />
            <NumberField source="quantity" />
            <DateField source="updated_at" showTime />
        </Datagrid>
    </List>
);