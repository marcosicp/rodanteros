import "./home.css";
import { useState, useEffect } from "react";
import firebase from "../../firebase";

//Components
// import Card from "../../components/Card/Card";
import PageLoader from "../../components/PageLoader";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box, { BoxProps } from "@mui/material/Box";
import iconRodanteros from "../../assets/rodanteros_img.png";
import Cardd from "../../components/Card/Card";
//Firestore database
const db = firebase.firestore().collection("campings");

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  //Get all products from firestore
  const getProducts = () => {
    setLoading(true);
    try {
      db.orderBy("createdAt", "desc").get().then((querySnapShot) => {
        const items = [];

        querySnapShot.forEach((doc) => {
          items.push(doc.data());
        });
        setProducts(items);
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const [value, setValue] = useState("");

  // const filtered = !value ? products : products?.filter((product) => product?.name?.toLowerCase().includes(value.toLowerCase()));

  const provincesArgentina = [
    { label: "Buenos Aires", isoCode: "AR-B" },
    { label: "Catamarca", isoCode: "AR-K" },
    { label: "Chaco", isoCode: "AR-H" },
    { label: "Chubut", isoCode: "AR-U" },
    { label: "Córdoba", isoCode: "AR-X" },
    { label: "Corrientes", isoCode: "AR-W" },
    { label: "Entre Ríos", isoCode: "AR-E" },
    { label: "Formosa", isoCode: "AR-P" },
    { label: "Jujuy", isoCode: "AR-Y" },
    { label: "La Pampa", isoCode: "AR-L" },
    { label: "La Rioja", isoCode: "AR-F" },
    { label: "Mendoza", isoCode: "AR-M" },
    { label: "Misiones", isoCode: "AR-N" },
    { label: "Neuquén", isoCode: "AR-Q" },
    { label: "Río Negro", isoCode: "AR-R" },
    { label: "Salta", isoCode: "AR-A" },
    { label: "San Juan", isoCode: "AR-J" },
    { label: "San Luis", isoCode: "AR-D" },
    { label: "Santa Cruz", isoCode: "AR-Z" },
    { label: "Santa Fe", isoCode: "AR-S" },
    { label: "Santiago del Estero", isoCode: "AR-G" },
    { label: "Tierra del Fuego", isoCode: "AR-V" },
    { label: "Tucumán", isoCode: "AR-T" },
  ];

  const findProvince = async (e) => {
    const items = [];
    if (e) {
      // e.preventDefault()
      // try {
      var a = await db.where("location", "==", e.label).get();
      a.docs.forEach((doc) => {
        items.push(doc.data());
      });
      setProducts(items);
      setLoading(false);
    } else {
      getProducts();
    }
  };

  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: 2,
          borderRadius: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "33.33%",
          }}
        >
          <img src={iconRodanteros} height={50} />
          <div style={{ paddingLeft: "5px" }}> Rodanteros Argentinos</div>
        </div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "33.33%",
          }}
        >
          <h2>Busca tu camping ideal</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", width: "33.33%" }}></div>
      </Box>

      <Box display="flex" alignItems="flex-start">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={provincesArgentina}
          sx={{ width: 300 }}
          onChange={(e, v, r, d) => findProvince(v)}
          renderInput={(params) => <TextField {...params} label="Provincia" />}
        />
      </Box>
      <div className="products__results" style={{height:'100%'}}>
        {loading && <PageLoader />}
        {error && <h5>Algo salio mal</h5>}
        {products && products.map((camping) => <Cardd campingParam={camping} key={camping.name} />)}
      </div>
    </div>
  );
};

export default Home;
