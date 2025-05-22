const ageForm = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");
const loader = document.getElementById("loader");
const resultDiv = document.getElementById("result");
const dobDisplay = document.getElementById("dob-display");
const calcBtn = document.getElementById("calcBtn");
const newSearchBtn = document.getElementById("newSearchBtn");
const inputGroup = document.getElementById("inputGroup");

function formatDateToDDMMYYYY(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

ageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const dobStr = dobInput.value;
    const dob = new Date(dobStr);
    const today = new Date();

    resultDiv.innerHTML = "";
    resultDiv.style.display = "none";
    dobDisplay.textContent = "";
    newSearchBtn.classList.add("hidden");

    if (!dobStr || dob >= today) {
        resultDiv.textContent = "Please enter a valid past date.";
        resultDiv.style.display = "block";
        return;
    }

    inputGroup.classList.add("hidden");
    loader.style.display = "block";

    setTimeout(() => {
        loader.style.display = "none";

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const formattedDOB = formatDateToDDMMYYYY(dob);
        dobDisplay.textContent = `Date of Birth: ${formattedDOB}`;

        resultDiv.innerHTML = `
          <div class="line"><strong>Years:</strong> ${years}</div>
          <div class="line"><strong>Months:</strong> ${months}</div>
          <div class="line"><strong>Days:</strong> ${days}</div>
        `;
        resultDiv.style.display = "block";
        newSearchBtn.classList.remove("hidden");
    }, 1500);
});

newSearchBtn.addEventListener("click", () => {
    dobInput.value = "";
    inputGroup.classList.remove("hidden");
    resultDiv.style.display = "none";
    dobDisplay.textContent = "";
    newSearchBtn.classList.add("hidden");
});