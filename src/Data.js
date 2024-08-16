export default class Data {
  static types = [1, 3, 3, 3]
  static typesUpdated = [1, 3, 3, 3]
  static typeNames = ['BELC-05-0100', 'BELC-10-0100', 'BELC-10-0000', 'BELC-20-0200', 'BELC-10-0201']
  static typePrices = [1300, 1800, 1300, 4100, 2900]
  static typeHeights = [10, 15, 10, 20, 10]
  static totalPrice = 0
  static globalLayout = []
  static showcaseLayout = null
  static height = 40
  static counter = 0
  static exampleLayout = null
  static canUpdate = true
  static canUpdateCount = 2
  static lastCall = 0
  static millisecondsBetween = 25

  static updateArray(exampleLayout) {
    Data.typesUpdated = []
    var min = Number.MIN_SAFE_INTEGER
    var min2 = Number.MAX_SAFE_INTEGER
    var index = -10
    var foundNew = true
    var wrongSide = false
    console.log("happening")
    console.log(Data.globalLayout)
    while (foundNew) {
      foundNew = false
      var exLayout = Data.exampleLayout
      if (exampleLayout != null) {
        exLayout = exampleLayout
      }
      exLayout.state.layout.map(function(l) {
        if (l.x == 0 && l.static == false && l.y > min && l.y < min2) {
          //console.log("i: " + l.i + " y:" + l.y)
          min2 = l.y
          index = parseInt(l.i)
          foundNew = true
        } else if (l.x == 1 && l.static == false) {
          wrongSide = true
        }
      });
      if (foundNew) {
        Data.typesUpdated[Data.typesUpdated.length] = Data.types[index]
        min = min2
        min2 = Number.MAX_SAFE_INTEGER
      }
    }

    if (wrongSide) {
      for (let i = 0; i < Data.types.length; i++) {
        Data.typesUpdated[i] = Data.types[i]
      }
    }

    console.log(Data.counter)
    console.log(Data.typesUpdated)
    console.log(Data.types)
    
    Data.counter++

    //Data.updateOriginal()
    // if (updates < 2) {
    //   Data.updateArray(++updates)
    // }
    //Data.updateOriginal()
  }

  static updateOriginalHelper() {
    console.log("engaged " + Data.counter)
    for (let i = 0; i < Data.typesUpdated.length; i++) {
      Data.types[i] = Data.typesUpdated[i]
    }
    if (Data.showcaseLayout != null) {
      Data.showcaseLayout.externalUpdate()
    }
    // if (Data.showcaseLayout != null) {
    //   console.log("engagedEngaged " + Data.counter)
    //   Data.showcaseLayout.externalUpdate()
    //   Data.updateArray()
    //   for (let i = 0; i < Data.typesUpdated.length; i++) {
    //     Data.types[i] = Data.typesUpdated[i]
    //   }
    

    //   console.log(Data.typesUpdated)
    //   console.log(Data.types)
    //   console.log(Data.counter)
    //   // if (Data.exampleLayout != null) {
    //   //   Data.exampleLayout.forceUpdate()
    //   // }

    // }
    //console.log(Data.counter)
  }

  static updateOriginal() {

    if (Data.canUpdateCount > 0) {
      Data.canUpdateCount--
      Data.updateOriginalHelper()
    } else {
      Data.canUpdateCount = 1
    }
    
    // Data.testing()
    // if (Data.showcaseLayout != null) {
    //   Data.showcaseLayout.externalUpdate()
    // }



    // // if (Date.now() - Data.lastCall >= Data.millisecondsBetween)

    // // for (let i = 0; i < Data.typesUpdated.length; i++) {
    // //   Data.types[i] = Data.typesUpdated[i]
    // // }
    // //console.log(Data.counter)
    // if (Data.showcaseLayout != null) {
    //   for (let i = 0; i < Data.typesUpdated.length; i++) {
    //     Data.types[i] = Data.typesUpdated[i]
    //   }
    //   Data.showcaseLayout.externalUpdate()
    // }
    

    // if (Data.showcaseLayout != null && Data.canUpdate) {
    //   Data.canUpdateCount--
    //   if (Data.canUpdateCount == 0) {
    //     Data.canUpdate = false
    //   }
    //   for (let i = 0; i < Data.typesUpdated.length; i++) {
    //     Data.types[i] = Data.typesUpdated[i] * -1 * -1
    //   }
    //   Data.showcaseLayout.externalUpdate()
    // }
    



    // var arraysEqual = true
    // for (let i = 0; i < Data.types.length; i++) {
    //   if (Data.types[i] !== Data.typesUpdated[i]) {
    //     arraysEqual = false
    //   }
    //   //Data.types[i] = Data.typesUpdated[i]
    // }

    // console.log(Data.typesUpdated)
    // console.log(Data.types)

    // //arraysEqual = false

    // if (!arraysEqual && Data.canUpdate) {
    //   for (let i = 0; i < Data.typesUpdated.length; i++) {
    //     Data.types[i] = Data.typesUpdated[i] * -1 * -1
    //   }
    //   Data.canUpdate = false;
    //   console.log("updating...")
    //   if (Data.showcaseLayout != null) {  
    //     Data.showcaseLayout.externalUpdate()
    //   }
    //}

    // if (wrongSide) {
    //   // Data.showcaseLayout.externalUpdate()
      
    // }
  }


  static generateWarnings = () => {
    var buildWarning = false
    var buildError = false
    for (let i = 0; i < Data.typesUpdated.length; i++) {
      var type = Data.typesUpdated[i]
      if (Math.abs(type) == 4) {
        type *= -1
      }
      if (i != Data.typesUpdated.length - 1) {
        if (!(type < 0 && Data.typesUpdated[i + 1] < 0 || type > 0 && Data.typesUpdated[i + 1] > 0)) {
          buildError = true;
          break;
        }
      }
    }
    
    var feetBetween = 0
    for (let i = 0; i < Data.typesUpdated.length; i++) {
      var absType = Math.abs(Data.typesUpdated[i])
      if (absType != 4) {
        feetBetween += Data.typeHeights[absType - 1]
      } else {
        feetBetween += 10
      }
      if (feetBetween > 30) {
        buildWarning = true;
        break;
      }
      if (absType == 4) {
        feetBetween = 10
      }
    }
    return <p style={{color: buildError ? 'red' : buildWarning ? 'yellow' : 'lime'}}>{buildError ? 'WARNING: Structure is unstable' : buildWarning ? 'WARNING: Structure violates OSHA' : 'All Good!'}</p>
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