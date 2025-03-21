
        async function askGemini() {
            const apiKey= "AIzaSyCwFR-5ZV_pxDu-JEHmPGR59t7ZkxI3B0M";


            const userInput = document.getElementById("userInput").value;
            const responseDiv = document.getElementById("response");

            if (!userInput) {
                responseDiv.innerHTML = "<b style='color:red;'>Please enter a question!</b>";
                return;
            }

            responseDiv.innerHTML = "Thinking... ⏳";

            try {
                const res = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ role: "user", parts: [{ text: userInput }] }]
                    })
                });

                const data = await res.json();
                if (data.candidates && data.candidates.length > 0) {
                    responseDiv.innerHTML = `<b>Response:</b> ${ data.candidates[0].content.parts[0].text }`;
                } else {
                    responseDiv.innerHTML = "<b style='color:red;'>No response from AI.</b>";
                }
            } catch (error) {
                responseDiv.innerHTML = "<b style='color:red;'>Error fetching response.</b>";
                console.error("Error:", error);
            }
}