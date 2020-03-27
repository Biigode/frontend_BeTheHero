import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

export default function Profile() {
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const ongNome = localStorage.getItem("ongNome");
  const [incidents, setIncidents] = useState([]);
  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
    console.log(incidents);
  }, []);
  async function handleDelete(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert("Erro ao deletar incidente");
    }
  }
  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero" />
        <span>Bem vinda, {ongNome}</span>
        <Link className="button" to="/incident/new">
          Cadastrar novo incidente
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title} </p>
            <strong>Descrição:</strong>
            <p>{incident.description} </p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>
            <button type="button" onClick={() => handleDelete(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3 " />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
