const selectImages = document.querySelectorAll('.select-image');
const inputFile = document.querySelector('#file');
const matchBtnPreferred = document.querySelector(".matchbtnforPreferred")
const showPercentagePreferred = document.querySelector(".showpercentageforPreferred")
const fromlistbtn = document.querySelector(".fromlistBtn")
const hiddendiv = document.querySelector(".showafterclick")
let wheretoaddimage

selectImages.forEach((selectImage) => {
    selectImage.addEventListener('click', function () {
        inputFile.click();
        wheretoaddimage = selectImage.getAttribute("data-imagefor")
    })
})

inputFile.addEventListener('change', function () {
    const imgArea = document.getElementsByClassName(wheretoaddimage)[0];
    const image = this.files[0]
    if (image.size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
            const allImg = imgArea.querySelectorAll('img');
            allImg.forEach(item => item.remove());
            const imgUrl = reader.result;
            const img = document.createElement('img');
            img.src = imgUrl;
            imgArea.appendChild(img);
            imgArea.classList.add('active');
            imgArea.dataset.img = image.name;
        }
        reader.readAsDataURL(image);
    } else {
        alert("Image size more than 2MB");
    }
})





//Program by shishir bhusal.

//we can add other names too..
const ListOfMatchesForGirl = {
    1: "ranveer", 2: "prabhas", 3: "Bishal",
    4: "allu", 5: "Aakash", 6: "shishir"
}
const ListOfMatchesForBoy = {
    1: "swastima", 2: "kajal",
    3: "r", 4: "Asmee",
    5: "Shristi", 6: "katrina"
}
const PercentageWithMatch = {
}
//function to give percentage match between 2 names.
const MatchName = (name, preferredName) => {
    let NumberOfMatchFound = 0
    for (letter of name) {
        for (letter2 of preferredName) {
            if (letter == letter2) {
                ++NumberOfMatchFound
                break
            }
        }
    }
    let AvgLengthOfNames = (name.length + preferredName.length) / 2
    PercentageMatchFound = (NumberOfMatchFound / AvgLengthOfNames) * 100
    return Math.floor(PercentageMatchFound)
}
//function to show match percentage

//function to match name with another name present in list
const MatchFromList = (name) => {

}

// console.log(matchBtnPreferred);
matchBtnPreferred.addEventListener('click', () => {

    const nameforPreferred = document.querySelector(".name").value
    const PartnernameforPreferred = document.querySelector(".partnername").value

    console.log(nameforPreferred, PartnernameforPreferred);

    let PercentageOfMatchFound = MatchName(nameforPreferred, PartnernameforPreferred);
    showPercentagePreferred.textContent = `Result: ${PercentageOfMatchFound}% match found 😊!!`

})

fromlistbtn.addEventListener('click', () => {

    const nameForList = document.querySelector(".nameforlist").value
    const GiveMeBestMatchAmongAll = (list) => {
        for (key in list) {
            let nameFormatch = list[key]
            let PercentageOfMatchFound = MatchName(nameForList, nameFormatch)
            PercentageWithMatch[PercentageOfMatchFound] = nameFormatch
        }
        const BestMatch = Math.max.apply(null, Object.keys(PercentageWithMatch))

        const htmltoadd = `
        <div class="container d-flex flex-row showafterclick">
        <div class="imagepart">
          <img src="img/${PercentageWithMatch[BestMatch]}.jpg" width="100%" height="100%" alt="">
        </div>
        <div class="contentpart">
          <div class="showpercentage"> <span> Match found!!</span> <br><br> ${BestMatch}% of match found between You(${nameForList}) and ${PercentageWithMatch[BestMatch]} .
          </div>
  
        </div>
      </div>`
        fromlistbtn.insertAdjacentHTML("beforebegin", htmltoadd)
        console.log(`We found best match i.e ${BestMatch} percent between you(${name}) and ${PercentageWithMatch[BestMatch]}.\n\n`)
    }

    const gender = document.querySelector(".gender").value


    if (gender == "female") {
        GiveMeBestMatchAmongAll(ListOfMatchesForGirl);
    }

    if (gender == "male") {
        GiveMeBestMatchAmongAll(ListOfMatchesForBoy);
    }


})