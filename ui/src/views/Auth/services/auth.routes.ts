import LoginComponent from '@/views/Auth/components/LoginComponent.vue'
import RegisterComponent from '@/views/Auth/components/RegisterComponent.vue'
import ActivateComponent from '@/views/Auth/components/ActivateComponent.vue'
import ChangePasswordComponent from '@/views/Auth/components/ChangePasswordComponent.vue'
import ConfirmChangePasswordComponent from '@/views/Auth/components/ConfirmChangePasswordComponent.vue'
import Auth from '@/views/Auth/Auth.vue'

const authRoutes = [
    {
        path:'/',
        component: Auth,
        redirect: '/login',
        children: [
            {
                path: 'login',
                name: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                name: 'register',
                component: RegisterComponent
            },
            {
                path: 'activate/:uid/:token',
                name: 'activate',
                component: ActivateComponent
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: ChangePasswordComponent,
            },
            {
                path: 'password/reset/confirm/:uid/:token',
                name: 'reset-password-confirm',
                component: ConfirmChangePasswordComponent,
            }
        ]
    }
]

export default authRoutes