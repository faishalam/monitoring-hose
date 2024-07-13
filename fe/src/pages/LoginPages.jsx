import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginAction } from "../features/user/asyncAction";
import { useState } from "react";
import { getSelangData } from "../features/selang/asyncAction";

export default function LoginPages() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = form;
    const [err, setErr] = useState("");

    const { mutate, isLoading } = useMutation(
        async (formData) => {
            await dispatch(userLoginAction(formData));

        }, {
        onSuccess: () => {
            dispatch(getSelangData())
            reset();
            navigate("/");
        },
        onError: (err) => {
            setErr(err?.message);
        }
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    console.log('masuk')

    return (
        <div className="w-full py-16">
                <div className="flex justify-between items-center max-w-full w-full px-96 py-10"> 
                    <img src="https://i.ibb.co.com/vV2PM5s/Logo-KPP-new-png.png" className="md:max-w-md md:max-h-md md:h-32 md:object-cover" alt="" />
                    <img src="https://i.ibb.co.com/k11yP7B/PLANT-TMRB-6.png" className="md:max-w-md md:max-h-md md:h-32 md:object-cover" alt="" />
                </div>
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                   >

                    <img src="https://i.ibb.co.com/cxk1VxR/PC1250.png" className="w-full h-full p-16 object-containt" alt="" />
                   </div>

                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">
                        HOSE LIFETIME MONITORING
                    </h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4" />
                        <p className="text-xs text-center text-gray-500 uppercase">
                            Login with email
                        </p>
                        <span className="border-b w-1/5 lg:w-1/4" />
                    </div>

                    {err && <p className="text-red-500 text-xs text-center mt-2">{err}</p>}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="mt-8">
                            <button type="submit" className="bg-blue-500 text-white font-bold py-2 rounded w-full">
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
