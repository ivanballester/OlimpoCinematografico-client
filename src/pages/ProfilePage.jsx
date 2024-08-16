import React, { useEffect, useState } from "react";
import user from "../assets/user.png";
import service from "../service/service.config";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(user);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service.get("/profile");
        const data = response.data;

        setEmail(data.email);
        setName(data.name);
        setPhoneNumber(data.phoneNumber);
        setPhoto(data.photo || user);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await service.patch("/profile", { name, phoneNumber, city });
      alert("Datos guardads con exito");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error al guardar los datos");
    }
  };

  const handlePhoneNumber = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setPhoneNumber(e.target.value.slice(0, 9));
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <Loading />
      </div>
    );

  return (
    <div className="profile-div">
      <div>
        <img src={user} alt="foto" width={300} />
      </div>

      <div>
        <form action="" className="profile-form">
          <label htmlFor="">
            Email
            <input
              type="text"
              className="profile-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="">
            Nombre
            <input
              type="text"
              className="profile-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="">
            Teléfono
            <input
              type="text"
              className="profile-input"
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
          </label>
          <label htmlFor="">
            Ciudad
            <input
              type="text"
              className="profile-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </form>
      </div>
      <button onClick={handleSave} className="profile-save">
        GUARDAR
      </button>
    </div>
  );
}

export default ProfilePage;
