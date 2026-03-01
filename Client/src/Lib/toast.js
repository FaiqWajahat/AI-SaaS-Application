import toast from "react-hot-toast"

export const handleSuccess=async(msg)=>{
    return toast.success(msg)
};

export const handleError=async(msg)=>{
    return toast.error(msg)
}

