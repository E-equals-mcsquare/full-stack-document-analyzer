import openai
import os

def generate_answer(question: str, context: str) -> str:
    openai.api_key = os.getenv("OPENAI_API_KEY")

    prompt = f"""Answer the following question using the context below.
Context:
{context}

Question: {question}
Answer:"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300
    )
    return response['choices'][0]['message']['content']
