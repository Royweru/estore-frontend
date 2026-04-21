import { isAdmin } from '@/lib/isAdmin'

import { App } from './app'
import { redirect } from 'next/navigation'

const AdminPage = async () => {
if (!(await isAdmin())) return redirect("/")
  return (
    <App />
  )
}

export default AdminPage
