class FormAmortizacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <form id="form-amortizacion">
        <h2>Datos del Cliente</h2>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" required>
        <label for="documento">Documento de Identidad:</label>
        <input type="text" id="documento" required>
        
        <h2>Datos del Préstamo</h2>
        <label for="monto">Monto del Préstamo ($):</label>
        <input type="number" id="monto" required>
        <label for="tasa">Tasa de Interés Anual (%):</label>
        <input type="number" id="tasa" step="0.01" required>
        <label for="plazo">Plazo en Meses:</label>
        <input type="number" id="plazo" required>
        <label for="tipo">Tipo de Amortización:</label>
        <select id="tipo">
          <option value="Francés">Francés</option>
          <option value="Americano">Americano</option>
        </select>
        <button type="submit">Calcular</button>
      </form>
    `;

    // Escuchar el evento submit
    this.shadowRoot.querySelector('#form-amortizacion').addEventListener('submit', (e) => {
      e.preventDefault();

      // Capturar los datos del formulario
      const datos = {
        nombre: this.shadowRoot.querySelector('#nombre').value,
        documento: this.shadowRoot.querySelector('#documento').value,
        monto: parseFloat(this.shadowRoot.querySelector('#monto').value),
        tasa: parseFloat(this.shadowRoot.querySelector('#tasa').value),
        plazo: parseInt(this.shadowRoot.querySelector('#plazo').value),
        tipo: this.shadowRoot.querySelector('#tipo').value,
      };

      // Emitir un evento con los datos del formulario
      this.dispatchEvent(new CustomEvent('datos-ingresados', {
        detail: datos,
        bubbles: true,
        composed: true
      }));
    });
  }
}
customElements.define('form-amortizacion', FormAmortizacion);
