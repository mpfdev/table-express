const deleteText = document.querySelectorAll('.del');

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deleteAthlete);
});

async function deleteAthlete() {
  const fName = this.parentNode.childNodes[1].innerText;
  const fCpf = this.parentNode.childNodes[3].innerText;
  const fDate = this.parentNode.childNodes[5].innerText;
  const fGender = this.parentNode.childNodes[7].innerText;
  try {
    const response = await fetch('deleteAthlete', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fName,
        cpf: fCpf,
        date: fDate,
        gender: fGender,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
