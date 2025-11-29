import Supabase from '../services/supabaseClient';
import RoutesPath from '../routes/RoutesPath';

const Authentication = {
    login: async (email, password) => {
        return await Supabase.auth.signInWithPassword({
            email,
            password,
        });
    },
    register: async (email, password) => {
        return await Supabase.auth.signUp({
            email,
            password,
        });
    },
    isAuthenticated: async () => {
        const { data } = await Supabase.auth.getUser();
        return !!data?.user;
    },
    logout: async () => {
        return await Supabase.auth.signOut();
    },
    getUser: async () => {
        const { data } = await Supabase.auth.getUser();
        return data?.user;
    },

    forgotPassword: async (email) => {
        return await Supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + RoutesPath.RESETAR_SENHA,
        });
    },
    updatePassword: async (newPassword) => {
        return await Supabase.auth.updateUser({
            password: newPassword,
        });
    },

    setSession: async ({ access_token, refresh_token }) => {
        return await Supabase.auth.setSession({
            access_token,
            refresh_token,
        });
    },

}
export default Authentication;