import Create from '../components/Create.jsx'
import Home from '../components/Home.jsx'
import Update from '../components/Update.jsx'
import EmpresaLayout from '../EmpresaLayout.jsx'
const empresaRoutes = [{
    path: '/empresa',
    Component: EmpresaLayout,
    children: [
        {
            path: '/empresa/details',
            Component: Home
        },
        {
            path: '/empresa/update',
            Component: Update
        },
        {
            path: '/empresa/create',
            Component: Create
        }
    ]

}]

export default empresaRoutes