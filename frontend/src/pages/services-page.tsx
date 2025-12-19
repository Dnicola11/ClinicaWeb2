import { DEFAULT_SERVICE, Service } from "features/services/service";
import { ServiceDrawer } from "features/services/service-drawer";
import { setServiceDrawerVisibility, useGetServicesQuery } from "features/services/service-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ServicesPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetServicesQuery();
  const [id, setId] = useState("");
  const item = id ? data?.find((i) => i.id === id) : DEFAULT_SERVICE;

  const columns: TableColumnProp[] = [
    { field: "name", header: "Nombre" },
    { field: "duration", header: "Duración" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = (row: Service) => {
    dispatch(setServiceDrawerVisibility(true));
    setId(row.id);
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ocurrio un error.</div>;
  return (
    <>
      <BaseTable onEdit={handleEdit} data={data ?? []} columns={columns} />;
      <ServiceDrawer data={item} />
    </>
  );
};
