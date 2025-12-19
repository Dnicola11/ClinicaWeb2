import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

export const BaseToolbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (to: string) => {
    navigate(to);
  };
  const items: MenuItem[] = [
    {
      label: "Citas",
      icon: "pi pi-calendar",
      command: () => handleNavigation("/appointments"),
    },
    {
      label: "Medicos",
      icon: "pi pi-star",
      command: () => handleNavigation("/experts"),
    },
    {
      label: "Especialidades",
      icon: "pi pi-search",
      command: () => handleNavigation("/services"),
    },
    {
      label: "Pacientes",
      icon: "pi pi-envelope",
      command: () => handleNavigation("/clients"),
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
};
