import ListView from '../components/ListView.vue';
import UpdateView from '../components/UpdateView.vue';
import Profile from '../Profile.vue';

const profileRoutes = [
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        redirect: '/profile/',
        children: [
            {
                path: '',
                name: 'profile',
                component: ListView
            },
            {
                path: 'update',
                name: 'profile-update',
                component: UpdateView
            }
        ]
    }
]

export default profileRoutes