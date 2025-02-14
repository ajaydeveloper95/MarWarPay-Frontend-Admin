import { useState, useRef } from "react";
import { Button, Menu, MenuItem, Modal, Box, TextField } from "@mui/material";
import { apiPost } from "../../../utils/http";
import { Bounce, toast } from "react-toastify";

const StatusDropdown = ({ item, setData }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const buttonRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [bankRRN, setBankRRN] = useState("");
    const [optxId, setOptxId] = useState("");

    const handleClick = (event) => {
        if (item.status === "Pending") {
            setAnchorEl(event.currentTarget);
        }
    };

    const updateData = (txnId, status) => {
        setData((prevData) => {
            // const filteredData = prevData.filter((i) => i.txnId !== txnId);
            // const updatedItem = prevData.find((i) => i.txnId === txnId);

            // return updatedItem ? [{ ...updatedItem, status }, ...filteredData] : prevData;
            const oldData = JSON.parse(JSON.stringify(prevData))
            return oldData.map((item) => {
                if (item.txnId === txnId) {
                    return {
                        ...item,
                        status: status
                    }
                }
                return item
            })
        });
    };


    const handleClose = async (newStatus) => {
        try {
            let payload = {
                trxId: item.txnId,
                memberId: item.memberId,
                status: "failed"
            }
            if (newStatus === "Success") {
                setModalOpen(true);
            } else if (newStatus === "Failed") {
                await apiPost("apiAdmin/v1/payout/payoutStatusUpdate", payload);
                updateData(item.txnId, newStatus);
            }
        } catch (error) {
            console.log("handleClose ~ error:", error);
        } finally {
            setAnchorEl(null);
        }

    };

    const handleSuccess = async () => {
        if (!bankRRN) {
            toast.error('Bank RRN is mandatory!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            return
        }
        let payload = {
            trxId: item.txnId,
            memberId: item.memberId,
            status: "Success",
            bankRRN: bankRRN,
            optxId: optxId,
        }
        await apiPost("apiAdmin/v1/payout/payoutStatusUpdate", payload);
        updateData(item.txnId, "Success");
        setModalOpen(false)
    }

    return (
        <>
            {/* Status Button */}
            <Button
                ref={buttonRef}
                sx={{
                    color:
                        item.status === "Success"
                            ? "green"
                            : item.status === "Failed"
                                ? "red"
                                : "orange",
                    backgroundColor:
                        item.status === "Success"
                            ? "rgba(0, 128, 0, 0.1)"
                            : item.status === "Failed"
                                ? "rgba(255, 0, 0, 0.1)"
                                : "rgba(255, 165, 0, 0.1)",
                    borderRadius: 2,
                    padding: "2px 10px",
                }}
                onClick={handleClick}
            >
                {item.status}
            </Button>

            {/* Dropdown (only opens when status is Pending) */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose(null)}
            >
                <MenuItem onClick={() => handleClose("Success")}>Success</MenuItem>
                <MenuItem onClick={() => handleClose("Failed")}>Failed</MenuItem>
            </Menu>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    {/* <h2>Success Form</h2> */}
                    <TextField label="Transaction Id" disabled value={item.txnId} slotProps={{ inputLabel: { shrink: true } }} fullWidth sx={{ mb: 2 }} />
                    <TextField label="Bank RRN" value={bankRRN} required onChange={(e) => setBankRRN(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    <TextField label="Optx Id" fullWidth value={optxId} onChange={(e) => setOptxId(e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Member Id" disabled slotProps={{ inputLabel: { shrink: true } }} value={item.memberId} fullWidth sx={{ mb: 2 }} />
                    <TextField label="Status" disabled slotProps={{ inputLabel: { shrink: true } }} value={"Success"} fullWidth sx={{ mb: 2 }} />
                    <Button variant="contained" color="primary" onClick={handleSuccess}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default StatusDropdown;
