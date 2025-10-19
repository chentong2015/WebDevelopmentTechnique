const file = document.querySelector("#file");
const page = document.querySelector("#page");
const json = document.querySelector("#json");
const download = document.querySelector("#download");
let excel;

file.addEventListener("change", () => {
  try {
    file.files[0].arrayBuffer().then((buffer) => {
      excel = XLSX.read(buffer);
      let forselect = excel.SheetNames.map(
        (e) => `<option value="${e}">${e}</option>`
      );
      page.innerHTML = forselect.join("");
      json.value = JSON.stringify(
        {
          data: XLSX.utils.sheet_to_json(excel.Sheets[page.value]),
        },
        null,
        4
      );
      download.setAttribute("download", page.value);
      download.href =
        "data:application/json;charset=utf-8," +
        encodeURIComponent(json.value);
    });
  } catch (err) {
    alert("Oops! Something went Wrong!");
  }
});

function afterSelect() {
  json.value = JSON.stringify(
    {
      data: XLSX.utils.sheet_to_json(excel.Sheets[page.value]),
    },
    null,
    4
  );
  download.setAttribute("download", page.value);
  download.href =
    "data:application/json;charset=utf-8," +
    encodeURIComponent(json.value);
}