import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAccountInAPI } from "../actions/currentUser";
import { Form, Button } from "react-bootstrap";
import exchangesWithPassphrases from "../helpers/exchangesWithPassphrase";
import Alert from "./Alert";
import Spinner from "./Spinner";
import "./ExchangeConnectionForm.scss";

const ExchangeConnectionForm = ({ exchangeName }) => {
  const { currentUser, userId } = useSelector((st) => st.users);
  const { loading, errors } = useSelector((st) => st.general);

  // show the passphrase input if the exchange requires it
  const hasPassphrase =
    exchangesWithPassphrases.indexOf(exchangeName) !== -1 ? true : false;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    publicKey: "",
    privateKey: "",
    passphrase: "",
    formErrors: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { publicKey, privateKey, passphrase } = formData;
      const accountData = {
        userId,
        exchangeName,
        publicKey,
        privateKey,
        passphrase,
      };

      // create exchange account connection using the api key user inputted data and the exchange name
      dispatch(createAccountInAPI(currentUser, accountData));
    } catch (errors) {
      return setFormData((fData) => ({ ...fData, formErrors: errors }));
    }
  };

  return (
    <div className="ExchangeConnectionForm">
      <form onSubmit={handleSubmit}>
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
        {errors.length ? <Alert type="danger" messages={errors} /> : null}

        <Button variant="dark" type="submit">
          {loading ? <Spinner /> : <>Connect to {exchangeName}</>}
        </Button>
      </form>
    </div>
  );
};

export default ExchangeConnectionForm;
