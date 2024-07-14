import React from "react";
import { useAddFood } from "../hooks/useAddFood";
import { SingleLineText } from "@/components/fields/SingleLineText";
import { FileUpload } from "@/components/fields/FileUpload";

export const ModalAddFood = ({refetch}) => {
  const { 
    errors, 
    form, 
    handleOnChange, 
    handleSubmit,
    file,
    error,
    handleFileChange
   } = useAddFood({refetch});
  

  return (
    <dialog id={`modal-dashboard-add-food`} className="modal">
      <div className="modal-box">
        <div className="">
          <h2 className="text-center text-xl font-bold">Add Food</h2>
          <div className="mt-8 flex flex-col gap-y-4">
            <FileUpload 
              name="image"
              label="Image"
              onChange={handleFileChange}
              value={file}
              error={error}
            />
            <SingleLineText
              name="title"
              label="Title"
              placeholder="Input Title Food ..."
              onChange={handleOnChange}
              value={form?.title}
              error={errors.title}
            />
            <SingleLineText
                type="number"
                name="price"
                label="Price"
                placeholder="Input Price Food ..."
                onChange={handleOnChange}
                value={form?.price}
                error={errors.price}
              />
          </div>
        </div>
        <div className="flex justify-end gap-x-2 mt-8">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => {
              document.getElementById(`modal-dashboard-add-food-close`).click();
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id={`modal-dashboard-add-food-close`}>close</button>
      </form>
    </dialog>
  );
};
