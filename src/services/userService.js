import { supabase } from "./supabase";

const userService={

async getUsers(){

const {data,error}=await supabase
.from("profiles")
.select("*");

if(error) throw error;

return data;

}

};

export default userService;