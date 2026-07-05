const MAX_RETRIES = 2;
const TIMEOUT = 30000; // 30 seconds

export async function groqRequest(client, payload) {

    let lastError;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

        try {

            const response = await Promise.race([

                client.chat.completions.create(payload),

                new Promise((_, reject) =>
                    setTimeout(
                        () => reject(new Error("Groq request timed out")),
                        TIMEOUT
                    )
                )

            ]);

            return response;

        } catch (error) {

            lastError = error;

            console.error(
                `Groq Attempt ${attempt} Failed:`,
                error.message
            );

            if (attempt < MAX_RETRIES) {

                // Wait 1 second before retrying
                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );

            }

        }

    }

    throw lastError;

}