export default function HourlyRow(props: any) {
  const obsTime: number = Number(props.localObsDateTime.substring(0, 2));
  const isAM: boolean =
    props.localObsDateTime.substring(props.localObsDateTime.length - 2) == "AM"
      ? true
      : false;
  const formattedTime: number = isAM ? obsTime : obsTime + 12;
  const rowTime: number =
    formattedTime + props.hourly.time / 300 > 24
      ? formattedTime + props.hourly.time / 300 - 24
      : formattedTime + props.hourly.time / 300;
  const strTime: string = rowTime + ":00";

  return (
    <div className="row m-2">
      <div
        className="card p-2"
        style={{ backgroundColor: "#80bfff", borderRadius: "10px" }}
      >
        <div className="row">
          <div className="col d-flex flex-row align-items-center">
            {strTime}{" "}
            <p style={{ fontSize: "35px", margin: "-5px 0px" }}>{props.icon}</p>
          </div>
          <div className="col-auto d-flex align-items-center ">
            <div className="d-flex flex-row" style={{ fontSize: "14px" }}>
              <div className="ms-1">Temp: {props.hourly.tempC}&deg;C</div>
              <div className="ms-1">
                Feels like: {props.hourly.FeelsLikeC}&deg;C
              </div>
              <div className="ms-1">Precip: {props.hourly.precipMM}</div>
              <div className="ms-1">UV Index: {props.hourly.uvIndex}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
