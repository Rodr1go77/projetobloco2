import Supabase from '../services/supabaseClient';

const Authentication = {
    login: async (email, password)=> {
        return await Supabase.auth.signInWithPassword({
            email,
            password,
        });
    },
    register: async (email, password)=> {
        return await Supabase.auth.signUp({
            email,
            password,
        });
    },
    isAuthenticated: async ()=> {
        const {data, error} = await Supabase.auth.getUser();
        return !!data?.user;
    },
    logout: async ()=> {
        return await Supabase.auth.signOut();
    }
}
    export default Authentication;