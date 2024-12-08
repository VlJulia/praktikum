
//подсветка красным полей
Array.from(document.querySelector(".modal").children).forEach((modal)=>{
    const inputs = modal.querySelectorAll('input:not([type="submit"]');
    if(inputs){
        const submit = modal.querySelector('.modal__button');
        inputs.forEach((inp)=>{
            inp.addEventListener('input', function(){
                const status = inp.checkValidity();
                if (!status && inp.value!=""){
                    if (!inp.parentElement.classList.contains("error")) inp.parentElement.classList.toggle("error");
                }
                else if (inp.parentElement.classList.contains("error")) inp.parentElement.classList.toggle("error");
                checkInputs(inputs, submit);
                });
        });
    }
})


export function checkInputs(inputs,submitButton) {
    const allFilled = Array.from(inputs).every(input => input.checkValidity());
    // Устанавливаем состояние кнопки
    submitButton.disabled = !allFilled;
}