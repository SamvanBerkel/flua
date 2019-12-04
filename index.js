if(window.page == null) window.page = {
    patientJson: null,
    dbLink: "https://api.myjson.com/bins/qvzv6",
    rest: {
        getPatients: async function() {
            await $.get(page.dbLink, function(data, textStatus, jqXHR) {
                console.log(data);
                page.patientJson = data;
            }); 
        },
        postPatient: function(name, gender, age, weight) {
            page.patientJson.patients.push({
                name: name,
                gender: gender,
                age: age,
                weight: weight,
                intakes: []
            })
            
            page.rest.uploadCurrentJson(); 
        },
        delPatients: function() {
            $.ajax({
                url: page.dbLink,
                type:"PUT",
                data:'{"patients":"[]"}',
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data, textStatus, jqXHR){
            
                }
            }); 
        },
        setHardwareId: function(patientNumber, hardwareId) {
            page.patientJson.forEach(function(patient) {
                if (patient.hardwareId == hardwareId) {
                    patient.hardwareId = null;
                }

                if (patient.patientNumber == patientNumber) {
                    patient.hardwareId = hardwareId;
                }
            });

            page.rest.uploadCurrentJson();

        },
        uploadCurrentJson: async function() {
            await $.ajax({
                url: page.dbLink,
                type:"PUT",
                data: JSON.stringify(page.patientJson),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data, textStatus, jqXHR){
                    window.location.href = "succes.html";
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Upload failed");
                    console.log(errorThrown);
                }
            });
        }
    },
    set: {
        patients: function() {
            console.log("set")
            page.patientJson.forEach(function(patient) {
                let patientDiv = document.createElement('div');
                patientDiv.classList.add('divPatient');
                patientDiv.patient = patient;
                patientDiv.innerHTML = `
                    <i class="fas fa-user-injured patientIcon"></i>
                    <div id="divName" class="infoContainer">
                        <span class="infoHeader">Naam: </span>
                        <span>${patient.name}</span>
                    </div>
                    <div id="divPatientNumber" class="infoContainer">
                        <span class="infoHeader">Patient nummer: </span>
                        <span>${patient.patientNumber}</span>
                    </div>
                    <div id="divBirthDate" class="infoContainer">
                        <span class="infoHeader">Geboorte datum: </span>
                        <span>${patient.birthdate}</span>
                    </div>
                `.trim();

                patientDiv.addEventListener('click', function(evt) {
                    page.rest.setHardwareId(this.patient.patientNumber, "1");
                })

                document.getElementById('divPatientList').appendChild(patientDiv);
            })
        }
    },
    init: async function() {
        console.log("loaded");
        let patients = document.querySelectorAll('.divPatient');
        
        console.log(patients)
    
        console.log("start")
        await page.rest.getPatients();
        page.set.patients();
    }
}

$( document ).ready(function() {
    page.init();
});