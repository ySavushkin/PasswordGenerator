import React from "react";
import "./PasswordTable.css";

const PasswordTable: React.FC = () => {
  return (
    <div className="p-3">
      <h2 className="text-white h2 mb-4">Ваші збережені паролі</h2>
      <table className="table table-dark table-striped m-auto">
        <thead>
          <tr>
            <th scope="col">Замітка</th>
            <th scope="col">Пароль</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GMAIL</td>
            <td>524853489</td>
          </tr>
          <tr>
            <td>LinkedIn</td>
            <td>5d*f-g45+2'./4853423</td>
          </tr>
          <tr>
            <td>GMAIL</td>
            <td>524853489</td>
          </tr>
          <tr>
            <td>LinkedIn</td>
            <td>5d*f-g45+2'./4853423</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PasswordTable;
