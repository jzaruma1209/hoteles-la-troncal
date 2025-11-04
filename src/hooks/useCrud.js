import axios from "axios";
import { useState } from "react";
import getConfigToken from "../services/getConfigToken";
import handleTokenExpiration from "../services/handleTokenExpiration";

const useCrud = () => {
  const [response, setResponse] = useState();

  //Read
  const getData = (url, withToken) => {
    axios
      .get(url, withToken ? getConfigToken() : {})
      .then((res) => setResponse(res.data))
      .catch((err) => {
        console.error(err);
        //401 NO ESTA AUTORIZADO O 403 EL TOKEN EXPITÓ
        if (err?.response.status === 401 || err?.response.status === 403) {
          console.log("Token expirado o no autorizado");
          handleTokenExpiration();
        }
      });
  };

  //Create
  const postData = (url, data, withToken) => {
    axios
      .post(url, data, withToken ? getConfigToken() : {})
      .then((res) => {
        console.log(res.data);
        setResponse(response ? [...response, res.data] : [res.data]);
      })
      .catch((err) => {
        console.error(err);
        //401 NO ESTA AUTORIZADO O 403 EL TOKEN EXPITÓ
        if (err?.response.status === 401 || err?.response.status === 403) {
          console.log("Token expirado o no autorizado");
          handleTokenExpiration();
        }
      });
  };

  //Delete
  const deleteData = (url, id, withToken) => {
    axios
      .delete(url, withToken ? getConfigToken() : {})
      .then((res) => {
        console.log(res.data);
        setResponse(response.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error(err);
        //401 NO ESTA AUTORIZADO O 403 EL TOKEN EXPITÓ
        if (err?.response.status === 401 || err?.response.status === 403) {
          console.log("Token expirado o no autorizado");
          handleTokenExpiration();
        }
      });
  };

  //Update
  const updateData = (url, data, id, withToken) => {
    axios
      .put(url, data, withToken ? getConfigToken() : {})
      .then((res) => {
        console.log(res.data);
        setResponse(response.map((item) => (item.id === id ? res.data : item)));
      })
      .catch((err) => {
        console.error(err);
        //401 NO ESTA AUTORIZADO O 403 EL TOKEN EXPITÓ
        if (err?.response.status === 401 || err?.response.status === 403) {
          console.log("Token expirado o no autorizado");
          handleTokenExpiration();
        }
      });
  };

  return [response, getData, postData, deleteData, updateData];
};

export default useCrud;
