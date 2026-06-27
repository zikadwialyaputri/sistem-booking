import { supabase } from "./supabase";

const lapanganService={

async getLapangan(){

const {data,error}=await supabase
.from("lapangan")
.select("*");

if(error) throw error;

return data;

},

async tambahLapangan(dataLapangan){

const {data,error}=await supabase
.from("lapangan")
.insert([dataLapangan]);

if(error) throw error;

return data;

},

async deleteLapangan(id){

const {error}=await supabase
.from("lapangan")
.delete()
.eq("id",id);

if(error) throw error;

}

};

export default lapanganService;