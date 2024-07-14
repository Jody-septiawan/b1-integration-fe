import { api } from "@/libs/api";
import React from "react";
import toast from "react-hot-toast";

export const ModalConfirmDeleteFood = ({ item, refetch }) => {

  const handleDeleteFood =  async () => {
    const toastId = toast.loading("Delete Food");

    try {
        await api.delete(`/foods/${item.id}`);

        refetch();

        document.getElementById(`modal-dashboard-add-food-close`).click();

        toast.success(`Delete Food Success ...`, {
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

  return (
    <dialog id={`${item.id}-food-modal-delete`} className="modal">
      <div className="modal-box">
        <p>
          Are Your sure to delete{" "}
          <span className="badge badge-ghost mx-2">{item.title}</span> ?
        </p>
        <div className="flex justify-end gap-x-2 mt-8">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => {
              document
                .getElementById(`${item.id}-food-modal-delete-close`)
                .click();
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleDeleteFood}
          >
            Yes
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id={`${item.id}-food-modal-delete-close`}>close</button>
      </form>
    </dialog>
  );
};
