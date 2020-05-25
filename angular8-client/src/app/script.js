function showPopup(){
    document.getElementById("popup").style.display = "flex";
}

function closePopup(){
    document.getElementById("popup").style.display = "none";
    let hotelTable = document.getElementById("hoteReservTable");
    let userTable = document.getElementById("detailsTable");
    if(hotelTable){
        let inputTable = hotelTable.getElementsByTagName("input");
        let spanTable = hotelTable.getElementsByTagName("span");
        Array.from(inputTable).forEach(cleaningBorder);
        Array.from(spanTable).forEach(cleaningText);
    }
    else if(userTable){
        let inputTable = userTable.getElementsByTagName("input");
        let spanTable = userTable.getElementsByTagName("span");
        Array.from(inputTable).forEach(cleaningBorder);
        Array.from(spanTable).forEach(cleaningText);
    }
}

function requiredValue(type, input, err){
    if(type == "text"){
        if(input.value.trimStart() == ""){
            input.style.borderColor = "red";
            err.innerHTML = "Pole wymagane";
            return false;
        }
        else{
            return true;
        }
    }
    else if(type == "number"){
        if(input.value == ""){
            input.style.borderColor = "red";
            err.innerHTML = "Pole wymagane";
            return false;
        }
        else{
            return true;
        }
    }
    else if(type == "date"){
        if(input.value == ""){
            input.style.borderColor = "red";
            err.innerHTML = "Pole wymagane";
            return false;
        }
        else{
            return true;
        }
    }
    else if(type == "password"){
      if(input.value == ""){
        input.style.borderColor = "red";
        err.innerHTML = "Pole wymagane";
        return false;
      }
      else{
        return true;
      }

    }
}

function optionalValue(input){
    if(input.value.trimStart() == ""){
        return false;
    }
    else{
        return true;
    }
}

function regexValue(input, err, regex){
    if(!input.value.match(regex)){
        input.style.borderColor = "red";
        err.innerHTML = "Błędna wartość!";
        return false;
    }
    else{
        return true;
    }
}

function lengthValue(input, err, min, max){
    if(input.value > max || input.value < min){
        input.style.borderColor = "red";
        err.innerHTML = "Wartość musi być 1-5";
        return false;
    }
    else{
        return true;
    }
}

function moreThenValue(input, err, max){
    if(input.value.length < max){
        input.style.borderColor = "red";
        err.innerHTML = "Wprowadź więcej niż 5 znaków";
        return false;
    }
    else{
        return true;
    }
}

function lessThenValue(input, err, min, mess){
    if(input.value < min){
        input.style.borderColor = "red";
        err.innerHTML = mess;
        return false;
    }
    else{
        return true;
    }
}

function checkedValue(span1, span2, ...input){
    if(!input.includes(true)){
        span1.style = "border: 2px solid red; width: 10px";
        span2.innerHTML = "To pole jest wymagane";
        return false;
    }
    else{
        return true;
    }
}

function cleaningBorder(item){
    item.style.borderColor = "";
}

function cleaningText(item){
    if(["parking", "classPlace", "smoke", "disable"].includes(item.id)){
        item.style = "";
    }
    else{
        item.innerHTML = "";
    }
}

function moreThenYearsValue(input, err, years){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let adult = (yyyy - years) + '-' + mm + '-' + dd;
    if(input.value > adult){
        input.style.borderColor = "red";
        err.innerHTML = "Musisz mieć 18 lat";
        return false;
    }
    else{
        return true;
    }
}

function moreThenTodayValue(input, err, mess){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    if(input.value < today){
        input.style.borderColor = "red";
        err.innerHTML = mess;
        return false;
    }
    else{
        return true;
    }
}

function compareDatesValue(inputFrom, errFrom, inputTo, errTo, mess){
    if(inputFrom.value > inputTo.value){
        inputFrom.style.borderColor = "red";
        errFrom.innerHTML = mess;
        inputTo.style.borderColor = "red";
        errTo.innerHTML = mess;
        return false;
    }
    else{
        return true;
    }
}

