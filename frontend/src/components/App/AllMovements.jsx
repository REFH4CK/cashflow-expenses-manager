import PropTypes from "prop-types";
import { PuffLoader } from "react-spinners";

export function AllMovements({
  movements = [],
  pagination = {},
  loading = false,
  onPageChange,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center mt-[8rem] sm:mt-[15rem]">
        <PuffLoader size={64} color="#b35925"></PuffLoader>
      </div>
    );
  }

  if (!movements.length) {
    return (
      <div className="flex items-center justify-center mt-[8rem] sm:mt-[15rem] bg-tree-poppy-600/20 w-[15rem] mx-auto p-4 rounded-lg">
        <p className="text-white/85">No movements found</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100%-4rem)] flex flex-col">
      {/* Tabla de movimientos */}
      <div className="flex-grow overflow-y-hidden">
        <table className="w-full text-white/80">
          <thead className="border-b border-oxford-blue-600/50 sticky top-0 bg-[#28303E]">
            <tr>
              <th className="text-left py-3 px-6">Type</th>
              <th className="text-left py-3 px-6">Amount</th>
              <th className="text-left py-3 px-6">Currency</th>
              <th className="text-left py-3 px-6">Description</th>
              <th className="text-left py-3 px-6">Date</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, i) => (
              <tr
                key={i}
                className="border-b border-oxford-blue-600/20 hover:bg-oxford-blue-700/50"
              >
                <td
                  className={`py-[0.718rem] px-6 font-bold font-lexend ${
                    movement.movement_type === "income"
                      ? "text-[#4CAF50]"
                      : "text-[#ff7369]"
                  }`}
                >
                  {movement.movement_type === "income" ? "+" : "-"}
                  {movement.quantity}
                </td>
                <td
                  className={`py-[0.718rem] px-6 font-lexend font-bold ${
                    movement.movement_type === "income"
                      ? "text-[#4CAF50]"
                      : "text-[#ff7369]"
                  }
                  `}
                >
                  <span
                    className={`px-2 rounded-md ${
                      movement.movement_type === "income"
                        ? "bg-[#b8ffb91e]"
                        : "bg-[#fd8a821e]"
                    }`}
                  >
                    {movement.movement_type === "income" ? "Inflow" : "Outflow"}
                  </span>
                </td>
                <td className="py-[0.718rem] px-6 font-lexend font-light">
                  {movement.prefer_currency}
                </td>
                <td className="py-[0.718rem] px-6 sm:text-sm md:text-base font-lexend font-light">
                  {movement.description}
                </td>
                <td className="py-[0.718rem] px-6 font-lexend font-light">
                  {new Date(movement.DATE + "T00:00:00").toLocaleDateString(
                    "en-US"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between p-4 border-t border-oxford-blue-600/50 absolute bottom-0 left-0 w-full">
        <div className="text-white/50 text-sm">
          Showing {(pagination.page - 1) * pagination.perPage + 1}-
          {Math.min(pagination.page * pagination.perPage, pagination.total)} of{" "}
          {pagination.total}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-3 py-1 rounded bg-oxford-blue-700 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from(
            { length: Math.min(5, pagination.totalPages) },
            (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1 rounded ${
                    pagination.page === pageNum
                      ? "bg-[#50759C] text-white"
                      : "bg-oxford-blue-700 text-white/70"
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
          )}
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="px-3 py-1 rounded bg-oxford-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

AllMovements.propTypes = {
  movements: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      prefer_currency: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      movement_type: PropTypes.string.isRequired,
      DATE: PropTypes.string.isRequired,
    })
  ),
  pagination: PropTypes.shape({
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
  }),
  loading: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
};
