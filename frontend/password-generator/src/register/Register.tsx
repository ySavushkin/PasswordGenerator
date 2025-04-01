import React from "react";

const RegistrationForm: React.FC = () => {
  return (
    <div className="bd-example">
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Адрес электронной почты</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">Мы никогда никому не передадим вашу электронную почту.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Проверить меня</label>
            </div>
            <button type="submit" className="btn btn-primary">Отправить</button>
        </form>
    </div>
  );
};

export default RegistrationForm;
