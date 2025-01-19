import Error from '../pages/Error';
import Recipes from "../pages/Recipes";
import Login from "../pages/auth/Login";
import Profile from "../pages/Profile";
import RecipeEditPage from "../pages/Recipe/RecipeEditPage";
import Searched from "../pages/Searched";
import Category from "../pages/Category";
import Categories from "../pages/Categories";
import Season from "../pages/Season";
import Seasons from "../pages/Seasons";
import Country from "../pages/Country";
import Countrys from "../pages/International";
import Users from "../pages/Users/Users";

const publicRout = [
    { path: "/login", component: <Login />, exact: true },
    { path: "*", component: <Error />, exact: true },
]

const privateRout = [
    //Профиль
    {path: "/profile", component: <Profile />, exact: true},
    {path: "/profile/:recipe", component: <RecipeEditPage />, exact: true},

    //Категория сезонов
    {path: "/categories/seasons", component: <Seasons />, exact: true},
    {path: "/categories/seasons/:season", component: <Season />, exact: true},
    {path: "/categories/seasons/:season/:recipe", component: <RecipeEditPage />, exact: true},

    //Национальная кухня
    {path: "/categories/international-cuisine", component: <Countrys />, exact: true},
    {path: "/categories/international-cuisine/:country", component: <Country />, exact: true},
    {path: "/categories/international-cuisine/:country/:recipe", component: <RecipeEditPage />, exact: true},

    //Категории рецептов
    {path: "/categories", component: <Categories />, exact: true},
    {path: "/categories/:category", component: <Category />, exact: true},
    {path: "/categories/:category/:recipe", component: <RecipeEditPage />, exact: true},

    //Все рецепты
    {path: "/recipes", component: <Recipes />, exact: true},
    {path: "/recipes/:recipe", component: <RecipeEditPage />, exact: true},

    //Поисковик
    {path: "/search", component: <Searched />, exact: true},
    {path: "/search/:recipe", component: <RecipeEditPage />, exact: true},

    {path: "/users", component: <Users />, exact: true},
    {path: "/", component: <Recipes />, exact: true},
    {path: "*", component: <Error />, exact: true},
];

export { publicRout, privateRout };
