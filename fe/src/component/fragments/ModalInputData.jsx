import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelangData, postSelangData } from "../../features/selang/asyncAction";
import Swal from 'sweetalert2'
import { createHistory } from "../../features/history/asyncAction";

export default function ModalInputData({ openModalInput, setOpenModalInput }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            unit: "",
            component: "",
            pn: "",
            tanggalPenggantian: "",
            hmPenggantian: 0,
            quantity: 0,
            lifetime: 0,
            target: 0,
            remark: "",
            pic : "",
            notes: ""
        }
    });

    const { mutate, isLoading } = useMutation(
        async (formData) => {
            await dispatch(postSelangData(formData));
            await dispatch(createHistory(formData));
        },
        {
            onSuccess: async () => {
                await dispatch(getSelangData());
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully added data",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                navigate("/");
                setOpenModalInput(false)
            },
            onError: (err) => setErr(err?.message)
        }
    );

    const onSubmit = (data) => {
        mutate(data);
    };

    useEffect(() => {
        if (!openModalInput) {
            reset();
        }
    }, [openModalInput, reset]);


    return (
        <Dialog open={openModalInput} onClose={setOpenModalInput} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full md:w-[700px] md:px-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                        <div className="bg-white px-2 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-white mb-4">
                                <h1 className="text-gray-800 font-bold text-xl mb-8 border-b-2 border-black">Add Data!</h1>
                                <div className="space-y-4">
                                    {[
                                        { label: "Unit", name: "unit", type: "select", options: ["EX2021", "EX2024", "EX2025"] },
                                        { label: "Component", name: "component", type: "select", options: ["Pump Area", "Main Valve Area", "Swing Area", "Attachment Area", "Travel Area", "PPC Area"] },
                                        { label: "PN", name: "pn", type: "text" },
                                        { label: "Tanggal Penggantian", name: "tanggalPenggantian", type: "date" },
                                        { label: "HM Penggantian", name: "hmPenggantian", type: "number" },
                                        { label: "Quantity", name: "quantity", type: "number" },
                                        { label: "Target", name: "target", type: "number" },
                                        { label: "Remark", name: "remark", type: "select", options: ["Genuine", "IMA"] },
                                        { label: "PIC", name: "pic", type: "text" },
                                        { label: "Notes", name: "notes", type: "text" }
                                    ].map(({ label, name, type, options }) => (
                                        <div key={name} className="flex flex-col">
                                            <label htmlFor={name} className="text-sm font-semibold">{label}</label>
                                            {type === "select" ? (
                                                <select
                                                    id={name}
                                                    className="w-full rounded-lg border-gray-200 text-sm shadow-sm border mb-4 p-2"
                                                    {...register(name, { required: `${label} is required` })}
                                                >
                                                    <option value="">Select {label}</option>
                                                    {options.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    id={name}
                                                    type={type}
                                                    className="w-full rounded-lg border-gray-200 text-sm shadow-sm border mb-4 p-2"
                                                    placeholder={`Enter ${label}`}
                                                    {...register(name, { required: `${label} is required`, valueAsNumber: type === "number", validate: type === "number" ? value => value > 0 || `${label} must be greater than 0` : undefined })}
                                                />
                                            )}
                                            {errors[name] && <p className="text-red-500 text-xs">*{errors[name].message}</p>}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" className="w-2/4 h-10 bg-green-800 text-white rounded-lg hover:bg-green-700" disabled={isLoading}>
                                        {isLoading ? "Loading..." : "Add Data"}
                                    </button>
                                </div>
                                {err && <p className="text-red-500 text-xs mt-2 text-center">{err}</p>}
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
