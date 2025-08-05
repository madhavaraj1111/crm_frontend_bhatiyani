// ContactList.tsx
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  TablePagination,
  Fade,
} from "@mui/material";
import {
  Delete,
  Edit,
  Person,
  Email,
  Phone,
  Business,
  Search,
  FilterList,
  Add,
} from "@mui/icons-material";
import useContactStore from "../store/useContactStore";
import ContactForm from "./ContactForm";

const ContactList: React.FC = () => {
  const { contacts, fetchContacts, deleteContact } = useContactStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const paginatedContacts = filteredContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Person sx={{ mr: 1, color: "primary.main", fontSize: 28 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              Contact Management
            </Typography>
          </Box>
          <IconButton
            onClick={() => setShowForm(!showForm)}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <Add />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your customer contacts and relationships
        </Typography>
      </Box>

      {/* Contact Form - Only renders when showForm is true */}
      {showForm && (
        <Fade in={showForm}>
          <Box sx={{ mb: 3 }}>
            <ContactForm onSuccess={() => setShowForm(false)} />
          </Box>
        </Fade>
      )}

      {/* Search and Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            placeholder="Search contacts by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "grey.50",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
            <Typography
              variant="h4"
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              {filteredContacts.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Contacts
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Enhanced Table */}
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Contact
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Company
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedContacts.map((contact, index) => (
                <TableRow
                  key={contact.id}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "grey.50" },
                    "&:hover": {
                      bgcolor: "primary.50",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Subtle shadow instead
                    },
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          mr: 2,
                          bgcolor: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {contact.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {contact.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {contact.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Email
                        sx={{ mr: 1, color: "primary.main", fontSize: 18 }}
                      />
                      <Typography variant="body2">{contact.email}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Phone
                        sx={{ mr: 1, color: "success.main", fontSize: 18 }}
                      />
                      <Typography variant="body2">
                        {contact.phone || "Not provided"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {contact.company ? (
                      <Chip
                        icon={<Business />}
                        label={contact.company}
                        size="small"
                        sx={{
                          bgcolor: "warning.100",
                          color: "warning.800",
                          fontWeight: 500,
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No company
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          color: "primary.main",
                          "&:hover": { bgcolor: "primary.100" },
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteContact(contact.id)}
                        sx={{
                          color: "error.main",
                          "&:hover": { bgcolor: "error.100" },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredContacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: "1px solid", borderColor: "divider" }}
        />
      </Paper>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Person sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? "No contacts found" : "No contacts yet"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Add your first contact to get started"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ContactList;
