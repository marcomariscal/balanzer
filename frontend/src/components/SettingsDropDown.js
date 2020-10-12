import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import {
  updatePermissionsInAPI,
  deleteAccountInAPI,
  getPermissionsFromAPI,
} from "../actions/currentUser";
import Spinner from "./Spinner";
import "./SettingsDropDown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import PrimaryButton from "./PrimaryButton";

const SettingsDropDown = () => {
  const history = useHistory();
  const [loadingTradePermish, setLoadingTradePermish] = useState(false);
  const [loadingAccountPermish, setLoadingAccountPermish] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const { user, permissions, currentAccount } = useSelector(
    (st) => st.currentUser
  );
  const dispatch = useDispatch();

  const handleAccountSettingChange = (checked) => {
    setLoadingAccountPermish(true);

    const data = { account: checked, trade: permissions.trade };
    dispatch(updatePermissionsInAPI(user.username, data));

    setLoadingAccountPermish(false);
  };

  const handleTradeSettingChange = (checked) => {
    setLoadingTradePermish(true);

    const data = { trade: checked, account: permissions.account };
    dispatch(updatePermissionsInAPI(user.username, data));

    setLoadingTradePermish(false);
  };

  const handleDeleteAccount = (e) => {
    setDeletingAccount(true);
    dispatch(deleteAccountInAPI(user.username, currentAccount.id));
    history.push("/dashboard");
    setDeletingAccount(false);
  };

  useEffect(() => {
    async function getPermissions() {
      dispatch(getPermissionsFromAPI(user.username));
    }

    getPermissions();
  }, []);

  if (!permissions) return null;

  return (
    <NavDropdown
      title={<FontAwesomeIcon icon={faCog} />}
      id="settings-dropdown"
      className="SettingsDropDown"
    >
      <NavDropdown.Item className="settings-dropdown-item">
        <div onClick={(e) => e.stopPropagation()}>
          {loadingAccountPermish ? (
            <Spinner />
          ) : (
            <label>
              <span className="setting-span">Account View Enabled</span>
              <Switch
                className="react-switch"
                onColor="#00d897"
                onChange={handleAccountSettingChange}
                checked={permissions.account}
                height={25}
                width={45}
                handleDiameter={18}
              />
            </label>
          )}
        </div>
      </NavDropdown.Item>
      <NavDropdown.Item className="settings-dropdown-item">
        <div onClick={(e) => e.stopPropagation()}>
          {loadingTradePermish ? (
            <Spinner />
          ) : (
            <label>
              <span className="setting-span">Trading Enabled</span>
              <Switch
                className="react-switch"
                onColor="#00d897"
                onChange={handleTradeSettingChange}
                checked={permissions.trade}
                height={25}
                width={45}
                handleDiameter={18}
              />
            </label>
          )}
        </div>
      </NavDropdown.Item>
      <NavDropdown.Item className="settings-dropdown-item">
        <div
          className="delete-button-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <label>
            <span className="setting-span">Delete Exchange Connection</span>
            {
              <PrimaryButton
                className="delete-button"
                submitFunc={handleDeleteAccount}
                textPrimary="Delete"
                loadingText="Deleting..."
                loading={deletingAccount}
              />
            }
          </label>
        </div>
      </NavDropdown.Item>
    </NavDropdown>
  );
};
export default SettingsDropDown;
