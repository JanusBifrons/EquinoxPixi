import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper, Typography } from "@mui/material";
import { Fragment } from "react";
import MissionCard from "./MissionCard";



export interface IMissionsDialogProps {
    show: boolean;
    onClose: () => void;
}

export default function MissionDialog(props: IMissionsDialogProps) {
    return (
        <Modal open={props.show} onClose={() => { props.onClose(); }} className="flex justify-center items-center">
            <div className="bg-white h-3/4 w-1/2  overflow-auto border-black">
                <MissionCard></MissionCard>
                <MissionCard></MissionCard>
                <MissionCard></MissionCard>
                <MissionCard></MissionCard>
                <MissionCard></MissionCard>
                <MissionCard></MissionCard>
                <MissionCard></MissionCard>
            </div>
        </Modal>
    );
}