import { useState } from "react";
import {
  Popover,
  Stack,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  AddRounded,
  CloseRounded,
  CheckCircleOutlineRounded,
  DeleteOutlineRounded,
  CalendarMonthRounded,
} from "@mui/icons-material";

export interface FilterRow {
  id: string;
  column: "number" | "date" | "description";
  operator: string;
  value: string;
  secondValue?: string; // برای حالت "بین" در تاریخ
}

interface VouchersFilterPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: FilterRow[]) => void;
}

const AVAILABLE_COLUMNS = [
  { id: "number", label: "شماره" },
  { id: "date", label: "تاریخ سند" },
  { id: "description", label: "شرح" },
] as const;

const COLUMN_OPERATORS = {
  number: [
    { id: "eq", label: "=" },
    { id: "gte", label: ">=" },
    { id: "lte", label: "<=" },
  ],
  date: [
    { id: "eq", label: "برابر با" },
    { id: "after", label: "پس از" },
    { id: "before", label: "پیش از" },
    { id: "between", label: "بین" },
  ],
  description: [{ id: "contains", label: "شامل" }],
};

export function VouchersFilterPopover({
  anchorEl,
  open,
  onClose,
  onApplyFilters,
}: VouchersFilterPopoverProps) {
  const [filters, setFilters] = useState<FilterRow[]>([
    { id: "1", column: "number", operator: "eq", value: "" },
  ]);

  const handleAddFilter = () => {
    setFilters((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        column: "number",
        operator: "eq",
        value: "",
      },
    ]);
  };

  const handleRemoveFilter = (id: string) => {
    setFilters((prev) => prev.filter((item) => item.id !== id));
  };

  const handleColumnChange = (
    id: string,
    newColumn: "number" | "date" | "description"
  ) => {
    const defaultOperator = COLUMN_OPERATORS[newColumn][0].id;
    setFilters((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              column: newColumn,
              operator: defaultOperator,
              value: "",
              secondValue: "",
            }
          : item
      )
    );
  };

  const handleFieldChange = (
    id: string,
    field: keyof FilterRow,
    value: string
  ) => {
    setFilters((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleClearAll = () => {
    setFilters([
      { id: Date.now().toString(), column: "number", operator: "eq", value: "" },
    ]);
  };

  const handleApply = () => {
    onApplyFilters?.(filters);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        paper: {
          sx: {
            mt: 0.5,
            p: 2,
            width: 520,
            maxWidth: "95vw",
            borderRadius: 0,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          },
        },
      }}
    >
      <Stack spacing={1.5}>
        {/* ردیف‌های فیلتر */}
        <Stack
          spacing={1.5}
          sx={{
            pt: 1.2,
            pb: 0.5,
            maxHeight: 280,
            overflowY: "auto",
            pr: 0.5,
          }}
        >
          {filters.map((filter) => {
            const currentOperators = COLUMN_OPERATORS[filter.column] || [];

            return (
              <Stack
                key={filter.id}
                direction="row"
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                {/* کنترل داینامیک مقدار: اگر تاریخ باشد، فیلد DatePicker شمسی با آیکون تقویم و پلیس‌هولدر YYYY/MM/DD */}
                {filter.column === "date" ? (
                  filter.operator === "between" ? (
                    /* حالت بین دو تاریخ */
                    <Stack direction="row" spacing={0.8} sx={{ flex: 1.4 }}>
                      <TextField
                        variant="standard"
                        label="از تاریخ"
                        placeholder="YYYY/MM/DD"
                        value={filter.value}
                        onChange={(e) =>
                          handleFieldChange(filter.id, "value", e.target.value)
                        }
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarMonthRounded
                                  sx={{ color: "#1976d2", fontSize: 20, cursor: "pointer" }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          flex: 1,
                          "& .MuiInputBase-input": { fontSize: 13, py: 0.5 },
                          "& .MuiInputLabel-root": { fontSize: 13 },
                        }}
                      />
                      <TextField
                        variant="standard"
                        label="تا تاریخ"
                        placeholder="YYYY/MM/DD"
                        value={filter.secondValue || ""}
                        onChange={(e) =>
                          handleFieldChange(filter.id, "secondValue", e.target.value)
                        }
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarMonthRounded
                                  sx={{ color: "#1976d2", fontSize: 20, cursor: "pointer" }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          flex: 1,
                          "& .MuiInputBase-input": { fontSize: 13, py: 0.5 },
                          "& .MuiInputLabel-root": { fontSize: 13 },
                        }}
                      />
                    </Stack>
                  ) : (
                    /* حالت تک تاریخ (برابر با، پیش از، پس از) */
                    <TextField
                      variant="standard"
                      label="تاریخ سند"
                      placeholder="YYYY/MM/DD"
                      value={filter.value}
                      onChange={(e) =>
                        handleFieldChange(filter.id, "value", e.target.value)
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthRounded
                                sx={{ color: "#1976d2", fontSize: 20, cursor: "pointer" }}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        flex: 1.2,
                        "& .MuiInputBase-input": { fontSize: 13, py: 0.5 },
                        "& .MuiInputLabel-root": { fontSize: 13 },
                      }}
                    />
                  )
                ) : (
                  /* برای شماره و شرح */
                  <TextField
                    size="small"
                    label="مقدار"
                    placeholder="فیلتر مقدار"
                    value={filter.value}
                    onChange={(e) =>
                      handleFieldChange(filter.id, "value", e.target.value)
                    }
                    sx={{
                      flex: 1.2,
                      "& .MuiOutlinedInput-root": { borderRadius: 0 },
                      "& .MuiInputBase-input": { py: 0.8, fontSize: 13 },
                    }}
                  />
                )}

                {/* فیلد عملگرها */}
                <FormControl size="small" sx={{ width: 105 }}>
                  <InputLabel sx={{ fontSize: 13 }}>عملگرها</InputLabel>
                  <Select
                    value={filter.operator}
                    label="عملگرها"
                    onChange={(e) =>
                      handleFieldChange(filter.id, "operator", e.target.value)
                    }
                    sx={{
                      borderRadius: 0,
                      fontSize: 13,
                      "& .MuiSelect-select": { py: 0.8 },
                    }}
                  >
                    {currentOperators.map((op) => (
                      <MenuItem key={op.id} value={op.id} sx={{ fontSize: 13 }}>
                        {op.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* فیلد ستون‌ها */}
                <FormControl size="small" sx={{ width: 120 }}>
                  <InputLabel sx={{ fontSize: 13 }}>ستون‌ها</InputLabel>
                  <Select
                    value={filter.column}
                    label="ستون‌ها"
                    onChange={(e) =>
                      handleColumnChange(
                        filter.id,
                        e.target.value as "number" | "date" | "description"
                      )
                    }
                    sx={{
                      borderRadius: 0,
                      fontSize: 13,
                      "& .MuiSelect-select": { py: 0.8 },
                    }}
                  >
                    {AVAILABLE_COLUMNS.map((col) => (
                      <MenuItem key={col.id} value={col.id} sx={{ fontSize: 13 }}>
                        {col.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* دکمه حذف سطر */}
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFilter(filter.id)}
                  disabled={filters.length === 1}
                  sx={{
                    borderRadius: 0,
                    color: "text.disabled",
                    p: 0.5,
                    "&:hover": { color: "error.main" },
                  }}
                >
                  <CloseRounded sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            );
          })}
        </Stack>

        <Divider />

        {/* فوتر عملیات */}
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={0.5}>
            <Button
              variant="text"
              color="inherit"
              size="small"
              startIcon={<DeleteOutlineRounded sx={{ fontSize: 16 }} />}
              onClick={handleClearAll}
              sx={{
                borderRadius: 0,
                fontWeight: 600,
                fontSize: 12,
                color: "text.secondary",
                px: 1,
              }}
            >
              حذف همه
            </Button>

            <Button
              variant="text"
              color="primary"
              size="small"
              startIcon={<CheckCircleOutlineRounded sx={{ fontSize: 16 }} />}
              onClick={handleApply}
              sx={{
                borderRadius: 0,
                fontWeight: 700,
                fontSize: 12,
                px: 1,
              }}
            >
              اعمال
            </Button>
          </Stack>

          <Button
            variant="text"
            color="primary"
            size="small"
            startIcon={<AddRounded sx={{ fontSize: 16 }} />}
            onClick={handleAddFilter}
            sx={{
              borderRadius: 0,
              fontWeight: 700,
              fontSize: 12,
              px: 1,
            }}
          >
            افزودن فیلتر
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
}