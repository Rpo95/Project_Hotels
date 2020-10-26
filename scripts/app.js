function Hero(props) {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Hoteles Rpo</h1>
          <h2 className="subtitle">
            desde el{" "}
            <strong>
              {props.filters.dateFrom.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </strong>{" "}
            hasta el{" "}
            <strong>
              {props.filters.dateTo.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </strong>
            {props.filters.country ? ` en ${props.filters.country}` : ""}
            {props.filters.price
              ? ` por ${"$".repeat(props.filters.price)}`
              : ""}
            {props.filters.rooms
              ? ` de hasta ${props.filters.rooms} habitaciones`
              : ""}
          </h2>
        </div>
      </div>
    </section>
  );
}

class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(event) {
    this.props.onDateChange(event);
  }

  render() {
    let date = `${this.props.date.getFullYear()}-${String(
      this.props.date.getMonth() + 1
    ).padStart(2, 0)}-${String(this.props.date.getDate()).padStart(2, 0)}`;
    return (
      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input"
            type="date"
            onChange={this.handleDateChange}
            value={date}
            name={this.props.name}
          />
          <span className="icon is-small is-left">
            <i className={`fas fa-${this.props.icon}`}></i>
          </span>
        </div>
      </div>
    );
  }
}
class OptionsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    this.props.onOptionChange(event);
  }

  render() {
    return (
      <div className="field">
        <div className="control has-icons-left">
          <div className="select" style={{ width: "100%" }}>
            <select
              onChange={this.handleOptionChange}
              value={this.props.selected}
              style={{ width: "100%" }}
              name={this.props.name}
            >
              {this.props.options.map((option) => (
                <option value={option.value || ""} key={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className={`fas fa-${this.props.icon}`}></i>
          </div>
        </div>
      </div>
    );
  }
}

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleDateChange(event) {
    let payload = this.props.filters;
    payload[event.target.name] = new Date(event.target.value);
    if (payload["dateFrom"].valueOf() >= payload["dateTo"].valueOf()) {
      payload["dateTo"] = new Date(payload["dateFrom"].valueOf() + 86400000);
    } else if (
      payload["dateTo"].valueOf() >
      payload["dateFrom"].valueOf() + 2592000000
    ) {
      payload["dateTo"] = new Date(payload["dateFrom"].valueOf() + 2592000000);
    }
    this.props.onFilterChange(payload);
  }

  handleOptionChange(event) {
    let payload = this.props.filters;
    payload[event.target.name] = event.target.value;

    this.props.onFilterChange(payload);
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-item">
          <DateFilter
            date={this.props.filters.dateFrom}
            onDateChange={this.handleDateChange}
            name="dateFrom"
            icon="sign-in-alt"
          />
        </div>
        <div className="navbar-item">
          <DateFilter
            date={this.props.filters.dateTo}
            onDateChange={this.handleDateChange}
            name="dateTo"
            icon="sign-out-alt"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            onOptionChange={this.handleOptionChange}
            options={[
              { value: undefined, name: "Todos los países" },
              { value: "Argentina", name: "Argentina" },
              { value: "Brasil", name: "Brasil" },
              { value: "Chile", name: "Chile" },
              { value: "Uruguay", name: "Uruguay" },
            ]}
            selected={this.props.filters.country}
            name="country"
            icon="globe"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            onOptionChange={this.handleOptionChange}
            options={[
              { value: undefined, name: "Cualquier precio" },
              { value: 1, name: "$" },
              { value: 2, name: "$$" },
              { value: 3, name: "$$$" },
              { value: 4, name: "$$$$" },
            ]}
            selected={this.props.filters.price}
            name="price"
            icon="dollar-sign"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            onOptionChange={this.handleOptionChange}
            options={[
              { value: undefined, name: "Cualquier tamaño" },
              { value: 10, name: "Hotel pequeño" },
              { value: 20, name: "Hotel mediano" },
              { value: 30, name: "Hotel grande" },
            ]}
            selected={this.props.filters.rooms}
            name="rooms"
            icon="bed"
          />
        </div>
      </nav>
    );
  }
}

function DataTag(props) {
  return (
    <div className="control">
      <div className="tags has-addons">
        <span className="tag is-medium is-info ">
          <i className={`fas fa-${props.icon}`}></i>
        </span>
        <span className="tag is-medium">{props.children}</span>
      </div>
    </div>
  );
}
function PriceTag(props) {
  let icons = [];
  for (var i = 0; i < 4; i++) {
    var style = { margin: "0 .125em" };
    if (i >= props.count) {
      style.opacity = "0.25";
    }
    icons.push(<i className="fas fa-dollar-sign" style={style} key={i}></i>);
  }

  return (
    <div className="control">
      <div className="tags">
        <span className="tag is-medium is-info">{icons}</span>
      </div>
    </div>
  );
}

function Hotel(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={props.children.photo} alt={props.children.name} />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-4">{props.children.name}</p>
        <p>{props.children.description}</p>
        <div
          className="field is-grouped is-grouped-multiline"
          style={{ marginTop: "1em" }}
        >
          <DataTag icon="map-marker">{`${props.children.city}, ${props.children.country}`}</DataTag>
          <DataTag icon="bed">{`${props.children.rooms} Habitaciones`}</DataTag>
          <PriceTag count={props.children.price} />
        </div>
      </div>
      <div className="card-footer">
        <a
          href="javascript:alert('Pronto estaremos listos para reservar en tu lugar preferido')"
          className="card-footer-item  has-text-white has-text-weight-bold"
        >
          Reservar
        </a>
      </div>
    </div>
  );
}

function Hotels(props) {
  return (
    <section className="section" style={{ marginTop: "3em" }}>
      <div className="container">
        <div className="columns is-multiline">
          {props.children.length ? (
            props.children.map((hotel) => (
              <div className="column is-one-third" key={hotel.slug}>
                <Hotel>{hotel}</Hotel>
              </div>
            ))
          ) : (
            <article className="message is-warning">
              <div className="message-body">
                No se han encontrado hoteles que coincidan con los parámetros de
                búsqueda.
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        dateFrom: today,
        dateTo: new Date(today.valueOf() + 86400000),
        country: undefined,
        price: undefined,
        rooms: undefined,
      },
      hotels: hotelsData,
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(payload) {
    this.setState({
      filters: payload,
    });
  }

  render() {
    const hotels = this.state.hotels.filter(
      (hotel) =>
        this.state.filters.dateFrom <= hotel.availabilityFrom &&
        this.state.filters.dateTo <= hotel.availabilityTo &&
        (this.state.filters.country
          ? hotel.country === this.state.filters.country
          : true) &&
        (this.state.filters.price
          ? hotel.price <= this.state.filters.price
          : true) &&
        (this.state.filters.rooms
          ? hotel.rooms <= this.state.filters.rooms
          : true)
    );

    return (
      <div>
        <Hero filters={this.state.filters} />
        <Filters
          filters={this.state.filters}
          onFilterChange={this.handleFilterChange}
        />
        <Hotels>{hotels}</Hotels>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