//TODO:Poprawić regex
function registerValidation() {

    let adminTable = document.getElementById("adminTable");
    let adminInputTable = adminTable.getElementsByTagName("input");
    let adminSpanTable = adminTable.getElementsByTagName("span");
    Array.from(adminInputTable).forEach(cleaningBorder);
    Array.from(adminSpanTable).forEach(cleaningText);

    let userTable = document.getElementById("userTable");
    let userInputTable = userTable.getElementsByTagName("input");
    let userSpanTable = userTable.getElementsByTagName("span");
    Array.from(userInputTable).forEach(cleaningBorder);
    Array.from(userSpanTable).forEach(cleaningText);

    let returnValue = new Set();

    if(document.getElementById("administrationRadio").checked) {
        let regexAddress = /\w*[ \w]+ \d{1,2}/g

        returnValue.add(requiredValue(adminInputTable["nazwa"].type, adminInputTable["nazwa"], adminSpanTable["nazwaError"]));
        // returnValue.add(requiredValue(adminInputTable["miasto"].type, adminInputTable["miasto"], adminSpanTable["cityError"]));

        if(requiredValue(adminInputTable["ulica"].type, adminInputTable["ulica"], adminSpanTable["ulicaError"])){
            returnValue.add(regexValue(adminInputTable["ulica"], adminSpanTable["ulicaError"], regexAddress));
        }
        else{
            returnValue.add(false);
        }

        if(requiredValue(adminInputTable["klasa"].type, adminInputTable["klasa"], adminSpanTable["classError"])){
            returnValue.add(lengthValue(adminInputTable["klasa"], adminSpanTable["classError"], 1, 5));
        }
        else{
            returnValue.add(false);
        }

        returnValue.add(checkedValue(adminSpanTable["parking"], adminSpanTable["parkingError"], adminInputTable["parking1"].checked, adminInputTable["parking2"].checked));
        returnValue.add(requiredValue(adminInputTable["loginA"].type, adminInputTable["loginA"], adminSpanTable["loginAError"]));

        if(requiredValue(adminInputTable["hasloA"].type, adminInputTable["hasloA"], adminSpanTable["passAError"])){
            returnValue.add(moreThenValue(adminInputTable["hasloA"], adminSpanTable["passAError"], 5));
        }
        else{
            returnValue.add(false);
        }

        if(returnValue.has(false)){
            adminSpanTable["sumErrorA"].style = "color: red;";
            adminSpanTable["sumErrorA"].innerHTML = "Błąd walidacji. Proszę popraw wartości w zaznaczonych polach!";
            return false;
        }
        else{
            adminSpanTable["sumErrorA"].style = "color: green;";
            adminSpanTable["sumErrorA"].innerHTML = "Wszystko wypełniłeś dobrze!";
            return true;
        }
    }
    else if(document.getElementById("userRadio").checked){
        let regexPhone = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im

        returnValue.add(requiredValue(userInputTable["imie"].type, userInputTable["imie"], userSpanTable["nameError"]));
        returnValue.add(requiredValue(userInputTable["nazwisko"].type, userInputTable["nazwisko"], userSpanTable["surnameError"]));

        if(requiredValue(userInputTable["data"].type, userInputTable["data"], userSpanTable["dateError"])){
            returnValue.add(true);
            if(!moreThenYearsValue(userInputTable["data"], userSpanTable["dateError"], 18)){
                returnValue.add(false);
            }
        }
        else{
            returnValue.add(false);
        }

        if(optionalValue(userInputTable["telefon"])){
            returnValue.add(regexValue(userInputTable["telefon"], userSpanTable["phoneError"], regexPhone));
        }

        returnValue.add(requiredValue(userInputTable["loginB"].type, userInputTable["loginB"], userSpanTable["loginBError"]));

        if(requiredValue(userInputTable["hasloB"].type, userInputTable["hasloB"], userSpanTable["passBError"])){
            returnValue.add(moreThenValue(userInputTable["hasloB"], userSpanTable["passBError"], 5));
        }
        else{
            returnValue.add(false);
        }

        if(returnValue.has(false)){
            userSpanTable["sumErrorB"].style = "color: red;";
            userSpanTable["sumErrorB"].innerHTML = "Błąd walidacji. Proszę popraw wartości w zaznaczonych polach!";
            return false;
        }
        else{
            userSpanTable["sumErrorB"].style = "color: green;";
            userSpanTable["sumErrorB"].innerHTML = "Wszystko wypełniłeś dobrze!";
            return true;
        }
    }
}

