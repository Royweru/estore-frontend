import { List, Datagrid, TextField, NumberField, DateField, ChipField } from 'react-admin';

export const OrderList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="user_id" label="User ID" />
            <ChipField source="status" />
            <NumberField source="total_amount" options={{ style: 'currency', currency: 'KES' }} />
            <DateField source="created_at" showTime />
        </Datagrid>
    </List>
);