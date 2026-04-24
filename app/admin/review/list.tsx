import { List, Datagrid, TextField, NumberField, BooleanField, DateField } from 'react-admin';

export const ReviewList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="product_id" label="Product ID" />
            <TextField source="user_id" label="User ID" />
            <NumberField source="rating" />
            <TextField source="comment" />
            <BooleanField source="is_approved" label="Approved" />
            <DateField source="created_at" showTime />
        </Datagrid>
    </List>
);