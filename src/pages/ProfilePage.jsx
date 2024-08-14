import React, { useEffect, useState } from "react";
import user from "../assets/user.png";
import service from "../service/service.config";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(user);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service.get("/profile");
        const data = response.data;
        console.log(response);
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
    } catch (error) {
      console.log(error);
      alert("Error al guardar los datos");
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="profile-div">
      <img src={user} alt="foto" width={300} />
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
              onChange={(e) => setPhoneNumber(e.target.value)}
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