function addRoom() {
    let table = document.getElementById("addTable");
    let inputTable = table.getElementsByTagName("input");
    let spanTable = table.getElementsByTagName("span");
    Array.from(inputTable).forEach(cleaningBorder);
    Array.from(spanTable).forEach(cleaningText);

    let returnValue = new Set();

    if(requiredValue(inputTable["nrPokoju"].type, inputTable["nrPokoju"], spanTable["pokujError"])){
        returnValue.add(lessThenValue(inputTable["nrPokoju"], spanTable["pokujError"], 1, "Błedna wartość"));
    }
    else{
        returnValue.add(false);
    }

    returnValue.add(requiredValue(inputTable["hotel"].type, inputTable["hotel"], spanTable["hotelError"]));
    returnValue.add(checkedValue(spanTable["classPlace"], spanTable["classError"], inputTable["class1"].checked, inputTable["class2"].checked, inputTable["class3"].checked, inputTable["class4"].checked, inputTable["class5"].checked));

    if(requiredValue(inputTable["pietro"].type, inputTable["pietro"], spanTable["pietroError"])){
        returnValue.add(lessThenValue(inputTable["nrPokoju"], spanTable["pokujError"], 0, "Błędna wartość"));
    }
    else{
        returnValue.add(false);
    }

    returnValue.add(checkedValue(spanTable["smoke"], spanTable["smokeError"], inputTable["smoke1"].checked, inputTable["smoke2"].checked));

    returnValue.add(checkedValue(spanTable["disable"], spanTable["disableError"], inputTable["disable1"].checked, inputTable["disable2"].checked));

    if(requiredValue(inputTable["cena"].type, inputTable["cena"], spanTable["cenaError"])){
        returnValue.add(lessThenValue(inputTable["cena"], spanTable["cenaError"], 100, "Cena jest zbyt niska"));
    }
    else{
        returnValue.add(false);
    }

    if(returnValue.has(false)){
        spanTable["sumErrorAdd"].style = "color: red;";
        spanTable["sumErrorAdd"].innerHTML = "Błąd walidacji. Proszę popraw wartości w zaznaczonych polach!";
        return false;
    }
    else{
        spanTable["sumErrorAdd"].style = "color: green;";
        spanTable["sumErrorAdd"].innerHTML = "Wszystko wypełniłeś dobrze. Extra";
        return true;
    }
}

function validateReservation(){
    let table = document.getElementById("detailsTable");
    let inputTable = table.getElementsByTagName("input");
    let spanTable = table.getElementsByTagName("span");
    Array.from(inputTable).forEach(cleaningBorder);
    Array.from(spanTable).forEach(cleaningText);

    let returnValue = new Set();

    if(requiredValue(inputTable["odKiedy"].type, inputTable["odKiedy"], spanTable["odError"])){
        returnValue.add(moreThenTodayValue(inputTable["odKiedy"], spanTable["odError"], "Termin minął"));
    }
    else{
        returnValue.add(false);
    }

    if(requiredValue(inputTable["doKiedy"].type, inputTable["doKiedy"], spanTable["doError"])){
        returnValue.add(compareDatesValue(inputTable["odKiedy"], spanTable["odError"], inputTable["doKiedy"], spanTable["doError"], "Zły przedział"));
    }
    else{
        returnValue.add(false);
    }

    if(returnValue.has(false)){
        spanTable["sumError"].style = "color: red;";
        spanTable["sumError"].innerHTML = "Błąd walidacji. Proszę popraw wartości w zaznaczonych polach!";
        return false;
    }
    else{
        spanTable["sumError"].style = "color: green;";
        spanTable["sumError"].innerHTML = "Wszystko wypełniłeś dobrze. Extra";
        return true;
    }
}

