import { foods } from "@/dummy/food";
import { formatRupiah } from "@/helpers/formatRupiah";
import Image from "next/image";
import React from "react";
import { TbTrashFilled } from "react-icons/tb";
import { FaPenAlt } from "react-icons/fa";
import { ModalConfirmDeleteFood } from "../components/ModalConfirmDeleteFood";
import { ModalEditFood } from "../components/ModalEditFood";
import { ModalAddFood } from "../components/ModalAddFood";
import { useGetFood } from "../hooks/useGetFood";

export const Foods = () => {
  const id = React.useId();

 const { data, refetch } = useGetFood({isLanding: false});

  return (
    <div className="w-full p-4">
      <div className="flex justify-between">
        <h2>Foods</h2>
        <div>
          <button
            className="btn btn-xs btn-primary"
            onClick={() =>
              document.getElementById(`modal-dashboard-add-food`)?.showModal()
            }
          >
            Add
          </button>
          <ModalAddFood refetch={refetch}/>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr> 
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={`${id}-${item.title}-${item.id}`}> 
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={item.image}
                          alt={`${item.id}-${item.title}`}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>{formatRupiah(item.price)}</td>
                <th>
                  <div className="flex gap-x-1">
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() =>
                        document
                          .getElementById(
                            `${item.id}-modal-dashboard-edit-food`
                          )
                          ?.showModal()
                      }
                    >
                      <FaPenAlt />
                    </button>
                    <ModalEditFood item={item} refetch={refetch} />
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() =>
                        document
                          .getElementById(`${item.id}-food-modal-delete`)
                          ?.showModal()
                      }
                    >
                      <TbTrashFilled />
                    </button>
                    <ModalConfirmDeleteFood item={item} refetch={refetch} />
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
