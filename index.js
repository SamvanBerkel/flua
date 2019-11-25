window.onload = function() {
    console.log("loaded");
    let patients = document.querySelectorAll('.divPatient');
    
    console.log(patients)
    
    patients.forEach(function(elem){
        elem.addEventListener('click', function(evt) {
            window.location.href = "succes.html";
            console.log("test");
        })
    })
    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = "index.html";
    });
}