function validateReservationFromHotel(){
    let table = document.getElementById("hoteReservTable");
    let inputTable = table.getElementsByTagName("input");
    let spanTable = table.getElementsByTagName("span");
    Array.from(inputTable).forEach(cleaningBorder);
    Array.from(spanTable).forEach(cleaningText);

    let returnValue = new Set();
    let regexPhone = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im

    returnValue.add(requiredValue(inputTable["imie"].type, inputTable["imie"], spanTable["nameError"]));
    returnValue.add(requiredValue(inputTable["nazwisko"].type, inputTable["nazwisko"], spanTable["surnameError"]));

    if(requiredValue(inputTable["data"].type, inputTable["data"], spanTable["dateError"])){
        returnValue.add(true);
        if(!moreThenYearsValue(inputTable["data"], spanTable["dateError"], 18)){
            returnValue.add(false);
        }
    }
    else{
        returnValue.add(false);
    }

    if(optionalValue(inputTable["telefon"])){
        returnValue.add(regexValue(inputTable["telefon"], spanTable["phoneError"], regexPhone));
    }

    if(requiredValue(inputTable["odKiedy"].type, inputTable["odKiedy"], spanTable["odError"])){
        returnValue.add(moreThenTodayValue(inputTable["odKiedy"], spanTable["odError"], "Termin minął"));
    }
    else{
        returnValue.add(false);
    }

    if(requiredValue(inputTable["doKiedy"].type, inputTable["doKiedy"], spanTable["doError"])){
        returnValue.add(compareDatesValue(inputTable["odKiedy"], spanTable["odError"], inputTable["doKiedy"], spanTable["doError"], "Zły przedział"));
    }
    else{
        returnValue.add(false);
    }

    if(returnValue.has(false)){
        spanTable["sumError"].style = "color: red;";
        spanTable["sumError"].innerHTML = "Błąd walidacji. Proszę popraw wartości w zaznaczonych polach!";
        return false;
    }
    else{
        spanTable["sumError"].style = "color: green;";
        spanTable["sumError"].innerHTML = "Wszystko wypełniłeś dobrze. Extra";
        return true;
    }
}

function validateTermFromHotel(){
  let table = document.getElementById("hoteReservTable");
  let inputTable = table.getElementsByTagName("input");
  let spanTable = table.getElementsByTagName("span");
  Array.from(inputTable).forEach(cleaningBorder);
  Array.from(spanTable).forEach(cleaningText);

  let returnValue = new Set();
  let regexPhone = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im

  if(requiredValue(inputTable["odKiedy"].type, inputTable["odKiedy"], spanTable["odError"])){
    returnValue.add(moreThenTodayValue(inputTable["odKiedy"], spanTable["odError"], "Termin minął"));
  }
  else{
    returnValue.add(false);
  }

  if(requiredValue(inputTable["doKiedy"].type, inputTable["doKiedy"], spanTable["doError"])){
    returnValue.add(compareDatesValue(inputTable["odKiedy"], spanTable["odError"], inputTable["doKiedy"], spanTable["doError"], "Zły przedział"));
  }
  else{
    returnValue.add(false);
  }

  if(returnValue.has(false)){
    spanTable["sumError"].style = "color: red;";
    spanTable["sumError"].innerHTML = "Błąd walidacji. Proszę popraw wartości w zaznaczonych polach!";
    return false;
  }
  else{
    spanTable["sumError"].style = "color: green;";
    spanTable["sumError"].innerHTML = "Wszystko wypełniłeś dobrze. Extra";
    return true;
  }
}
