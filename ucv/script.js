btnWrapper = document.getElementById('buttons-wrapper');
info = document.getElementById('info');
smh = document.getElementById('stateMachineHistory');

var universitySM = new StateMachine( {
    init: 'Universitatea din Craiova',
    transitions : [
        { name: 'spreAutomaticaCalculatoareElectronica', from: 'Universitatea din Craiova',               to: 'Automatica, Calculatoare si Electronica' },
        { name: 'spreStiinte',                           from: 'Universitatea din Craiova',               to: 'Stiinte'                                 },
        { name: 'spreAutomaticaSiInformaticaAplicata',   from: 'Automatica, Calculatoare si Electronica', to: 'Automatica si Informatica Aplicata'      },
        { name: 'inapoiLaUniversitate',                  from: 'Stiinte',                                 to: 'Universitatea din Craiova'               },
        { name: 'inapoiLaUniversitate',                  from: 'Automatica, Calculatoare si Electronica', to: 'Universitatea din Craiova'               },
        { name: 'spreCalculatoare',                      from: 'Automatica, Calculatoare si Electronica', to: 'Calculatoare'                            },
        { name: 'spreElectronica',                       from: 'Automatica, Calculatoare si Electronica', to: 'Electronica'                             },
        { name: 'inapoiLaACE',                           from: 'Calculatoare',                            to: 'Automatica, Calculatoare si Electronica' },
        { name: 'spreCalculatoareRomana',                from: 'Calculatoare',                            to: 'Calculatoare Romana'                     },
        { name: 'spreCalculatoareEngleza',               from: 'Calculatoare',                            to: 'Calculatoare Engleza'                    },
        { name: 'spreChimie',                            from: 'Stiinte',                                 to: 'Chimie'                                  },
        { name: 'spreInformatica',                       from: 'Stiinte',                                 to: 'Informatica'                             },
        { name: 'spreFizica',                            from: 'Stiinte',                                 to: 'Fizica'                                  },
        { name: 'spreFizicaInformatica',                 from: 'Fizica',                                  to: 'Fizica Informatica'                      },
        { name: 'spreFizicaMedicala',                    from: 'Fizica',                                  to: 'Fizica Medicala'                         },
        { name: 'inapoiLaStiinte',                       from: 'Fizica',                                  to: 'Stiinte'}
    ]
})

navHistory = "";
update();

function update() {
    info.innerHTML = universitySM.state;
    btnWrapper.innerHTML = "";
    navHistory += `${universitySM.state}, `;
    transitions = universitySM.transitions();
    for(let i in transitions) {
        btnWrapper.innerHTML += `<button class="btn" onclick="universitySM.${transitions[i]}(); update()">${transitions[i]}</button>`
    }

    console.log(transitions);
    if(!transitions[0]) {
        smh.innerHTML = "Istoric: " + navHistory;
    }
}


