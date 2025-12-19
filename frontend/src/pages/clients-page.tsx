import { Client, DEFAULT_CLIENT } from "features/clients/client";
import { ClientDrawer } from "features/clients/client-drawer";
import { setClientDrawerVisibility, useGetClientsQuery } from "features/clients/client-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ClientsPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetClientsQuery();

  const [id, setId] = useState(0);
  const item = id ? data?.find((i) => i.id === id) : DEFAULT_CLIENT;

  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nombre de Usuario" },
    { field: "firstName", header: "Nombres" },
    { field: "lastName", header: "Apellido" },
    { field: "phoneNumber", header: "Número de Teléfono" },
    { field: "note", header: "Nota" },
  ];

  const handleEdit = (row: Client) => {
    setId(row.id);
    dispatch(setClientDrawerVisibility(true));
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ocurrio un error.</div>;

  return (
    <>
      <BaseTable onEdit={handleEdit} data={data ?? []} columns={columns} />;
      <ClientDrawer data={item} />
    </>
  );
};
