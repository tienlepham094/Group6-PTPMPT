import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AccountSetting.css";
import { IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
interface AccountSettingProps {
  userName?: string;
}
const AccountSetting = ({ userName }: AccountSettingProps) => {
  const [isDrop, setIsDrop] = useState(false);
  const setIconClicked = () => {
    setIsDrop(!isDrop);
  };
  return (
    <div className="account-setting">
      <AccountCircleIcon className="account-icon" />
      <Typography>{userName}</Typography>
      {isDrop ? (
        <IconButton onClick={setIconClicked}>
          <ArrowDropUpIcon />
        </IconButton>
      ) : (
        <IconButton onClick={setIconClicked}>
          <ArrowDropDownIcon />
        </IconButton>
      )}
    </div>
  );
};

export default AccountSetting;
