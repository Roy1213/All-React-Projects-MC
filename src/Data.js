export default class Data {
  static types = [1, 2, 3, 4, 5]
  static typeNames = ['BELC-05-0100', 'BELC-10-0100', 'BELC-10-0000', 'BELC-20-0200', 'BELC-10-0201']
  static typePrices = [1300, 1800, 1300, 4100, 2900]
  static totalPrice = 0
  static formatPrice = () => {
    let USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    return USDollar.format(Data.totalPrice).toString()
  }
  static generateContent = () => {
    let typesNum = [0, 0, 0, 0, 0]
    Data.totalPrice = 0
    for (let i = 0; i < Data.types.length; i++) {
      typesNum[Math.abs(Data.types[i]) - 1]++
      Data.totalPrice += Data.typePrices[Math.abs(Data.types[i]) - 1]
    }
    const rows = []
    for (let i = 0; i < 5; i++) {
      rows.push(
        <div key={i} style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10
        }}>
          <p>T{i + 1}: </p>  <p>{Data.typeNames[i]}</p> <p>{typesNum[i]}</p>
        </div>)
    }
    rows.push(
      <div key={6} style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20
      }}>
        <b>Total Price:</b> {this.formatPrice()}
      </div>)
    return <div>{rows}</div>
  }
  static generateWarnings = () => {
    var buildWarning = false
    for (let i = 0; i < Data.types.length; i++) {
      var type = Data.types[i]
      if (Math.abs(type) == 4) {
        type *= -1
      }
      if (i != Data.types.length - 1) {
        if (!(type < 0 && Data.types[i + 1] < 0 || type > 0 && Data.types[i + 1] > 0)) {
          buildWarning = true;
          break;
        }
      }
    }
    return <p>{buildWarning ? 'Warning' : 'All Good!'}</p>
  }
}