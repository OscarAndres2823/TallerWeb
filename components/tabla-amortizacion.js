class TablaAmortizacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <table id="tabla-amortizacion">
        <thead>
          <tr>
            <th>Cuota</th>
            <th>Saldo Inicial</th>
            <th>Cuota Mensual</th>
            <th>Intereses</th>
            <th>Amortización</th>
            <th>Saldo Restante</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  }

  generarTabla(datos) {
    const tbody = this.shadowRoot.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar tabla previa

    const { monto, tasa, plazo, tipo } = datos;
    let saldo = monto;
    const tasaMensual = tasa / 12 / 100;

    for (let i = 1; i <= plazo; i++) {
      const intereses = saldo * tasaMensual;
      let amortizacion, cuota;

      if (tipo === 'Francés') {
        cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
        amortizacion = cuota - intereses;
      } else if (tipo === 'Americano') {
        cuota = i === plazo ? monto + intereses : intereses;
        amortizacion = i === plazo ? monto : 0;
      }

      saldo -= amortizacion;

      const fila = `
        <tr>
          <td>${i}</td>
          <td>${saldo.toFixed(2)}</td>
          <td>${cuota.toFixed(2)}</td>
          <td>${intereses.toFixed(2)}</td>
          <td>${amortizacion.toFixed(2)}</td>
          <td>${saldo.toFixed(2)}</td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', fila);
    }
  }
}
customElements.define('tabla-amortizacion', TablaAmortizacion);
