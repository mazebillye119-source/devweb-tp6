const originURL = "";

const form = document.getElementById("shorten-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = document.getElementById("url").value;

    try {
        const response = await fetch(`${originURL}/api-v2/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur inconnue");
        }

        const shortUrl = `${originURL || window.location.origin}/api-v2/${data.link}`;

        resultDiv.hidden = false;
        resultDiv.className = "result";
        resultDiv.innerHTML = `
            <p>Lien raccourci :</p>
            <p>
                <a href="${shortUrl}">${shortUrl}</a>
                <button class="copy-btn" id="copy-btn" type="button">Copier l'URL</button>
            </p>
        `;

        document.getElementById("copy-btn").addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(shortUrl);
                document.getElementById("copy-btn").textContent = "Copié !";
            } catch (error) {
                console.error("Erreur de copie :", error);
            }
        });
    } catch (error) {
        resultDiv.hidden = false;
        resultDiv.className = "result error";
        resultDiv.textContent = `Erreur : ${error.message}`;
    }
});