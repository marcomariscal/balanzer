import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAccountInAPI } from "../actions/currentUser";
import { Form } from "react-bootstrap";
import exchangesWithPassphrases from "../helpers/exchangesWithPassphrase";
import Alert from "./Alert";
import "./ExchangeConnectionForm.scss";
import PrimaryButton from "./PrimaryButton";

const ExchangeConnectionForm = ({ exchangeName }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, creatingAccount } = useSelector((st) => st.currentUser);

  // show the passphrase input if the exchange requires it
  const hasPassphrase =
    exchangesWithPassphrases.indexOf(exchangeName) !== -1 ? true : false;

  const [formData, setFormData] = useState({
    publicKey: "",
    privateKey: "",
    passphrase: "",
    formErrors: [],
  });
  const [inValidForm, setInvalidForm] = useState(true);

  const handleChange = (e) => {
    setInvalidForm(false);
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { publicKey, privateKey, passphrase } = formData;
    const { username, shrimpy_user_id } = user;
    const accountData = {
      userId: shrimpy_user_id,
      exchangeName,
      publicKey,
      privateKey,
      passphrase,
    };

    // create exchange account connection using the api key user inputted data and the exchange name
    try {
      dispatch(createAccountInAPI(username, accountData));
      history.push("/dashboard");
    } catch (errors) {
      setFormData((fData) => ({
        ...fData,
        formErrors: [errors],
      }));
    }
  };

  return (
    <div className="ExchangeConnectionForm">
      <form autoComplete="off">
        <Form.Group>
          <Form.Label>Public Api Key</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Enter public API key"
            value={formData.publicKey}
            name="publicKey"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Private Api Key</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Enter private API key"
            value={formData.privateKey}
            name="privateKey"
          />
        </Form.Group>

        {hasPassphrase && (
          <Form.Group>
            <Form.Label>Passphrase</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              placeholder="Enter passphrase"
              value={formData.passphrase}
              name="passphrase"
            />
            <Form.Text className="text-muted">
              <span>Sometimes known as API secret or secret passphrase</span>
            </Form.Text>
          </Form.Group>
        )}
        {formData.formErrors.length ? (
          <Alert type="danger" messages={formData.formErrors} />
        ) : null}

        <PrimaryButton
          submitFunc={handleSubmit}
          textDisabled={`Connect to ${exchangeName}`}
          textPrimary={`Connect to ${exchangeName}`}
          loadingText="Connecting..."
          disabled={inValidForm}
          loading={creatingAccount}
        />
      </form>
    </div>
  );
};

export default ExchangeConnectionForm;
