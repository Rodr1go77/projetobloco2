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
}
    export default Authentication;