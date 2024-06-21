const textArea = document.getElementById('text_to_summarize');
const submitButton = document.getElementById('submit-button');
const summaryTextArea = document.getElementById('summary');

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

submitButton.disabled = true;

function verifyTextLength(e) {
  const textArea = e.target;
  const charCount = document.getElementById('count');
  const length = textArea.value.length;
  charCount.textContent = `${length}/100000`;

  if (length > 200 && length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  submitButton.classList.add("submit-button--loading");
  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ "text_to_summerize": text_to_summarize });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/summerize", requestOptions)
    .then(response => response.text())
    .then(summary => {
      summaryTextArea.value = summary;
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
    });
}

document.getElementById('copy-button').addEventListener('click', function() {
  summaryTextArea.select();
  summaryTextArea.setSelectionRange(0, 99999); 
  navigator.clipboard.writeText(summaryTextArea.value).then(function() {
    var copyMessage = document.getElementById('copy-message');
    copyMessage.style.display = 'block';
    setTimeout(function() {
      copyMessage.style.display = 'none';
    }, 2000);
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
  });
});