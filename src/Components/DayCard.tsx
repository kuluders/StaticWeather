export default function DayCard(props: any) {
  const today = new Date(props.date);
  const DAYS_OF_THE_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = DAYS_OF_THE_WEEK[today.getDay()];

  return (
    <div className="col-4">
      <div
        className="card text-center"
        style={{ backgroundColor: "#80bfff", borderRadius: "15px" }}
      >
        {currentDay}
        <div className="card-body">
          <div className="card-title">
            <p className="mb-0" style={{ fontSize: "50px" }}>
              {props.weatherIcon}
            </p>
            <p style={{ fontSize: "12px" }}>{props.weatherDesc}</p>
          </div>
          <h6>
            {props.maxTempC}&deg;C / {props.minTempC}&deg;C
          </h6>
          <b>UV: {props.UVIndex}</b>
        </div>
      </div>
    </div>
  );
}
