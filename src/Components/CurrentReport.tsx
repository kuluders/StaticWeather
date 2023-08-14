export default function CurrentReport(props: any) {
  return (
    <div className="row mt-0 m-3 d-flex align-items-center">
      <div className="col-auto pt-0 pb-0 text-center">
        <p style={{ fontSize: "8em", margin: "-20px 1rem" }}>
          {props.currentData.weatherIcon}
        </p>
        <b style={{ fontSize: "12px" }}>{props.currentData.weatherDesc}</b>
      </div>
      <div className="col " style={{ fontSize: "12px" }}>
        <div className="row ms-4">
          <div className="col">Location:</div>
          <div className="col">
            {props.city}, {props.country}
          </div>
        </div>
        <div className="row ms-4">
          <div className="col">Temperature:</div>
          <div className="col">{props.currentData.tempC}</div>
        </div>
        <div className="row ms-4">
          <div className="col">Humidity:</div>
          <div className="col">{props.currentData.humidity}%</div>
        </div>
        <div className="row ms-4">
          <div className="col">Precipitation (mm):</div>
          <div className="col">{props.currentData.precipMM}</div>
        </div>
        <div className="row ms-4">
          <div className="col">Wind (km/h):</div>
          <div className="col">{props.currentData.windspeedKmph}</div>
        </div>
      </div>
    </div>
  );
}
