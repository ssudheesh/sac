const ajaxCall = (key, url, prompt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1024,
        n: 1,
        temperature: 0
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "region": "EU"
      },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};

const url = "https://api.nlp.dev.uptimize.merckgroup.com/openai/deployments/gpt-4-turbo/chat/completions?api-version=2023-09-01-preview";

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(apiKey, prompt) {
      const { response } = await ajaxCall(
        apiKey,
        url,
        prompt
      );

      console.log(response)
      return response.choices[0]['message']['content'];
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();