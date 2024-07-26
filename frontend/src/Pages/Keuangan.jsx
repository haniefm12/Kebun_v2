import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useFinances } from "../app/api/api";
import LoadingState from "../Components/state/LoadingState";
import ErrorNoData from "../Components/state/ErrorNoData";
import FinanceTable from "../Components/Table/FinanceTable";
import NewData from "../Components/FloatButton/NewData";

const Keuangan = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const {
    data: finances,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFinances();

  useEffect(() => {
    if (isSuccess) {
      const total = finances.ids.reduce(
        (acc, financeId) =>
          acc + (finances.entities[financeId]?.totalCost || 0),
        0
      );
      setTotalExpenses(total);
    }
  }, [finances, isSuccess]);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorNoData error={error} />;

  return (
    <Box pl={4} pb={2} pt={2} pr={2}>
      <Typography pl={2} pb={0} variant="h4">
        Keuangan
      </Typography>
      <Typography variant="h6" sx={{ mt: 0, textAlign: "right" }}>
        Total Pengeluaran: Rp. {totalExpenses.toLocaleString("id-ID")},-
      </Typography>
      <FinanceTable finances={finances} />
      <NewData />
    </Box>
  );
};

export default Keuangan;
