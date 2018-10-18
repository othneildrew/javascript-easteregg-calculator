$(function() {
  /*
    Calculator has easter eggs for special operations
      -> if 6 6 6 is entered, calculator will self destruct
      -> if 3.14 is entered, calculator will show photo of pie
      -> if 7 7 7 is entered, calculator background will turn green and show lucky number 7
      -> if 9 1 1 is entered, flashing light background shows and calculator turn red
      -> if 3 6 5 is entered, photo of earth is shown
  */

  const eggs = {
    "666": {
      jjsdf: 5
    }
  };

  let inputString = [
    {
      stringType: "number",
      stringValue: null
    }
  ];

  let currentOperation = [];

  const calHistory = [];

  function evalExpression(type, value) {
    function update() {
      // Add value to array
      inputString.push({ stringType: type, stringValue: value });
      // Join values in new array
      currentOperation = inputString.map(input => input.stringValue);
      // Show full operation text on screen
      $("#full-operation").text(currentOperation.join(""));
    }

    let prevType = inputString.slice(-1)[0]["stringType"];
    let prevValue = inputString.slice(-1)[0]["stringValue"];

    if (currentOperation.length === 0 && type !== "operator") {
      update();
    } else if (currentOperation.length > 0) {
      if (type === "operator" && prevType === "operator") {
        inputString.pop();
      }

      if (type === "number" && prevType === "number") {
        inputString.pop();
        value = String(prevValue) + String(value);
        value = Number(value);

        console.log(value);
        update();
      } else {
        update();
      }
    }

    console.log(inputString);
    console.log(currentOperation);

    // if current value and previous value was number, add numbers together without spaces and add to array
  }

  function calculate() {
    let operationText = currentOperation.join("");
    let total = eval(currentOperation.join(""));
    $("#output").text(total);

    // Add to calculator history
    calHistory.push({ operationText: operationText, total: total });
    console.log("operation text::: " + operationText);
    console.log(calHistory);
  }

  function clearAll() {
    inputString = [
      {
        stringType: "number",
        stringValue: null
      }
    ];
    currentOperation = [];
    $("#output, #full-operation").text("0");
    $(".btn").removeClass("is_depressed");
  }

  // BTN EVENT LISTENER
  $(".btn").on("click", function() {
    // Get button data type
    const btnType = $(this).data("type");

    // Get button id
    const btnID = $(this).attr("id");

    if (btnType !== "function") {
      $("#output").text($(this).text());
    }

    // Apply depress call to active operator button only
    if (btnType === "operator") {
      if ($(".btn").hasClass("is_depressed")) {
        $(".btn").removeClass("is_depressed");
      }
      $(this).addClass("is_depressed");
    } else {
      $(".btn").removeClass("is_depressed");
    }

    // Check if button is a function
    if (btnType === "function") {
      // Determine what function to call
      switch (btnID) {
        case "easterEgg":
          easterEgg();
          break;
        case "history":
          history();
          break;
        case "clearAll":
          clearAll();
          break;
        case "clearLastEntry":
          clearLastEntry();
          break;
        case "backSpace":
          backSpace();
          break;
        case "equal":
          calculate();
          break;
      }
    } else {
      // Get button value
      const btnValue = $(this).data("value");
      evalExpression(btnType, btnValue);
    }
  }); // end btn clicked
}); // end document ready function
