import { Avatar } from "@mui/material";

import AlecAvatar from '../../../public/avatar.jpg'

export default function Account() {
    return (
        <div className="absolute top-0 right-0 p-5">
            <div className="flex flex-col gap-5">
                <Avatar src={AlecAvatar.src} sx={{ width: 32, height: 32 }} />
            </div>
        </div>
    );
}