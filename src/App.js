/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Table } from "antd";
import useFetch from "./hooks/useFetch";
import { useEffect } from "react";
import { addDataConditions } from './features/conditions/conditionsSlice'

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "ID Ciudad",
    dataIndex: "cityid",
    key: "cityid",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Estado",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Probabilidad de lluvia",
    dataIndex: "probabilityofprecip",
    key: "probabilityofprecip",
  },
  {
    title: "Humedad",
    dataIndex: "relativehumidity",
    key: "relativehumidity",
  },
  {
    title: "último reporte",
    dataIndex: "lastreporttime",
    key: "lastreporttime",
  },
  {
    title: "Llueve",
    render: (item) => {
      const probability = parseInt(item.probabilityofprecip);
      const humidity = parseInt(item.relativehumidity);
      return probability > 60 || humidity > 50 ? (
        <p>Llueve</p>
      ) : (
        <p>No llueve</p>
      );
    },
  },
];

function App() {
  const { data, loading, errorData } = useFetch();
  const conditionsState = useSelector(state => state.conditions)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(data) {
      dispatch(addDataConditions(data.results))
    }
  },[data])

  return (
    <div className='App'>
      <h1>Condiciones climaticas</h1>
      {loading && (
        <div>
          <Spin />
        </div>
      )}
      {conditionsState.length > 0 && (
        <div className="container-table">
          <Table dataSource={conditionsState} columns={columns} />
        </div>
      )}
      {errorData && <p>{errorData}</p>}
    </div>
  );
}

export default App;
