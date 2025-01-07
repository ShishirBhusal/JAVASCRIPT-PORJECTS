

let valueDisplays = document.querySelectorAll(".num");

valueDisplays.forEach((valueDisplay) => {

    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let increment = Math.round(endValue / 200)

    valueDisplay.innerHTML = `0`

    let func = () => {
        let startValue = Number.parseInt(valueDisplay.innerHTML);

        if (startValue < endValue) {
            valueDisplay.innerHTML = `${Math.round(startValue + increment)}`
            setTimeout(func, 40)
        }

    }
    func()


});