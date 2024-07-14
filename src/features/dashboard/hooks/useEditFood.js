import { api } from "@/libs/api";
import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";
 
export const useEditFood = ({ refetch, data }) => {
  const [form, setForm] = React.useState(data);
  const [errors, setErrors] = React.useState({});
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState('');

  const dataSchema = z.object({
    title: z.string(),
    price: z.number(),
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if(name === "price") {
        const priceValue = parseInt(value);

        setForm({
            ...form,
            [name]: priceValue,
          });
    } else {
        setForm({
            ...form,
            [name]: value,
        });
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const dataValidation = () => {
    const result = dataSchema.safeParse(form);

    if (!result.success) {
      const validErrors = result.error.errors;
      validErrors.forEach((error) => {
        const name = error.path[0];
        const msg = error.message;

        setErrors((prev) => ({
          ...prev,
          [name]: msg,
        }));
      });

      return false;
    } else {
      return true;
    }
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post("/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      console.log(error);
      
      toast.error("Failed Upload image")
    }
  }

  const handleSubmit = async () => {
    const isValid = dataValidation();
    if (!isValid) {
      return;
    }
    const toastId = toast.loading("Edit Food");

    try {
      const body = {
        ...form,
      }
      
      if(file != null) {
        const imageUpload = await handleUploadImage();
        
        body.image = imageUpload.url
      }

      await api.patch(`/foods/${data.id}`, body);

      refetch();

      document.getElementById(`${data.id}-modal-dashboard-edit-food-close`).click();

      toast.success(`Edit Food Success ...`, {
          id: toastId
      });
    } catch (error) {
        console.log(error);
        const msg = error?.response?.data?.message;
  
        toast.error(msg, {
          id: toastId
        })
    }
  }


  const handleFileChange = (selectedFile) => {
    if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png') {
      setError('Hanya file gambar (JPG, PNG) yang diizinkan.');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  return { 
    handleSubmit, 
    handleOnChange, 
    form, 
    errors, 
    file,
    error,
    handleFileChange
  }
}