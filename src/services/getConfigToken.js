import React from "react";

const getConfigToken = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export default getConfigToken;
