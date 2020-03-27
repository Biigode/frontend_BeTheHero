import React, { useState } from "react";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState();
  const history = useHistory();
  async function handleLogon(e) {
    e.preventDefault();
    try {
      const response = await api.post("/session", { id: id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongNome", response.data.nome);
      history.push("/profile");
    } catch (error) {
      alert("login não autorizado");
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be the Hero" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            entrar
          </button>
          <Link className=" back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}
