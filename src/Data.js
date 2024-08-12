export default class Data {
  static types = [1, 2, 3, 4, 5]
  static typesUpdated = [1, 2, 3, 4, 5]
  static typeNames = ['BELC-05-0100', 'BELC-10-0100', 'BELC-10-0000', 'BELC-20-0200', 'BELC-10-0201']
  static typePrices = [1300, 1800, 1300, 4100, 2900]
  static typeHeights = [10, 15, 10, 20, 10]
  static totalPrice = 0
  static globalLayout = []
  static height = 0
  static updateArray() {
    Data.typesUpdated = []
    var min = Number.MIN_SAFE_INTEGER
    var min2 = Number.MAX_SAFE_INTEGER
    var index = -10
    var foundNew = true
    while (foundNew) {
      //console.log('testing')
      foundNew = false
      Data.globalLayout.map(function(l) {
        if (l.y > min && l.y < min2) {
          min2 = l.y
          index = parseInt(l.i)
          foundNew = true
        }
      });
      if (foundNew) {
        console.log(index)
        Data.typesUpdated[Data.typesUpdated.length] = Data.types[index]
        min = min2
        min2 = Number.MAX_SAFE_INTEGER
      }
    }
    console.log(Data.typesUpdated)
  }


  static generateWarnings = () => {
    var buildWarning = false
    for (let i = 0; i < Data.typesUpdated.length; i++) {
      var type = Data.typesUpdated[i]
      if (Math.abs(type) == 4) {
        type *= -1
      }
      if (i != Data.typesUpdated.length - 1) {
        if (!(type < 0 && Data.typesUpdated[i + 1] < 0 || type > 0 && Data.typesUpdated[i + 1] > 0)) {
          buildWarning = true;
          break;
        }
      }
    }
    return <p style={{color: buildWarning ? 'red' : 'lime'}}>{buildWarning ? 'Warning: Structure is Unstable' : 'All Good!'}</p>
  }

  static createBuild() {
    Data.types = []
    for (let i = 0; i < Data.height / 10; i++) {
      Data.types[i] = 1
    }
  }
}