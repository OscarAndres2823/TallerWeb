class HistorialClientes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <h2>Historial de Clientes</h2>
      <ul id="lista-historial"></ul>
    `;
  }

  cargarHistorial(historial) {
    const lista = this.shadowRoot.querySelector('#lista-historial');
    lista.innerHTML = '';

    historial.forEach((cliente) => {
      const item = document.createElement('li');
      item.textContent = `Cliente: ${cliente.nombre}, Documento: ${cliente.documento}`;
      lista.appendChild(item);
    });
  }
}
customElements.define('historial-clientes', HistorialClientes);
