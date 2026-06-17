"use client"

import { useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import CloseIcon from "@mui/icons-material/Close"

interface AddCreativeDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (creatives: any[]) => void
  options: { id: number; label: string }[]
}

export function AddCreativeDialog({ open, onClose, onAdd, options }: AddCreativeDialogProps) {
  const [selectedCreatives, setSelectedCreatives] = useState<any[]>([])

  const handleClose = () => {
    setSelectedCreatives([])
    onClose()
  }

  const handleAdd = () => {
    if (selectedCreatives.length > 0) {
      onAdd(selectedCreatives)
      setSelectedCreatives([])
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "500px",
          maxWidth: "90vw",
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, fontSize: "18px", fontWeight: 500 }}>Add Creatives</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ mt: 1 }}>
          <Autocomplete
            multiple
            fullWidth
            options={options}
            getOptionLabel={(option) => option.label}
            value={selectedCreatives}
            onChange={(_, newValue) => setSelectedCreatives(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const tagProps = getTagProps({ index })
                const { key, ...otherProps } = tagProps

                return (
                  <Chip
                    key={key}
                    label={option.label}
                    {...otherProps}
                    // Bare "X" instead of MUI's default circle-X (CancelIcon).
                    deleteIcon={<CloseIcon />}
                    sx={{
                      // Neutral grey "selection token" pill (kit grey = action.selected).
                      // Shape (pill radius) comes from the kit theme's MuiChip override.
                      bgcolor: "action.selected",
                      color: "text.primary",
                      fontWeight: 500,
                      fontSize: 13,
                      height: "24px",
                      "& .MuiChip-deleteIcon": {
                        fontSize: 16,
                        color: "text.secondary",
                        "&:hover": {
                          color: "text.primary",
                        },
                      },
                    }}
                  />
                )
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Creative"
                placeholder={selectedCreatives.length === 0 ? "Search to Select" : ""}
                variant="outlined"
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === "Enter" && selectedCreatives.length > 0) {
                    e.preventDefault()
                    handleAdd()
                  }
                }}
                // Keep the label floated above the persistent "Search to Select"
                // placeholder. MUI sizes the notched-outline <legend> from the
                // label automatically, so the border cuts a proper gap for it.
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: "primary.main",
            fontWeight: 500,
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "rgba(239, 0, 120, 0.1)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          disabled={selectedCreatives.length === 0}
          sx={{
            fontWeight: 500,
            textTransform: "uppercase",
            opacity: selectedCreatives.length === 0 ? 0.5 : 1,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          Add {selectedCreatives.length > 0 ? `(${selectedCreatives.length})` : ""}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

