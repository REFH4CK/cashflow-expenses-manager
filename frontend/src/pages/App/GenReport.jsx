import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "@pheralb/toast";
import { Fade } from "react-awesome-reveal";
import { useAuth } from "@/context/useAuth";
import { AsideBar } from "@/components/App/AsideBar";
import { FormGroup } from "@/components/App/FormGroup";
import { AllMovements } from "@/components/App/AllMovements";
import { CurrencySelect } from "@/components/App/CurrencySelect";

export function GenReport() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success({
      text: "Logout successful!",
      description: "You have been logged out.",
    });
    navigate("/login");
  };

  const [filters, setFilters] = useState({
    date: "",
    description: "",
    id_currency: "",
    movement_type: "",
    UID: user.id,
  });

  const [responseData, setResponseData] = useState({
    movements: [],
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 1,
    },
  });
  const [loading, setLoading] = useState(false);

  const fetchMovements = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/cashflow/api/all_movs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...filters,
            page: page,
            perPage: 9,
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const { data, pagination } = await response.json();

      setResponseData({
        movements: data,
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
          total: pagination.total,
          totalPages: pagination.totalPages,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      setResponseData({
        movements: [],
        pagination: {
          page: 1,
          perPage: 9,
          total: 0,
          totalPages: 1,
        },
      });

      toast.info({
        text: "Don't have movements to show.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar envío de filtros
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchMovements(1); // Resetear a primera página al aplicar nuevos filtros
  };

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= responseData.pagination.totalPages) {
      fetchMovements(newPage);
    }
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <section className={`bg-[#1F252F] h-screen flex`}>
        <AsideBar log={handleLogout} />
        <section className="flex flex-col p-2 gap-4 md:gap-8 items-center w-full sm:p-4 md:p-0 sm:pt-[2rem] md:pt-[4rem] overflow-y-auto overflow-x-hidden md:overflow-y-hidden">
          <Fade className="w-full" triggerOnce direction="left">
            <h2 className="text-2xl sm:text-4xl font-semibold font-lexend text-oxford-blue-200 text-left w-full mt-6 sm:mt-0 sm:pl-0 md:pl-16">
              Savings reports
            </h2>
          </Fade>
          <Fade triggerOnce direction="up" className="sm:w-full md:w-fit">
            <article className="bg-[#28303E] rounded-xl w-full h-fit sm:h-fit md:w-[67rem] md:h-[42rem]">
              <header className="pb-6 border-b border-oxford-blue-600/50">
                <form className="pt-8 pl-6" onSubmit={handleSubmit}>
                  <div className="flex items-end gap-4 flex-wrap">
                    <Fade triggerOnce cascade damping={0.2}>
                      <FormGroup
                        type="date"
                        label="Date"
                        name="date"
                        value={filters.date}
                        onChange={handleInputChange}
                        width="6"
                      />
                      <FormGroup
                        type="text"
                        label="Description"
                        name="description"
                        placeholder="Search by description"
                        value={filters.description}
                        onChange={handleInputChange}
                        width="5"
                      />
                      <CurrencySelect
                        id={user.id}
                        name="id_currency"
                        value={filters.id_currency}
                        onChange={handleInputChange}
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="movement_type"
                          className="text-white/50 font-lexend text-[0.90rem] font-light"
                        >
                          Inflow/Outflow
                        </label>
                        <select
                          name="movement_type"
                          id="movement_type"
                          className="bg-oxford-blue-700 md:w-[14rem] h-[2.5rem] text-white/65 rounded-lg p-2 px-3"
                          value={filters.movement_type}
                          onChange={handleInputChange}
                        >
                          <option value="">All movements</option>
                          <option value="income">Inflow</option>
                          <option value="expense">Outflow</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="bg-[#50759C] p-2 rounded-xl hover:bg-[#507fb1] transition-colors flex gap-2 sm:w-[20rem] md:w-fit justify-center"
                      >
                        <span className="md:hidden text-[#C5D1DE] font-lexend">Search</span>
                        <img
                          src="https://img.icons8.com/?size=100&id=131&format=png&color=C5D1DE"
                          alt="Search icon"
                          className="size-6"
                        />
                      </button>
                    </Fade>
                  </div>
                </form>
              </header>
              <section className="relative h-[39rem] sm:h-[36.5rem] md:h-[34rem] flex items-start justify-center w-[15.75rem] sm:w-full">
                <AllMovements
                  movements={responseData.movements}
                  pagination={responseData.pagination}
                  loading={loading}
                  onPageChange={handlePageChange}
                />
              </section>
            </article>
          </Fade>
        </section>
      </section>
    </>
  );
}
