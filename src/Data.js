export default class Data {
  static types = [1, 2, 3, 4, 5]
  static typesUpdated = [1, 2, 3, 4, 5]
  static typeNames = ['BELC-05-0100', 'BELC-10-0100', 'BELC-10-0000', 'BELC-20-0200', 'BELC-10-0201']
  static typePrices = [1300, 1800, 1300, 4100, 2900]
  static typeHeights = [10, 15, 10, 20, 10]
  static totalPrice = 0
  static globalLayout = []
  static height = 65
  static counter = 0
  static updateArray() {
    Data.typesUpdated = []
    var min = Number.MIN_SAFE_INTEGER
    var min2 = Number.MAX_SAFE_INTEGER
    var index = -10
    var foundNew = true
    console.log("happening")
    console.log(Data.globalLayout)
    while (foundNew) {
      foundNew = false
      Data.globalLayout.map(function(l) {
        if (l.x == 0 && l.static == false && l.y > min && l.y < min2) {
          min2 = l.y
          index = parseInt(l.i)
          foundNew = true
        }
      });
      if (foundNew) {
        Data.typesUpdated[Data.typesUpdated.length] = Data.types[index]
        min = min2
        min2 = Number.MAX_SAFE_INTEGER
      }
    }
    console.log(Data.typesUpdated)
    console.log(Data.counter)
    Data.counter++
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

  static calculateHeight() {
    var totalHeight = 0
    for (let i = 0; i < Data.types.length; i++) {
      totalHeight += Data.typeHeights[Math.abs(Data.types[i]) - 1]
    }
    Data.height = totalHeight
  }

  static createBuild() {
    Data.types = [(Data.height % 10) / 5 + 1]
    var currentHeight = Data.typeHeights[Data.types[0] - 1]
    var heightFromPlatform = currentHeight
    var lastWasPlatform = false
    //var platformAdded = false
    while (currentHeight < Data.height) {
      if (Data.height - currentHeight == 20) {
        if (heightFromPlatform + 20 <= 30) {
          Data.types.push(3)
          Data.types.push(3)
        } else {
          Data.types.push(4)
        }
        break;
      } else if (lastWasPlatform || Data.height - currentHeight == 10) {
        Data.types.push(3)
        lastWasPlatform = false
        //break;
      } else {
        Data.types.push(4)
        lastWasPlatform = true
      }
      //lastWasPlatform = Data.types[Data.types.length - 1] == 4
      heightFromPlatform += Data.typeHeights[Data.types[Data.types.length - 1] - 1]
      currentHeight += Data.typeHeights[Data.types[Data.types.length - 1] - 1]
      if (lastWasPlatform) {
        heightFromPlatform = 10
      }
    }
    Data.correctOrientation()
    Data.types.reverse()
  }

  // static correctOrientation() {
  //   let last = Data.types[Data.types.length - 1]
  //   Data.types[Data.types.length - 1] = -1 * Math.abs(last)
  //   for (let i = Data.types.length; i > 0; i--) {
  //     var type = Data.types[i]
  //     if (Math.abs(type) == 4) {
  //       type *= -1
  //     }
  //     if (!(type < 0 && Data.types[i - 1] < 0 || type > 0 && Data.types[i - 1] > 0)) {
  //       Data.types[i - 1] *= -1
  //     }
  //   }
  // }

  static correctOrientation() {
    //let last = Data.types[Data.types.length - 1]
    //Data.types[Data.types.length - 1] = -1 * Math.abs(last)
    for (let i = Data.types.length - 1; i > 0; i--) {
      var type = Data.types[i]
      if (Math.abs(type) == 4) {
        type *= -1
      }
      if (!(type < 0 && Data.types[i - 1] < 0 || type > 0 && Data.types[i - 1] > 0)) {
        Data.types[i - 1] *= -1
      }
    }
    if (Data.types[Data.types.length - 1] > 0)
    for (let i = 0; i < Data.types.length; i++) {
      Data.types[i] *= -1
    }

    //console.log(Data.types)
  }
}