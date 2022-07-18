import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import background from "./assets/darth-vader.jpg";

export default function App() {
  return (
    <Router>
      <div
        className="image"
        style={{
          width: "100vw",
          maxWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "start",
              listStyleType: "none",
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Planets</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <Planets />
          </Route>
          <Route path="/:id">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://swapi.dev/api/films/");
      setDatas(data?.results);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const id = (url) => {
    return url.match(/\d+/)[0];
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {loading && <div>loading...</div>}

      {datas &&
        datas.map((data) => {
          return (
            <div
              key={`datas-${data.episode_id}`}
              style={{
                minWidth: "300px",
                minHeight: "100px",
                border: "2px solid #F1F3EF",
                borderRadius: "8px",
                margin: "8px",
                padding: "8px",
                cursor: "pointer",
                color: "#F1F3EF",
              }}
              onClick={() => {
                history.push(`/${id(data.url)}`);
              }}
            >
              <div
                style={{
                  borderBottom: "2px solid white",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {data?.title}
              </div>
              <div style={{ padding: "16px" }}>Director : {data?.director}</div>
            </div>
          );
        })}
    </div>
  );
}

function Planets() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(`https://swapi.dev/api/planets`);
      setDatas(data?.results);
    } catch (error) {}
  };
  return (
    <>
      <div>
        {datas &&
          datas.map((data) => {
            return (
              <div key={`datas-${data.name}`} style={{ marginBottom: "32px" }}>
                <div>{data.name}</div>
                <div style={{ padding: "16px" }}>
                  <div>terrain: {data.terrain}</div>
                  <div>orbital period: {data.orbital_period}</div>
                  <div>rotation period: {data.rotation_period}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

function Users() {
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState({});
  const { id } = useParams();

  const getData = async () => {
    try {
      const { data } = await axios.get(`https://swapi.dev/api/films/${id}`);
      setData(data);
    } catch (error) {}
  };
  return (
    <div>
      {data && (
        <div>
          <div>{data.title}</div>
          <div>{data.opening_crawl}</div>
        </div>
      )}
    </div>
  );
}
