/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Table, Modal  } from "antd";
import useFetch from "./hooks/useFetch";
import { addDataConditions } from './features/conditions/conditionsSlice'
import SunnyIcon from './assets/wi-day-sunny.svg';
import RainIcon from './assets/wi-day-showers.svg';


function App() {
  const { data, loading, errorData } = useFetch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ infoModal, setInfoModal ] = useState({
    _id: "",
    cityid: "",
    validdateutc: "",
    winddirectioncardinal: "",
    probabilityofprecip: "",
    relativehumidity: "",
    name: "",
    longitude: "",
    state: "",
    lastreporttime: "",
    skydescriptionlong: "",
    stateabbr: "",
    tempc: "",
    latitude: "",
    iconcode: "",
    windspeedkm: ""
  })
  const conditionsState = useSelector(state => state.conditions)
  const dispatch = useDispatch()

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    if(data) {
      dispatch(addDataConditions(data.results))
    }
  },[data])

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
    {
      title: "Detalle",
      render: () => <p className="paragraph-detail">Detalle</p>,
      onCell: (record) => {
        return {
            onClick: () => {
                setInfoModal(record)
                setIsModalOpen(true)
            },
        };
    }
    },
  ];

  const onSelectChange = (e) => {
    console.log('Content: ', e.currentTarget.dataset.id);
  };


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
          <Table dataSource={conditionsState} columns={columns} scroll={{ y: 700 }} onClick={onSelectChange}/>
        </div>
      )}
      {errorData && <p>{errorData}</p>}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='30%' >
        <div className="container-card-weather">
          <div className="container-card-weather-title-city">
            <p className="paragraph-title-city">{infoModal.name} </p>
            <p className="paragraph-title-estate">{infoModal.state}</p>
          </div>
          <div className="container-card-weather-icon-and-temp">
            {
              infoModal.probabilityofprecip > 60 || infoModal.relativehumidity > 50 
                ? <img className="color-img-svg" src={RainIcon} alt="icon/weather" />
                : <img className="color-img-svg" src={RainIcon} alt="icon/rain" />
            }
            <p className="paragraph-title-estate">{infoModal.tempc} °C</p>
          </div>
          <div className="container-info-aux">
            <div className="container-paragraphs-inf">
              <p className="paragraph-title-aux-info" >
                Probabilidad de lluvia
              </p>
              <p className="paragraph-aux-info" >
                {infoModal.probabilityofprecip} %
              </p>
            </div>
            <div className="container-paragraphs-inf">
              <p className="paragraph-title-aux-info" >
                Humedad relativa
              </p>
              <p className="paragraph-aux-info" >
                {infoModal.relativehumidity} %
              </p>
            </div>
            <div className="container-paragraphs-inf">
              <p className="paragraph-title-aux-info" >
                Rachas de viento
              </p>
              <p className="paragraph-aux-info" >
                {infoModal.windspeedkm} km/h
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
