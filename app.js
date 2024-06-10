const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const userInput = form.elements[0].value.trim();
    if(userInput){
        getWordInfo(userInput);
    }
    else {
        resultDiv.textContent = 'please enter a valid word ';
    }

})
{/* <p><strong>Antonymus:</strong>${data[0].meanings[0].antonyms[0]=== undefined ? " Not found " :  data[0].meanings[0].antonyms[0] }</p> */}
const getWordInfo = async (word)=>{

    try{
        resultDiv.innerHTML+= "fetching Data........"
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json() ;
        console.log(data);
        // console.log(data);
        resultDiv.innerHTML= `<h2> <strong>Word:</strong> ${data[0].word}</h2>
                            <p><strong>Part of speech: </strong>${data[0].meanings[0].partOfSpeech}</p>
                            <p><strong>Meaning:</strong>${data[0].meanings[0].definitions[0].definition === undefined ? " Not found " : data[0].meanings[0].definitions[0].definition }</p>
                            
                           `;

                            if(data[0].meanings[0].definitions[0].antonyms.length ===0){
                                resultDiv.innerHTML += `<strong>Antonyms: </strong><span> Not found </span>`
                            }
                            else{
                                resultDiv.innerHTML+= `<strong>Antonyms: </strong>`
                                for(let i =0 ; i<data[0].meanings[0].definitions[0].antonyms.length ; i++){
                                    resultDiv.innerHTML += `<li>${data[0].meanings[0].definitions[0].antonyms[i]}</li>`
                                   }
                            }
                           

                            resultDiv.innerHTML += `<br><a href="${data[0].sourceUrls}" >Read more </a>`
    }
    catch(error){
        resultDiv.innerHTML = `<p>Sorry , we couldn't find the word "${word}" in the dictionary. Please try again!</p>`

    }
    

}