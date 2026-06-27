import { supabase } from "./supabase";

const customerService={

async getCustomer(id){

const {data,error}=await supabase
.from("profiles")
.select("*")
.eq("id",id)
.single();

if(error) throw error;

return data;

}

};

export default customerService;