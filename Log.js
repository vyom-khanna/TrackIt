document.addEventListener("DOMContentLoaded",function(){

    const today=new Date().toISOString().split('T')[0];

    const submitBtn=document.getElementById('submit')

    const sleepinput=document.getElementById('sleepinput')
    const stepsinput=document.getElementById('stepsinput')
    const gyminput=document.getElementById('gyminput')
    const devinput=document.getElementById('devinput')


    submitBtn.addEventListener("click",function(){
        
        const sleep=sleepinput.value;
        const steps=stepsinput.value;
        const gym=gyminput.checked;
        const dev=devinput.checked;

        if(!sleep && !steps && !gym && !dev){
            alert("please enter atleast 1 value")
            return;
        }

        const logData={
            date:today,
            sleep:parseInt(sleep)||0,
            steps:parseInt(steps)||0,
            gym:gym,
            dev:dev,
            savedAt: new Date().toLocaleString()
        }

        localStorage.setItem(today,JSON.stringify(logData));

        alert("Log saved for "+today)

        sleepinput.value="";
        stepsinput.value="";
        gyminput.checked=false;
        devinput.checked=false;

        console.log("Saved : "+logData);
        console.log("All stored Data : "+localStorage);
    })

})