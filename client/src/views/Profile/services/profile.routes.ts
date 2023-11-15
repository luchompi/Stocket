import ProfileLayout from "../ProfileLayout.vue";
import Home from '../components/Home.vue'
import Update from '../components/Update.vue'


const profileRoutes = [
    {
        path: "/",
        component: ProfileLayout,
        children:[
            {
                path: "profile",
                name: "Profile",
                component: Home
            },
            {
                path: "profile/update",
                name: "ProfileUpdate",
                component: Update
            }
        ]
    }
]

export default profileRoutes;