"use client"
import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest';
import { CategoryCreate } from './category/create';
import { CategoryEdit } from './category/edit';
import { CategoryList } from './category/list';
import { SizeList } from './size/list';
import { SizeCreate } from './size/create';
import { SizeEdit } from './size/edit';
import { ProductCreate } from './product/create';
import { ProductList } from './product/list';
import { ProductEdit } from './product/edit';
import { OrderList } from './order/list';
import { OrderShow } from './order/show';
import { InventoryList } from './inventory/list';
import { InventoryEdit } from './inventory/edit';
import { ReviewList } from './review/list';
import { ReviewEdit } from './review/edit';
import { CLIENT_API_BASE_URL } from '@/lib/api';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const requestOptions: fetchUtils.Options = {
    ...options,
    credentials: 'include',
  }
  return fetchUtils.fetchJson(url, requestOptions)
}

const dataProvider = simpleRestProvider(`${CLIENT_API_BASE_URL}/admin`, httpClient, 'X-Total-Count')
export const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
     <Resource
       name='categories'
       list={CategoryList}
       create={CategoryCreate}
       edit={CategoryEdit}
      />
     <Resource
       name='sizes'
       list={SizeList}
       create={SizeCreate}
       edit={SizeEdit}
      />
     <Resource
       name='products'
       list={ProductList}
       create={ProductCreate}
       edit={ProductEdit}
      />
     <Resource
       name='orders'
       list={OrderList}
       show={OrderShow}
      />
     <Resource
       name='inventory'
       list={InventoryList}
       edit={InventoryEdit}
      />
     <Resource
       name='reviews'
       list={ReviewList}
       edit={ReviewEdit}
      />
    </Admin>
  )
}
