// establishes map pool
let maps = ["map", "Ancient", "Dust2", "Inferno", "Mirage", "Nuke", "Overpass", "Vertigo"]

function readInfo() {
    let tm1 = document.querySelector("input#teamID1").value;
    let tm2 = document.querySelector("input#teamID2").value;
    let tms = [tm1, tm2]

    let color1 = document.querySelector("input#color1").value;
    let color2 = document.querySelector("input#color2").value;

    let teamSelects = [];
    for (t = 1; t < 8; t++) {
        teamSelects.push(document.querySelector(`select#selTeams${t}`));
    }

    for (let select in teamSelects) {
        addSelectOptions(teamSelects[select], tms);
    }

    let selM1 = document.querySelector("select#selMaps1");
    addSelectOptions(selM1, maps);
    nextMapSelect(0);
    editButtons(1);
}

function editButtons(i) {
    if (i < 8) {
        document.querySelector(`button#disBut${i}`).removeAttribute("disabled");
        document.querySelector(`button#disBut${i}`).setAttribute("class", "btn btn-primary btn-sm");

        for (p = i + 1; p < 8; p++) {
            document.querySelector(`button#disBut${p}`).setAttribute("disabled", "disabled");
            document.querySelector(`button#disBut${p}`).setAttribute("class", "btn btn-warning btn-sm");
        }
    }
}

function addSelectOptions(selectObject, selectOptions) {
    selectObject.innerHTML = "";
    for (let name in selectOptions) {
        let newOption = document.createElement("option");
        newOption.value = selectOptions[name];
        newOption.innerHTML = selectOptions[name];
        selectObject.options.add(newOption);
    }
}

function displayData(i) {
    nextMapSelect(i)
    editButtons(i + 1)
    teamText(i)

    document.querySelector(`td#map${i}`).innerHTML = document.querySelector(`select#selMaps${i}`).value;

    //document.querySelector(`td#map${i}`).innerHTML = `<img src="/img/pic_genric.png" width="189" height="189" style="object-position: 0 -94px">`;

    if (i < 7) {
        document.querySelector(`td#pickBan${i}`).innerHTML = document.querySelector(`select#selPicBan${i}`).value;
    } else {
        document.querySelector(`td#pickBan${i}`).innerHTML = "";
    }
}

//creates teamname text for displayData()
function teamText(k){
    if (k < 7) {
        //sets the team name
        document.querySelector(`td#teamName${k}`).innerHTML = document.querySelector(`select#selTeams${k}`).value;
        let team1 = document.querySelector(`td#teamName${k}`);
        let currentTeam = document.querySelector("input#teamID1").value;
        let color1 = document.querySelector("input#color1").value;
        let color2 = document.querySelector("input#color2").value;
        //sets the color of the team name
        if (team1.innerHTML == currentTeam) {
            team1.setAttribute("style", `color:${color1}`);
        } else {
            console.log('nay');
            team1.setAttribute("style", `color:${color2}`);
        }
    // disables last map teamname display
    } else {
        document.querySelector(`td#teamName${k}`).innerHTML = "";
    }
}



function clearData(k) {
    for (l = k + 2; l < maps.length; l++) {
        if (l < 8) {
            let clearSel = document.querySelector(`select#selMaps${l}`);
            let blankArray = ["map"];
            addSelectOptions(clearSel, blankArray);
        }
    }
    for (k = k; k < 7; k++) {
        document.querySelector(`td#teamName${k + 1}`).innerHTML = "";
        document.querySelector(`td#map${k + 1}`).innerHTML = "";
        document.querySelector(`td#pickBan${k + 1}`).innerHTML = "";
    }
}

function nextMapSelect(k) {
    let mapsLocal = maps.slice(0, maps.length);
    for (j = 1; j < k + 1; j++) {
        let mapToRemove = document.querySelector(`select#selMaps${j}`).value;
        let keyToRemove = mapsLocal.indexOf(mapToRemove);
        if (keyToRemove !== 0) {
            mapsLocal.splice(keyToRemove, 1);
        }
    }
    let selMapNew = document.querySelector(`select#selMaps${k + 1}`);
    if (k != 7) {
        addSelectOptions(selMapNew, mapsLocal);
    }
    clearData(k);
}