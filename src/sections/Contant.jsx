import { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground"
import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_ID;



export default function Contact(){
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    service : "",
    budget : "",
    idea : "",
  });
  const [errors , setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name === "budget" && value && !/^\d+$/.test(value)) return;
    setFormData((e) => ({...p, [name] : value}));
    if(errors[name]) setErrors((e) => ({...p , [name] : ""}));
  }
  const validateForm = () => {
    const required = ["name" , "email", "service", "idea"];
    const newEorrrs = {};
    required.forEach((f) = !formData[f].trim() && (newEorrrs[f] = "Fill this field"));
    if (formData.service !== "other" && !formData.budget.trim())
      newEorrrs.budget = "Fill this field";
    setErrors(newEorrrs);
    return !Object.keys(newEorrrs).length;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    setStatus("sending");
    
    try{
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          form_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setFormData({
        name : "",
        email : "",
        service : "",
        budget : "",
        idea : "",
      })
    } catch (err){
      console.error("EmailJS Error: ", err);
      setStatus("error");
      
    }
  }


  return (
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col
    md:flex-row items-center gap-10
    ">
<ParticlesBackground/>
    </section>
  )
}