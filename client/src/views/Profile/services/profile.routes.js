import ProfileLayout from "../ProfileLayout";
import Profile from "../components/Profile";
import CreateProfile from "../components/CreateProfile";

const profileRoutes = [{
    path: "/profile/",
    Component: ProfileLayout,
    children: [{
        path: "/profile/",
        Component: Profile
    }, {
        path: "/profile/nuevo/",
        Component: CreateProfile
    }
    ]
}];

export default profileRoutes;